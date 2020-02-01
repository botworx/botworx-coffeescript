{AstVisitor} = require './astvisitor'
{_null, _exists, _Achieve, Block, CallStmt, Attempt, Assert, Clause} = require './yy'

class Transformer extends AstVisitor
  constructor: ->
    super()
    @delegator_
      Term: @visitTerm
      Clause: @visitClause
      Sentence: @visitSentence
      Paragraph: @visitParagraph

  transform: (ast, options) ->
    @visit(ast)
    return ast

  visitNode: (node) ->
    if !node then return
    if Array.isArray node
      for child, index in node
        node[index] = @visit child
      return node
    if !node._TNode
      throw new Error "Does not implement TNode:  #{JSON.stringify(node)}"
    for child, index in node.nodes
      node.nodes[index] = @visit child
    return node

  visitTerm: (node) ->
    if @top(-1) instanceof Block
      return new Assert(new Clause(node, _exists, _null))
    return node

  visitClause: (node) ->
    parent = @top(-1)
    if parent instanceof Block
      if node.subj == _null
        node.type = _Achieve
        return new Attempt(node)
      else
        return new Assert(node)
    else
      if node.subj == _null && @subj
        node.subj = @subj
    return node

  visitSentence: (node) ->
    clause = node.clause
    {subj, verb} = clause
    result = [@visitClause clause]
    for obj in node.list
      result.push @visitClause new Clause(subj, verb, obj)
    return result

  visitParagraph: (node) ->
    {@subj, list} = node
    @visitNode(node)
    result = [@visitTerm(@subj)]
    for clause in node.list
      subclause = @visitClause clause
      if Array.isArray subclause
        result = result.concat subclause
      else
        result.push subclause
    return result

exports.Transformer = Transformer
