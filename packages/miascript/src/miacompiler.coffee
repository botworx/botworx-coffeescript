AstVisitor = require('./astvisitor').AstVisitor
Analyzer = require('./analyzer').Analyzer
{_terms, _types, _Propose, _Attempt, _Assert} = require './yy'

class CompilerBase extends AstVisitor
  constructor: ->
    super()
    @delegator_
      Array: @visitArray
      Literal: @visitLiteral
      Variable: @visitVariable
      Property: @visitProperty
      Properties: @visitProperties
      Term: @visitTerm
      Type: @visitType
      Block: @visitBlock
      Module: @visitModule
      CallStmt: @visitCallStmt
      ImportStmt: @visitImport
      Def: @visitDef
      DefG: @visitDefG
      BinaryExpr: @visitBinaryExpr
      UnaryExpr: @visitUnaryExpr
      Clause: @visitClause
      Trigger: @visitTrigger
      Query: @visitQuery
      QClause: @visitQClause
      QNegClause: @visitQNegClause
      QFilter: @visitQFilter
      "-->": @visitSuccess
      Snippet: @visitSnippet
      Message: @visitMessage
      "=": @visitBinaryExpr
      "!=": @visitBinaryExpr

  visitArray: (n) ->
    arr = []
    for c in n.nodes
      arr.push(@visit(c))
    [
      '[',
      arr.join(),
      ']'
    ].join('')

  visitSnippet: (n) ->
    @writeLn("console.log(#{n.text})")

  visitLiteral: (n) ->
    n.value

  visitVariable: (n) ->
    '$' + n.name

  visitTerm: (n) ->
    '_' + n.name

  visitType: (n) ->
    n.name

  visitProperties: (n) ->
    arr = []
    for c in n.nodes
      arr.push(@visit(c))
    [
      '{',
      arr,
      '}'
    ].join('')

  visitProperty: (n) ->
    [
      n.name, ': ',
      @visit(n.value)
    ].join('')

  visitQuery: (node) ->
    if node.scope
      for k, v of node.scope.vars
        if v.type
          @writeLn "_$#{k} = new Variable('$#{k}', (v) -> v instanceof #{v.type.name})"
        else
          @writeLn "_$#{k} = new Variable('$#{k}')"
    @delegator_
      Variable: (n) ->
        v = @scope.find n.name
        if v.qvar then return "_.$#{n.name}" else return visitVariable n
    @visitNode(node)

  visitBlock: (node) ->
    if node.scope
      for k, v of node.scope.vars
        @writeLn ['$', k, ' = ', v.value].join('')
    @visitNode(node)

  visitModule: (n) ->
    @write """
    miajs = require('miajs')
    {Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs
    {__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs
    """
    @writeLn ''

    for k, v of _types
      if !v.builtin
        @writeLn ['class ', k, ' extends Term'].join('')

    for k, v of _terms
      if v.type
        @writeLn ['_', k, " = $_('", k, "', #{v.type.name})"].join('')
      else
        @writeLn ['_', k, " = $_('", k, "')"].join('')

    @writeLn("module.exports = module_ ->")
    @indent()
    @visitBlock(n)
    @dedent()
    if !@options.filename #were running in a sandbox
      @writeLn "runner_().run(module.exports)"
    else
      @writeLn "if require.main == module then runner_().run(module.exports)"

  visitImport: (n) ->
    @writeLn ['require(', n.expr.value, ').action.call(this)'].join('')

  visitDef: (n) ->
    @writeLn(['@def ', @visit(n.trigger), ', ->'].join(''))
    @indent()
    @visit(n.body)
    @dedent()

  visitDefG: (n) ->
    @writeLn(['@defg ', @visit(n.trigger), ', ->'].join(''))
    @indent()
    @visit(n.body)
    @dedent()

  visitTrigger: (node) ->
    @save()
    @delegator_
      Variable: (n) ->
        return '__'
    [
      'new Trigger(',
      [
        @visit node.flavor
        @visit node.type
        @visit(node.subj) || '__'
        @visit(node.verb) || '__'
        @visit(node.obj) || '__'
        @visit(node.xtra) || '__'
      ].join()
      ')'
    ].join('')

  visitMessage: (n) ->
    if Array.isArray n.arg then list = n.arg else list = [n.arg]
    for c in list
      switch n.type
        when _Assert
          @writeLn(["@assert(", @visit(c), ")"].join(''))
        when _Attempt
          @visitCallStmt n
        when _Propose
          @writeLn(["@propose(", @visit(c), ")"].join(''))
  visitCallStmt: (n) ->
    @writeLn([
      'yield @call(',
      [
        @visit(n.arg.subj),
        @visit(n.arg.verb),
        @visit(n.arg.obj),
      ].join()
      ')'
    ].join(''))

  visitClause: (n) ->
    [
      'new ',
      @visit(n.type),
      '(',
      [
        @visit n.subj
        @visit n.verb
        @visit n.obj
        @visit n.xtra
      ].filter((x)-> x if x).join()
      ')'
    ].join('')

  visitQClause: (node) ->
    @delegator_
      Variable: (n) ->
        if n.info.qvar
          '_$' + n.name
        else
          '$' + n.name
    c = node.expr
    header = if node.first then "@rnr.ctx.query(" else ".and("
    @writeLn [
      header
      [
        @visit(c.type)
        @visit(c.subj)
        @visit(c.verb)
        @visit(c.obj)
      ].join()
      ")"
    ].join('')

  visitQNegClause: (node) ->
    @delegator_
      Variable: (n) ->
        if n.info.qvar
          '_$' + n.name
        else
          '$' + n.name
    c = node.expr
    header = if node.first then "@rnr.ctx.query(" else ".not("
    @writeLn [
      header
      [
        @visit(c.type)
        @visit(c.subj)
        @visit(c.verb)
        @visit(c.obj)
      ].join()
      ")"
    ].join('')

  visitQFilter: (node) ->
    @writeLn [
      ".filter((_) -> "
      @visit(node.expr)
      ")"
    ].join('')

  visitSuccess: (node) ->
    @writeLn ".exec (_) =>"
    @indent()
    @visit(node.body)
    @dedent()

  visitUnaryExpr: (n) ->
    [
      "#{n.kind} "
      @visit(n.arg)
    ].join('')

  visitBinaryExpr: (n) ->
    [
      @visit(n.left)
      " #{n.kind} "
      @visit(n.right)
    ].join('')

class MiaCompiler extends CompilerBase
  constructor: (@out) ->
    super()
    @indentlevel = 0
    @indentation = ''
    @analyzer = new Analyzer()

  compile: (ast, options) ->
    @options = options || {}
    @analyzer.analyze(ast, options)
    @visit(ast)

  write: (s) ->
    #console.log(s)
    if(@out == undefined)
      return
    @out.write(s)

  writeLn: (s) ->
    #console.log(@indentation + s)
    if(@out == undefined)
      return
    @out.write(@indentation + s + '\n')

  indent: (s) ->
    @indentlevel += 1
    @indentation = (new Array(@indentlevel + 1)).join('  ')

  dedent: (s) ->
    @indentlevel -= 1
    @indentation = (new Array(@indentlevel + 1)).join('  ')

exports.MiaCompiler = MiaCompiler
