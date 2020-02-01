{$$, unit_} = require('./common')
$$ = unit_ module, $$

class Plain

class Node
  @TNode()
  @node 'node1'
  @node 'node2'
  constructor: ->
    @nodes = []
    @node1 = 1
    @node2 = 2

class DerivedNode extends Node
  @node 'node3'
  constructor: (e) ->
    super()
    @node3 = e
describe 'TNode', ->
  it 'should work', ->
    $$.$ 'class Plain'
    $$._ Plain
    #
    $$.$ 'class Node'
    $$._ Node.toString()
    $$.$ 'class Node.prototype'
    $$._ Node.prototype
    #
    $$.$ 'class DerivedNode'
    $$._ DerivedNode.toString()
    $$.$ 'class DerivedNode.prototype'
    $$._ DerivedNode.prototype
    #
    $$.$ 'n1.Node'
    n1 = new Node()
    n1.node1 = 0
    n1.node2 = 2
    n1.node1 = 1
    $$._ n1
    $$.$ 'nodes'
    for node from n1
      $$._ node

    $$.$ 'n2.DerivedNode'
    n2 = new DerivedNode(3)

    $$._ n2
    $$.$ 'nodes'
    for node from n2
      $$._ node
