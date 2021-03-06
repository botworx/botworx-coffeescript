(function() {
  var AstVisitor, Scope, Visitor;

  ({Visitor} = require('./visitor'));

  Scope = class Scope {
    constructor(parent) {
      this.parent = parent;
      this.vars = {};
    }

    add(v) {
      var k;
      k = v.name;
      if (!this.vars[k]) {
        this.vars[k] = v;
      }
      return this.vars[k];
    }

    var_(v, r) {
      var name, type;
      ({name, type} = v);
      return v.info = this.add({
        name: name,
        value: r,
        type: type
      });
    }

    qvar_(v, r) {
      var name, type;
      ({name, type} = v);
      return v.info = this.add({
        name: name,
        value: r,
        type: type,
        qvar: true
      });
    }

    find(k) {
      var v;
      v = this.vars[k];
      if (v) {
        return v;
      }
      if (this.parent) {
        return this.parent.find(k);
      }
    }

  };

  //exports.Scope = Scope
  AstVisitor = class AstVisitor extends Visitor {
    constructor() {
      super();
      this.states = [];
      //State members
      this.scope = null;
      this.block = null;
      this.stmt = null;
      this.subj = null;
      this.value = null;
    }

    scope_(node) {
      if (node.scope) {
        this.scope = node.scope;
      } else {
        this.scope = new Scope(this.scope);
        node.scope = this.scope;
      }
      return node;
    }

    var_(k, v) {
      return this.scope.add(k, {
        key: k,
        value: v
      });
    }

    qvar_(k, v) {
      return this.scope.add(k, {
        key: k,
        value: v,
        qvar: true
      });
    }

    save() {
      return this.states.push({
        delegator: this.delegator,
        scope: this.scope,
        block: this.block,
        stmt: this.stmt,
        subj: this.subj,
        value: this.value
      });
    }

    restore() {
      return ({delegator: this.delegator, scope: this.scope, block: this.block, stmt: this.stmt, subj: this.subj, value: this.value} = this.states.pop());
    }

    visitNode(node) {
      var result;
      if (node.scope) {
        //@save()
        this.scope = node.scope;
        result = super.visitNode(node);
      } else {
        //@restore()
        result = super.visitNode(node);
      }
      return result;
    }

  };

  exports.AstVisitor = AstVisitor;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0dmlzaXRvci5qcyIsInNvdXJjZXMiOlsiYXN0dmlzaXRvci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsQ0FBQSxDQUFDLE9BQUQsQ0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBQVo7O0VBRU0sUUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLE9BQUEsQ0FBQTtNQUFDLElBQUMsQ0FBQTtNQUNiLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQTtJQURHOztJQUdiLEdBQUssQ0FBQyxDQUFELENBQUE7QUFDSCxVQUFBO01BQUEsQ0FBQSxHQUFJLENBQUMsQ0FBQztNQUNOLElBQUcsQ0FBQyxJQUFDLENBQUEsSUFBSyxDQUFBLENBQUEsQ0FBVjtRQUNFLElBQUMsQ0FBQSxJQUFLLENBQUEsQ0FBQSxDQUFOLEdBQVcsRUFEYjs7QUFFQSxhQUFPLElBQUMsQ0FBQSxJQUFLLENBQUEsQ0FBQTtJQUpWOztJQU1MLElBQU0sQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFBO0FBQ0osVUFBQSxJQUFBLEVBQUE7TUFBQSxDQUFBLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBQSxHQUFlLENBQWY7YUFDQSxDQUFDLENBQUMsSUFBRixHQUFTLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQyxJQUFBLEVBQU0sSUFBUDtRQUFhLEtBQUEsRUFBTyxDQUFwQjtRQUF1QixJQUFBLEVBQU07TUFBN0IsQ0FBTDtJQUZMOztJQUlOLEtBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFBO0FBQ0wsVUFBQSxJQUFBLEVBQUE7TUFBQSxDQUFBLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBQSxHQUFlLENBQWY7YUFDQSxDQUFDLENBQUMsSUFBRixHQUFTLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQyxJQUFBLEVBQU0sSUFBUDtRQUFhLEtBQUEsRUFBTyxDQUFwQjtRQUF1QixJQUFBLEVBQU0sSUFBN0I7UUFBbUMsSUFBQSxFQUFNO01BQXpDLENBQUw7SUFGSjs7SUFJUCxJQUFNLENBQUMsQ0FBRCxDQUFBO0FBQ0osVUFBQTtNQUFBLENBQUEsR0FBSSxJQUFDLENBQUEsSUFBSyxDQUFBLENBQUE7TUFDVixJQUFHLENBQUg7QUFBVSxlQUFPLEVBQWpCOztNQUNBLElBQUcsSUFBQyxDQUFBLE1BQUo7QUFBZ0IsZUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBYSxDQUFiLEVBQXZCOztJQUhJOztFQWxCUixFQUZBOzs7RUEyQk0sYUFBTixNQUFBLFdBQUEsUUFBeUIsUUFBekI7SUFDRSxXQUFhLENBQUEsQ0FBQTtXQUNYLENBQUE7TUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLEdBRFY7O01BR0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsSUFBRCxHQUFRO01BQ1IsSUFBQyxDQUFBLElBQUQsR0FBUTtNQUNSLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFSRTs7SUFVYixNQUFRLENBQUMsSUFBRCxDQUFBO01BQ04sSUFBRyxJQUFJLENBQUMsS0FBUjtRQUNFLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxDQUFDLE1BRGhCO09BQUEsTUFBQTtRQUdFLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxLQUFKLENBQVUsSUFBQyxDQUFBLEtBQVg7UUFDVCxJQUFJLENBQUMsS0FBTCxHQUFhLElBQUMsQ0FBQSxNQUpoQjs7QUFLQSxhQUFPO0lBTkQ7O0lBUVIsSUFBTSxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUE7YUFDSixJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxDQUFYLEVBQWM7UUFBQyxHQUFBLEVBQUssQ0FBTjtRQUFTLEtBQUEsRUFBTztNQUFoQixDQUFkO0lBREk7O0lBR04sS0FBTyxDQUFDLENBQUQsRUFBSSxDQUFKLENBQUE7YUFDTCxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVyxDQUFYLEVBQWM7UUFBQyxHQUFBLEVBQUssQ0FBTjtRQUFTLEtBQUEsRUFBTyxDQUFoQjtRQUFtQixJQUFBLEVBQU07TUFBekIsQ0FBZDtJQURLOztJQUdQLElBQU0sQ0FBQSxDQUFBO2FBQ0osSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQ0U7UUFBQSxTQUFBLEVBQVcsSUFBQyxDQUFBLFNBQVo7UUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRFI7UUFFQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRlI7UUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLElBSFA7UUFJQSxJQUFBLEVBQU0sSUFBQyxDQUFBLElBSlA7UUFLQSxLQUFBLEVBQU8sSUFBQyxDQUFBO01BTFIsQ0FERjtJQURJOztJQVNOLE9BQVMsQ0FBQSxDQUFBO2FBQ1AsQ0FBQSxDQUFFLFdBQUQsSUFBQyxDQUFBLFNBQUYsRUFBYyxPQUFELElBQUMsQ0FBQSxLQUFkLEVBQXNCLE9BQUQsSUFBQyxDQUFBLEtBQXRCLEVBQThCLE1BQUQsSUFBQyxDQUFBLElBQTlCLEVBQXFDLE1BQUQsSUFBQyxDQUFBLElBQXJDLEVBQTRDLE9BQUQsSUFBQyxDQUFBLEtBQTVDLENBQUEsR0FBcUQsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFSLENBQUEsQ0FBckQ7SUFETzs7SUFHVCxTQUFXLENBQUMsSUFBRCxDQUFBO0FBQ1QsVUFBQTtNQUFBLElBQUcsSUFBSSxDQUFDLEtBQVI7O1FBRUUsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUM7UUFDZCxNQUFBLFFBSkosQ0FBQSxTQUlhLENBQU0sSUFBTixFQUhYO09BQUEsTUFBQTs7UUFNRSxNQUFBLFFBUEosQ0FBQSxTQU9hLENBQU0sSUFBTixFQU5YOztBQU9BLGFBQU87SUFSRTs7RUFyQ2I7O0VBK0NBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCO0FBMUVyQiIsInNvdXJjZXNDb250ZW50IjpbIntWaXNpdG9yfSA9IHJlcXVpcmUgJy4vdmlzaXRvcidcblxuY2xhc3MgU2NvcGVcbiAgY29uc3RydWN0b3I6IChAcGFyZW50KSAtPlxuICAgIEB2YXJzID0ge31cblxuICBhZGQ6ICh2KSAtPlxuICAgIGsgPSB2Lm5hbWVcbiAgICBpZiAhQHZhcnNba11cbiAgICAgIEB2YXJzW2tdID0gdlxuICAgIHJldHVybiBAdmFyc1trXVxuXG4gIHZhcl86ICh2LCByKS0+XG4gICAge25hbWUsIHR5cGV9ID0gdlxuICAgIHYuaW5mbyA9IEBhZGQge25hbWU6IG5hbWUsIHZhbHVlOiByLCB0eXBlOiB0eXBlfVxuXG4gIHF2YXJfOiAodiwgciktPlxuICAgIHtuYW1lLCB0eXBlfSA9IHZcbiAgICB2LmluZm8gPSBAYWRkIHtuYW1lOiBuYW1lLCB2YWx1ZTogciwgdHlwZTogdHlwZSwgcXZhcjogdHJ1ZX1cblxuICBmaW5kOiAoaykgLT5cbiAgICB2ID0gQHZhcnNba11cbiAgICBpZiB2IHRoZW4gcmV0dXJuIHZcbiAgICBpZiBAcGFyZW50IHRoZW4gcmV0dXJuIEBwYXJlbnQuZmluZCBrXG5cbiNleHBvcnRzLlNjb3BlID0gU2NvcGVcblxuY2xhc3MgQXN0VmlzaXRvciBleHRlbmRzIFZpc2l0b3JcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXIoKVxuICAgIEBzdGF0ZXMgPSBbXVxuICAgICNTdGF0ZSBtZW1iZXJzXG4gICAgQHNjb3BlID0gbnVsbFxuICAgIEBibG9jayA9IG51bGxcbiAgICBAc3RtdCA9IG51bGxcbiAgICBAc3ViaiA9IG51bGxcbiAgICBAdmFsdWUgPSBudWxsXG5cbiAgc2NvcGVfOiAobm9kZSkgLT5cbiAgICBpZiBub2RlLnNjb3BlXG4gICAgICBAc2NvcGUgPSBub2RlLnNjb3BlXG4gICAgZWxzZVxuICAgICAgQHNjb3BlID0gbmV3IFNjb3BlKEBzY29wZSlcbiAgICAgIG5vZGUuc2NvcGUgPSBAc2NvcGVcbiAgICByZXR1cm4gbm9kZVxuXG4gIHZhcl86IChrLCB2KS0+XG4gICAgQHNjb3BlLmFkZCBrLCB7a2V5OiBrLCB2YWx1ZTogdn1cblxuICBxdmFyXzogKGssIHYpLT5cbiAgICBAc2NvcGUuYWRkIGssIHtrZXk6IGssIHZhbHVlOiB2LCBxdmFyOiB0cnVlfVxuXG4gIHNhdmU6IC0+XG4gICAgQHN0YXRlcy5wdXNoXG4gICAgICBkZWxlZ2F0b3I6IEBkZWxlZ2F0b3JcbiAgICAgIHNjb3BlOiBAc2NvcGVcbiAgICAgIGJsb2NrOiBAYmxvY2tcbiAgICAgIHN0bXQ6IEBzdG10XG4gICAgICBzdWJqOiBAc3VialxuICAgICAgdmFsdWU6IEB2YWx1ZVxuXG4gIHJlc3RvcmU6IC0+XG4gICAge0BkZWxlZ2F0b3IsIEBzY29wZSwgQGJsb2NrLCBAc3RtdCwgQHN1YmosIEB2YWx1ZX0gPSBAc3RhdGVzLnBvcCgpXG5cbiAgdmlzaXROb2RlOiAobm9kZSkgLT5cbiAgICBpZiBub2RlLnNjb3BlXG4gICAgICAjQHNhdmUoKVxuICAgICAgQHNjb3BlID0gbm9kZS5zY29wZVxuICAgICAgcmVzdWx0ID0gc3VwZXIobm9kZSlcbiAgICAgICNAcmVzdG9yZSgpXG4gICAgZWxzZVxuICAgICAgcmVzdWx0ID0gc3VwZXIobm9kZSlcbiAgICByZXR1cm4gcmVzdWx0XG5cbmV4cG9ydHMuQXN0VmlzaXRvciA9IEFzdFZpc2l0b3JcbiJdfQ==
