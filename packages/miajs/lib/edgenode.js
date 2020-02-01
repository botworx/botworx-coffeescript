(function() {
  Function.prototype.TEdgeNode = function() {
    var proto;
    proto = {
      _TEdgeNode: {
        edgeCount: 0
      },
      add: function(child) {
        return this.edges.push({
          label: 'child',
          target: child
        });
      },
      remove: function(child) {
        var i, j, ref;
        for (i = j = 0, ref = this.edges.length(-1); (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (this.edges[i].target = child) {
            break;
          }
        }
        if (i > -1) {
          return this.nodes.splice(i, 1);
        }
      },
      walk: function(fn) {
        var child, ref, results;
        fn.apply(this);
        ref = this;
        results = [];
        for (child of ref) {
          results.push(child.walk(fn));
        }
        return results;
      }
    };
    proto[Symbol.iterator] = function*() {
      var edge, ref, results;
      ref = this.edges;
      results = [];
      for (edge of ref) {
        results.push((yield edge.target));
      }
      return results;
    };
    return Object.assign(this.prototype, proto);
  };

  Function.prototype.edge = function(name) {
    var desc, getter, index, setter;
    index = this.prototype._TEdgeNode.edgeCount++;
    getter = function() {
      return this.edges[index].target;
    };
    setter = function(val) {
      return this.edges[index] = {
        label: name,
        target: val
      };
    };
    desc = {
      get: getter,
      set: setter
    };
    return Object.defineProperty(this.prototype, name, desc);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZW5vZGUuanMiLCJzb3VyY2VzIjpbImVkZ2Vub2RlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBLFFBQVEsQ0FBQSxTQUFFLENBQUEsU0FBVixHQUFzQixRQUFBLENBQUEsQ0FBQTtBQUNwQixRQUFBO0lBQUEsS0FBQSxHQUNFO01BQUEsVUFBQSxFQUNFO1FBQUEsU0FBQSxFQUFXO01BQVgsQ0FERjtNQUVBLEdBQUEsRUFBSyxRQUFBLENBQUMsS0FBRCxDQUFBO2VBQ0gsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVk7VUFBQyxLQUFBLEVBQU8sT0FBUjtVQUFpQixNQUFBLEVBQVE7UUFBekIsQ0FBWjtNQURHLENBRkw7TUFJQSxNQUFBLEVBQVEsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUNOLFlBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtRQUFBLEtBQVMsZ0dBQVQ7VUFDRSxJQUFHLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsTUFBVixHQUFtQixLQUF0QjtBQUFpQyxrQkFBakM7O1FBREY7UUFFQSxJQUFHLENBQUEsR0FBSSxDQUFDLENBQVI7aUJBQWUsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFmOztNQUhNLENBSlI7TUFRQSxJQUFBLEVBQU0sUUFBQSxDQUFDLEVBQUQsQ0FBQTtBQUNKLFlBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQTtRQUFBLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVDtBQUNBO0FBQUE7UUFBQSxLQUFBLFlBQUE7dUJBQ0UsS0FBSyxDQUFDLElBQU4sQ0FBVyxFQUFYO1FBREYsQ0FBQTs7TUFGSTtJQVJOO0lBWUYsS0FBTSxDQUFBLE1BQU0sQ0FBQyxRQUFQLENBQU4sR0FBeUIsU0FBQSxDQUFBLENBQUE7QUFDdkIsVUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUE7QUFBQTtNQUFBLEtBQUEsV0FBQTtxQkFDRSxDQUFBLE1BQU0sSUFBSSxDQUFDLE1BQVg7TUFERixDQUFBOztJQUR1QjtXQUd6QixNQUFNLENBQUMsTUFBUCxDQUFjLElBQUMsQ0FBQSxTQUFmLEVBQTBCLEtBQTFCO0VBakJvQjs7RUFtQnRCLFFBQVEsQ0FBQSxTQUFFLENBQUEsSUFBVixHQUFpQixRQUFBLENBQUMsSUFBRCxDQUFBO0FBQ2YsUUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQTtJQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUF0QjtJQUNSLE1BQUEsR0FBUyxRQUFBLENBQUEsQ0FBQTthQUNQLElBQUMsQ0FBQSxLQUFNLENBQUEsS0FBQSxDQUFNLENBQUM7SUFEUDtJQUVULE1BQUEsR0FBUyxRQUFBLENBQUMsR0FBRCxDQUFBO2FBQ1AsSUFBQyxDQUFBLEtBQU0sQ0FBQSxLQUFBLENBQVAsR0FBZ0I7UUFBQyxLQUFBLEVBQU8sSUFBUjtRQUFjLE1BQUEsRUFBUTtNQUF0QjtJQURUO0lBRVQsSUFBQSxHQUNFO01BQUEsR0FBQSxFQUFLLE1BQUw7TUFDQSxHQUFBLEVBQUs7SUFETDtXQUVGLE1BQU0sQ0FBQyxjQUFQLENBQXNCLElBQUMsQ0FBQSxTQUF2QixFQUFrQyxJQUFsQyxFQUF3QyxJQUF4QztFQVRlO0FBbkJqQiIsInNvdXJjZXNDb250ZW50IjpbIkZ1bmN0aW9uOjpURWRnZU5vZGUgPSAtPlxuICBwcm90byA9XG4gICAgX1RFZGdlTm9kZTpcbiAgICAgIGVkZ2VDb3VudDogMFxuICAgIGFkZDogKGNoaWxkKSAtPlxuICAgICAgQGVkZ2VzLnB1c2gge2xhYmVsOiAnY2hpbGQnLCB0YXJnZXQ6IGNoaWxkfVxuICAgIHJlbW92ZTogKGNoaWxkKSAtPlxuICAgICAgZm9yIGkgaW4gWzAuLi5AZWRnZXMubGVuZ3RoIC0xXVxuICAgICAgICBpZiBAZWRnZXNbaV0udGFyZ2V0ID0gY2hpbGQgdGhlbiBicmVha1xuICAgICAgaWYgaSA+IC0xIHRoZW4gQG5vZGVzLnNwbGljZShpLCAxKVxuICAgIHdhbGs6IChmbikgLT5cbiAgICAgIGZuLmFwcGx5KHRoaXMpXG4gICAgICBmb3IgY2hpbGQgZnJvbSB0aGlzXG4gICAgICAgIGNoaWxkLndhbGsoZm4pXG4gIHByb3RvW1N5bWJvbC5pdGVyYXRvcl0gPSAtPlxuICAgIGZvciBlZGdlIGZyb20gQGVkZ2VzXG4gICAgICB5aWVsZCBlZGdlLnRhcmdldFxuICBPYmplY3QuYXNzaWduIEBwcm90b3R5cGUsIHByb3RvXG5cbkZ1bmN0aW9uOjplZGdlID0gKG5hbWUpIC0+XG4gIGluZGV4ID0gQHByb3RvdHlwZS5fVEVkZ2VOb2RlLmVkZ2VDb3VudCsrXG4gIGdldHRlciA9IC0+XG4gICAgQGVkZ2VzW2luZGV4XS50YXJnZXRcbiAgc2V0dGVyID0gKHZhbCkgLT5cbiAgICBAZWRnZXNbaW5kZXhdID0ge2xhYmVsOiBuYW1lLCB0YXJnZXQ6IHZhbH1cbiAgZGVzYyA9XG4gICAgZ2V0OiBnZXR0ZXJcbiAgICBzZXQ6IHNldHRlclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkgQHByb3RvdHlwZSwgbmFtZSwgZGVzY1xuIl19
