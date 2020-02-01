{AstVisitor} = require './astvisitor'
{_null, $exists, CallStmt, UnaryExpr, Clause} = require './yy'

class AnalyzerBase extends AstVisitor
  constructor: ->
    super()
    @delegator_
      Module: @visitBlock
      Block: @visitBlock
      Query: @visitQuery
      Def: @visitDef
      DefG: @visitDef
      Trigger: @visitTrigger
      Variable: @visitVar
      Clause: @visitClause
      Properties: @visitProperties
      Property: @visitProperty
      Lhs: @visitLhs
      Assert: @visitMessage
      "=": @visitBinaryExpr

  visitVar: (n) ->
    @scope.var_ n, @value

  visitStatement: (node) ->
    @stmt = @scope_(node)
    @visitNode(node)

  visitBlock: (node) ->
    @block = @scope_(node)
    @visitNode(node)

  visitDef: (node) ->
    @visit(node.trigger)
    node.body.scope = node.trigger.scope
    @visit(node.body)

  visitTrigger: (node) ->
    @scope_(node)
    @delegator_
      Variable: (n) ->
        @scope.var_ n, @value
    @value = "@msg.data"
    @visit node.binding
    @value = "@msg.data.subj"
    @visit node.subj
    @value = "@msg.data.verb"
    @visit node.verb
    @value = "@msg.data.obj"
    @visit node.obj
    @visit node.xtra

  visitClause: (n) ->
    @visit(n.subj)
    @visit(n.verb)
    @visit(n.obj)
    @visit(n.xtra)

  visitProperties: (n) ->
    for c in n.nodes
      @value = "@msg.data.#{c.name}"
      @visit(c)

  visitProperty: (n) ->
    @visit(n.value)

  visitQuery: (node) ->
    @delegator_
      Variable: (n) ->
        @scope.qvar_ n, @value
    @visitStatement node

  visitLhs: (node) ->
    node.nodes[0].first = true
    @visitNode node

  visitContextualize: (n) ->
    @visit(n.left)
    for c in n.right
      @visit(c)

  visitMessage: (n) ->
    @visit(n.arg)

  visitUnaryExpr: (n) ->
    @visit(n.arg)

  visitBinaryExpr: (n) ->
    @visit(n.left)
    @visit(n.right)

class Analyzer extends AnalyzerBase
  constructor: ->
    super()

  analyze: (ast, options) ->
    @visit(ast)
    return ast

exports.Analyzer = Analyzer
