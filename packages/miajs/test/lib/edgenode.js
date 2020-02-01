(function() {
  var $$, unit_;

  ({$$, unit_} = require('./common'));

  $$ = unit_(module, $$);


  /*
  class Plain
  
  class Node
    @TNode()
    @edge 'edge1'
    @edge 'edge2'
    constructor: ->
      @edges = []
      @edge1 = 1
      @edge2 = 2
  
  class DerivedNode extends Node
    @edge 'edge3'
    constructor: (e) ->
      super()
      @edge3 = e
  describe 'TNode', ->
    it 'should work', ->
      $$.$ 'class Plain'
      $$._ Plain
       *
      $$.$ 'class Node'
      $$._ Node.toString()
      $$.$ 'class Node.prototype'
      $$._ Node.prototype
       *
      $$.$ 'class DerivedNode'
      $$._ DerivedNode.toString()
      $$.$ 'class DerivedNode.prototype'
      $$._ DerivedNode.prototype
       *
      $$.$ 'n1.Node'
      n1 = new Node()
      n1.edge1 = 0
      n1.edge2 = 2
      n1.edge1 = 1
      $$._ n1
      $$.$ 'nodes'
      for node from n1
        $$._ node
      $$.$ 'edges'
      for node from n1.edges
        $$._ node
  
      $$.$ 'n2.DerivedNode'
      n2 = new DerivedNode(3)
  
      $$._ n2
      $$.$ 'nodes'
      for node from n2
        $$._ node
      $$.$ 'edges'
      for node from n2.edges
        $$._ node
   */

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZW5vZGUuanMiLCJzb3VyY2VzIjpbImVkZ2Vub2RlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQSxDQUFDLEVBQUQsRUFBSyxLQUFMLENBQUEsR0FBYyxPQUFBLENBQVEsVUFBUixDQUFkOztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTixFQUFjLEVBQWQ7OztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZBIiwic291cmNlc0NvbnRlbnQiOlsieyQkLCB1bml0X30gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZSwgJCRcbiMjI1xuY2xhc3MgUGxhaW5cblxuY2xhc3MgTm9kZVxuICBAVE5vZGUoKVxuICBAZWRnZSAnZWRnZTEnXG4gIEBlZGdlICdlZGdlMidcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQGVkZ2VzID0gW11cbiAgICBAZWRnZTEgPSAxXG4gICAgQGVkZ2UyID0gMlxuXG5jbGFzcyBEZXJpdmVkTm9kZSBleHRlbmRzIE5vZGVcbiAgQGVkZ2UgJ2VkZ2UzJ1xuICBjb25zdHJ1Y3RvcjogKGUpIC0+XG4gICAgc3VwZXIoKVxuICAgIEBlZGdlMyA9IGVcbmRlc2NyaWJlICdUTm9kZScsIC0+XG4gIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgJCQuJCAnY2xhc3MgUGxhaW4nXG4gICAgJCQuXyBQbGFpblxuICAgICNcbiAgICAkJC4kICdjbGFzcyBOb2RlJ1xuICAgICQkLl8gTm9kZS50b1N0cmluZygpXG4gICAgJCQuJCAnY2xhc3MgTm9kZS5wcm90b3R5cGUnXG4gICAgJCQuXyBOb2RlLnByb3RvdHlwZVxuICAgICNcbiAgICAkJC4kICdjbGFzcyBEZXJpdmVkTm9kZSdcbiAgICAkJC5fIERlcml2ZWROb2RlLnRvU3RyaW5nKClcbiAgICAkJC4kICdjbGFzcyBEZXJpdmVkTm9kZS5wcm90b3R5cGUnXG4gICAgJCQuXyBEZXJpdmVkTm9kZS5wcm90b3R5cGVcbiAgICAjXG4gICAgJCQuJCAnbjEuTm9kZSdcbiAgICBuMSA9IG5ldyBOb2RlKClcbiAgICBuMS5lZGdlMSA9IDBcbiAgICBuMS5lZGdlMiA9IDJcbiAgICBuMS5lZGdlMSA9IDFcbiAgICAkJC5fIG4xXG4gICAgJCQuJCAnbm9kZXMnXG4gICAgZm9yIG5vZGUgZnJvbSBuMVxuICAgICAgJCQuXyBub2RlXG4gICAgJCQuJCAnZWRnZXMnXG4gICAgZm9yIG5vZGUgZnJvbSBuMS5lZGdlc1xuICAgICAgJCQuXyBub2RlXG5cbiAgICAkJC4kICduMi5EZXJpdmVkTm9kZSdcbiAgICBuMiA9IG5ldyBEZXJpdmVkTm9kZSgzKVxuXG4gICAgJCQuXyBuMlxuICAgICQkLiQgJ25vZGVzJ1xuICAgIGZvciBub2RlIGZyb20gbjJcbiAgICAgICQkLl8gbm9kZVxuICAgICQkLiQgJ2VkZ2VzJ1xuICAgIGZvciBub2RlIGZyb20gbjIuZWRnZXNcbiAgICAgICQkLl8gbm9kZVxuIyMjXG4iXX0=
