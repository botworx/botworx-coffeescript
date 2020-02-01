(function() {
  var Delegator, Visitor;

  Delegator = class Delegator {
    constructor(parent, delegates1) {
      this.parent = parent;
      this.delegates = delegates1;
    }

    find(kind) {
      var delegate;
      delegate = this.delegates[kind];
      if (delegate) {
        return delegate;
      }
      if (this.parent) {
        return this.parent.find(kind);
      }
    }

  };

  Visitor = class Visitor {
    constructor() {
      this.delegator = null;
      this.stack = [];
    }

    top(ndx = 0) {
      return this.stack[this.stack.length + (ndx - 1)];
    }

    delegator_(delegates) {
      return this.delegator = new Delegator(this.delegator, delegates);
    }

    visitNode(node) {
      var child, i, j, len, len1, ref, results;
      if (!node) {
        return;
      }
      if (Array.isArray(node)) {
        for (i = 0, len = node.length; i < len; i++) {
          child = node[i];
          this.visit(child);
        }
        return;
      }
      if (!node._TNode) {
        throw new Error(JSON.stringify(node));
      }
      ref = node.nodes;
      results = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        child = ref[j];
        results.push(this.visit(child));
      }
      return results;
    }

    visit(node) {
      var delegate, result;
      if (!node) {
        return;
      }
      this.save();
      this.stack.push(node);
      delegate = this.delegator.find(node.kind);
      if (!delegate) {
        result = this.visitNode(node);
      } else {
        result = delegate.call(this, node);
      }
      this.stack.pop();
      this.restore();
      return result;
    }

  };

  exports.Visitor = Visitor;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZXMiOlsidmlzaXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFNBQUEsRUFBQTs7RUFBTSxZQUFOLE1BQUEsVUFBQTtJQUNFLFdBQWEsT0FBQSxZQUFBLENBQUE7TUFBQyxJQUFDLENBQUE7TUFBUSxJQUFDLENBQUE7SUFBWDs7SUFFYixJQUFNLENBQUMsSUFBRCxDQUFBO0FBQ0osVUFBQTtNQUFBLFFBQUEsR0FBVyxJQUFDLENBQUEsU0FBVSxDQUFBLElBQUE7TUFDdEIsSUFBRyxRQUFIO0FBQWlCLGVBQU8sU0FBeEI7O01BQ0EsSUFBRyxJQUFDLENBQUEsTUFBSjtBQUFnQixlQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsRUFBdkI7O0lBSEk7O0VBSFI7O0VBUU0sVUFBTixNQUFBLFFBQUE7SUFDRSxXQUFhLENBQUEsQ0FBQTtNQUNYLElBQUMsQ0FBQSxTQUFELEdBQWE7TUFDYixJQUFDLENBQUEsS0FBRCxHQUFTO0lBRkU7O0lBR2IsR0FBSyxDQUFDLE1BQU0sQ0FBUCxDQUFBO0FBQ0gsYUFBTyxJQUFDLENBQUEsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQixDQUFDLEdBQUEsR0FBSSxDQUFMLENBQWhCO0lBRFg7O0lBRUwsVUFBWSxDQUFDLFNBQUQsQ0FBQTthQUNWLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFBSSxTQUFKLENBQWMsSUFBQyxDQUFBLFNBQWYsRUFBMEIsU0FBMUI7SUFESDs7SUFHWixTQUFXLENBQUMsSUFBRCxDQUFBO0FBQ1QsVUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQTtNQUFBLElBQUcsQ0FBQyxJQUFKO0FBQWMsZUFBZDs7TUFDQSxJQUFHLEtBQUssQ0FBQyxPQUFOLENBQWMsSUFBZCxDQUFIO1FBQ0UsS0FBQSxzQ0FBQTs7VUFDRSxJQUFDLENBQUEsS0FBRCxDQUFPLEtBQVA7UUFERjtBQUVBLGVBSEY7O01BSUEsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFUO1FBQXFCLE1BQU0sSUFBSSxLQUFKLENBQVUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQVYsRUFBM0I7O0FBQ0E7QUFBQTtNQUFBLEtBQUEsdUNBQUE7O3FCQUNFLElBQUMsQ0FBQSxLQUFELENBQU8sS0FBUDtNQURGLENBQUE7O0lBUFM7O0lBVVgsS0FBTyxDQUFDLElBQUQsQ0FBQTtBQUVMLFVBQUEsUUFBQSxFQUFBO01BQUEsSUFBRyxDQUFDLElBQUo7QUFBYyxlQUFkOztNQUNBLElBQUMsQ0FBQSxJQUFELENBQUE7TUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxJQUFaO01BQ0EsUUFBQSxHQUFXLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFnQixJQUFJLENBQUMsSUFBckI7TUFDWCxJQUFHLENBQUMsUUFBSjtRQUNFLE1BQUEsR0FBUyxJQUFDLENBQUEsU0FBRCxDQUFXLElBQVgsRUFEWDtPQUFBLE1BQUE7UUFHRSxNQUFBLEdBQVMsUUFBUSxDQUFDLElBQVQsQ0FBYyxJQUFkLEVBQW9CLElBQXBCLEVBSFg7O01BSUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQUE7TUFDQSxJQUFDLENBQUEsT0FBRCxDQUFBO0FBQ0EsYUFBTztJQVpGOztFQW5CVDs7RUFpQ0EsT0FBTyxDQUFDLE9BQVIsR0FBa0I7QUF6Q2xCIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRGVsZWdhdG9yXHJcbiAgY29uc3RydWN0b3I6IChAcGFyZW50LCBAZGVsZWdhdGVzKSAtPlxyXG5cclxuICBmaW5kOiAoa2luZCkgLT5cclxuICAgIGRlbGVnYXRlID0gQGRlbGVnYXRlc1traW5kXVxyXG4gICAgaWYgZGVsZWdhdGUgdGhlbiByZXR1cm4gZGVsZWdhdGVcclxuICAgIGlmIEBwYXJlbnQgdGhlbiByZXR1cm4gQHBhcmVudC5maW5kIGtpbmRcclxuXHJcbmNsYXNzIFZpc2l0b3JcclxuICBjb25zdHJ1Y3RvcjogLT5cclxuICAgIEBkZWxlZ2F0b3IgPSBudWxsXHJcbiAgICBAc3RhY2sgPSBbXVxyXG4gIHRvcDogKG5keCA9IDApIC0+XHJcbiAgICByZXR1cm4gQHN0YWNrW0BzdGFjay5sZW5ndGggKyAobmR4LTEpXVxyXG4gIGRlbGVnYXRvcl86IChkZWxlZ2F0ZXMpIC0+XHJcbiAgICBAZGVsZWdhdG9yID0gbmV3IERlbGVnYXRvcihAZGVsZWdhdG9yLCBkZWxlZ2F0ZXMpXHJcblxyXG4gIHZpc2l0Tm9kZTogKG5vZGUpIC0+XHJcbiAgICBpZiAhbm9kZSB0aGVuIHJldHVyblxyXG4gICAgaWYgQXJyYXkuaXNBcnJheSBub2RlXHJcbiAgICAgIGZvciBjaGlsZCBpbiBub2RlXHJcbiAgICAgICAgQHZpc2l0IGNoaWxkXHJcbiAgICAgIHJldHVyblxyXG4gICAgaWYgIW5vZGUuX1ROb2RlIHRoZW4gdGhyb3cgbmV3IEVycm9yIEpTT04uc3RyaW5naWZ5KG5vZGUpXHJcbiAgICBmb3IgY2hpbGQgaW4gbm9kZS5ub2Rlc1xyXG4gICAgICBAdmlzaXQgY2hpbGRcclxuXHJcbiAgdmlzaXQ6IChub2RlKSAtPlxyXG4gICAgI2lmICFub2RlIHRoZW4gdGhyb3cgbmV3IEVycm9yKG5vZGUpXHJcbiAgICBpZiAhbm9kZSB0aGVuIHJldHVyblxyXG4gICAgQHNhdmUoKVxyXG4gICAgQHN0YWNrLnB1c2ggbm9kZVxyXG4gICAgZGVsZWdhdGUgPSBAZGVsZWdhdG9yLmZpbmQobm9kZS5raW5kKVxyXG4gICAgaWYgIWRlbGVnYXRlXHJcbiAgICAgIHJlc3VsdCA9IEB2aXNpdE5vZGUgbm9kZVxyXG4gICAgZWxzZVxyXG4gICAgICByZXN1bHQgPSBkZWxlZ2F0ZS5jYWxsKHRoaXMsIG5vZGUpXHJcbiAgICBAc3RhY2sucG9wKClcclxuICAgIEByZXN0b3JlKClcclxuICAgIHJldHVybiByZXN1bHRcclxuXHJcbmV4cG9ydHMuVmlzaXRvciA9IFZpc2l0b3JcclxuIl19
