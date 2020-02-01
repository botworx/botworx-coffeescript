(function() {
  Function.prototype.TNode = function() {
    var proto;
    proto = {
      _TNode: {
        nodeCount: 0
      },
      add: function(child) {
        //child.parent = @
        return this.nodes.push(child);
      },
      remove: function(child) {
        var index;
        index = this.nodes.indexOf(child);
        if (index > -1) {
          return this.nodes.splice(index, 1);
        }
      },
      walk: function(fn) {
        var child, i, len, ref, results;
        fn.apply(this);
        ref = this.nodes;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(child.walk(fn));
        }
        return results;
      }
    };
    proto[Symbol.iterator] = function*() {
      var node, ref, results;
      ref = this.nodes;
      results = [];
      for (node of ref) {
        results.push((yield node));
      }
      return results;
    };
    return Object.assign(this.prototype, proto);
  };

  Function.prototype.node = function(name) {
    var desc, getter, index, setter;
    index = this.prototype._TNode.nodeCount++;
    getter = function() {
      return this.nodes[index];
    };
    setter = function(val) {
      return this.nodes[index] = val;
    };
    desc = {
      get: getter,
      set: setter
    };
    return Object.defineProperty(this.prototype, name, desc);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZXMiOlsibm9kZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxRQUFRLENBQUEsU0FBRSxDQUFBLEtBQVYsR0FBa0IsUUFBQSxDQUFBLENBQUE7QUFDaEIsUUFBQTtJQUFBLEtBQUEsR0FDRTtNQUFBLE1BQUEsRUFDRTtRQUFBLFNBQUEsRUFBVztNQUFYLENBREY7TUFHQSxHQUFBLEVBQUssUUFBQSxDQUFDLEtBQUQsQ0FBQSxFQUFBOztlQUVILElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLEtBQVo7TUFGRyxDQUhMO01BT0EsTUFBQSxFQUFRLFFBQUEsQ0FBQyxLQUFELENBQUE7QUFDTixZQUFBO1FBQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlLEtBQWY7UUFDUixJQUFHLEtBQUEsR0FBUSxDQUFDLENBQVo7aUJBQW1CLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBbkI7O01BRk0sQ0FQUjtNQVdBLElBQUEsRUFBTSxRQUFBLENBQUMsRUFBRCxDQUFBO0FBQ0osWUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7UUFBQSxFQUFFLENBQUMsS0FBSCxDQUFTLElBQVQ7QUFDQTtBQUFBO1FBQUEsS0FBQSxxQ0FBQTs7dUJBQ0UsS0FBSyxDQUFDLElBQU4sQ0FBVyxFQUFYO1FBREYsQ0FBQTs7TUFGSTtJQVhOO0lBZ0JGLEtBQU0sQ0FBQSxNQUFNLENBQUMsUUFBUCxDQUFOLEdBQXlCLFNBQUEsQ0FBQSxDQUFBO0FBQ3ZCLFVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtBQUFBO0FBQUE7TUFBQSxLQUFBLFdBQUE7cUJBQ0UsQ0FBQSxNQUFNLElBQU47TUFERixDQUFBOztJQUR1QjtXQUl6QixNQUFNLENBQUMsTUFBUCxDQUFjLElBQUMsQ0FBQSxTQUFmLEVBQTBCLEtBQTFCO0VBdEJnQjs7RUF3QmxCLFFBQVEsQ0FBQSxTQUFFLENBQUEsSUFBVixHQUFpQixRQUFBLENBQUMsSUFBRCxDQUFBO0FBQ2YsUUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFsQjtJQUNSLE1BQUEsR0FBUyxRQUFBLENBQUEsQ0FBQTthQUNQLElBQUMsQ0FBQSxLQUFNLENBQUEsS0FBQTtJQURBO0lBRVQsTUFBQSxHQUFTLFFBQUEsQ0FBQyxHQUFELENBQUE7YUFDUCxJQUFDLENBQUEsS0FBTSxDQUFBLEtBQUEsQ0FBUCxHQUFnQjtJQURUO0lBRVQsSUFBQSxHQUNFO01BQUEsR0FBQSxFQUFLLE1BQUw7TUFDQSxHQUFBLEVBQUs7SUFETDtXQUVGLE1BQU0sQ0FBQyxjQUFQLENBQXNCLElBQUMsQ0FBQSxTQUF2QixFQUFrQyxJQUFsQyxFQUF3QyxJQUF4QztFQVRlO0FBeEJqQiIsInNvdXJjZXNDb250ZW50IjpbIkZ1bmN0aW9uOjpUTm9kZSA9IC0+XG4gIHByb3RvID1cbiAgICBfVE5vZGU6XG4gICAgICBub2RlQ291bnQ6IDBcblxuICAgIGFkZDogKGNoaWxkKSAtPlxuICAgICAgI2NoaWxkLnBhcmVudCA9IEBcbiAgICAgIEBub2Rlcy5wdXNoKGNoaWxkKVxuXG4gICAgcmVtb3ZlOiAoY2hpbGQpIC0+XG4gICAgICBpbmRleCA9IEBub2Rlcy5pbmRleE9mKGNoaWxkKVxuICAgICAgaWYgaW5kZXggPiAtMSB0aGVuIEBub2Rlcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICB3YWxrOiAoZm4pIC0+XG4gICAgICBmbi5hcHBseSh0aGlzKVxuICAgICAgZm9yIGNoaWxkIGluIEBub2Rlc1xuICAgICAgICBjaGlsZC53YWxrKGZuKVxuXG4gIHByb3RvW1N5bWJvbC5pdGVyYXRvcl0gPSAtPlxuICAgIGZvciBub2RlIGZyb20gQG5vZGVzXG4gICAgICB5aWVsZCBub2RlXG5cbiAgT2JqZWN0LmFzc2lnbiBAcHJvdG90eXBlLCBwcm90b1xuXG5GdW5jdGlvbjo6bm9kZSA9IChuYW1lKSAtPlxuICBpbmRleCA9IEBwcm90b3R5cGUuX1ROb2RlLm5vZGVDb3VudCsrXG4gIGdldHRlciA9IC0+XG4gICAgQG5vZGVzW2luZGV4XVxuICBzZXR0ZXIgPSAodmFsKSAtPlxuICAgIEBub2Rlc1tpbmRleF0gPSB2YWxcbiAgZGVzYyA9XG4gICAgZ2V0OiBnZXR0ZXJcbiAgICBzZXQ6IHNldHRlclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgQHByb3RvdHlwZSwgbmFtZSwgZGVzY1xuIl19
