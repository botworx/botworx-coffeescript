(function() {
  var Believe, Condition, Query, Variable, query_;

  ({Variable, Believe} = require('./main'));

  Query = class Query {
    constructor(ctx1) {
      this.ctx = ctx1;
      this.conds = [];
    }

    add(c) {
      c.query = this;
      c.ctx = this.ctx;
      return this.conds.push(c);
    }

    where(s, v, o, x, t) {
      var cond, src;
      cond = new Condition(s, v, o, x, t);
      src = this.conds[this.conds.length - 1];
      if (src) {
        cond.src = src;
      }
      this.add(cond);
      return this;
    }

    and(s, v, o, x, t) {
      return this.where(s, v, o, x, t);
    }

    * binders() {
      return (yield* this.conds[this.conds.length - 1].binders());
    }

    exec(onEach, onAll) {
      var binder, ref, results;
      ref = this.binders();
      results = [];
      for (binder of ref) {
        results.push(onEach(binder));
      }
      return results;
    }

  };

  exports.Query = Query;

  exports.query_ = query_ = function(ctx) {
    return new Query(ctx);
  };

  Condition = class Condition {
    constructor(s1, v1, o1, x1, t) {
      this.s = s1;
      this.v = v1;
      this.o = o1;
      this.x = x1;
      this.t = t || Believe;
    }

    * blank() {
      return (yield {});
    }

    bound(b, v) {
      if (b[v.name]) {
        return true;
      } else {
        return false;
      }
    }

    binding(b, v) {
      return b[v.name];
    }

    * binders() {
      var binder, c, o, results, s, source;
      if (this.src) {
        source = this.src.binders();
      } else {
        source = this.blank();
      }
      results = [];
      for (binder of source) {
        s = this.binding(binder, this.s) || this.s;
        o = this.binding(binder, this.o) || this.o;
        if (s instanceof Variable) {
          if (o instanceof Variable) {
            results.push((yield* (function*() {
              var ref, results1;
              ref = this.ctx.match(s, this.v, o, this.x, this.t);
              results1 = [];
              for (c of ref) {
                results1.push((yield Object.assign({
                  [`${s.name}`]: c.subj,
                  [`${o.name}`]: c.obj
                }, binder)));
              }
              return results1;
            }).call(this)));
          } else {
            results.push((yield* (function*() {
              var ref, results1;
              ref = this.ctx.match(s, this.v, o, this.x, this.t);
              results1 = [];
              for (c of ref) {
                results1.push((yield Object.assign({
                  [`${s.name}`]: c.subj
                }, binder)));
              }
              return results1;
            }).call(this)));
          }
        } else {
          if (o instanceof Variable) {
            results.push((yield* (function*() {
              var ref, results1;
              ref = this.ctx.match(s, this.v, o, this.x, this.t);
              results1 = [];
              for (c of ref) {
                results1.push((yield Object.assign({
                  [`${o.name}`]: c.obj
                }, binder)));
              }
              return results1;
            }).call(this)));
          } else {
            results.push((yield* (function*() {
              var ref, results1;
              ref = this.ctx.match(s, this.v, o, this.x, this.t);
              results1 = [];
              for (c of ref) {
                results1.push((yield binder));
              }
              return results1;
            }).call(this)));
          }
        }
      }
      return results;
    }

  };

  exports.Condition = Condition;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VzIjpbInF1ZXJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQSxDQUFDLFFBQUQsRUFBVyxPQUFYLENBQUEsR0FBc0IsT0FBQSxDQUFRLFFBQVIsQ0FBdEI7O0VBRU0sUUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLEtBQUEsQ0FBQTtNQUFDLElBQUMsQ0FBQTtNQUNiLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFERTs7SUFFYixHQUFLLENBQUMsQ0FBRCxDQUFBO01BQ0gsQ0FBQyxDQUFDLEtBQUYsR0FBVTtNQUNWLENBQUMsQ0FBQyxHQUFGLEdBQVEsSUFBQyxDQUFBO2FBQ1QsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQVksQ0FBWjtJQUhHOztJQUlMLEtBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixDQUFBO0FBQ0wsVUFBQTtNQUFBLElBQUEsR0FBTyxJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCO01BQ1AsR0FBQSxHQUFNLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFQLEdBQWdCLENBQWhCO01BRWIsSUFBRyxHQUFIO1FBQ0UsSUFBSSxDQUFDLEdBQUwsR0FBVyxJQURiOztNQUVBLElBQUMsQ0FBQSxHQUFELENBQUssSUFBTDtBQUNBLGFBQU87SUFQRjs7SUFRUCxHQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsQ0FBQTthQUFtQixJQUFDLENBQUEsS0FBRCxDQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQjtJQUFuQjs7SUFDSSxFQUFULE9BQVMsQ0FBQSxDQUFBO2FBQ1AsQ0FBQSxPQUFXLElBQUMsQ0FBQSxLQUFN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QTs4QkFDRSxDQUFBLE1BQU0sTUFBTjtBQURGOzt5QkFBQSxHQUpGO1dBUkY7O0FBSEY7O0lBTE87O0VBYlg7O0VBb0NBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CO0FBL0RwQiIsInNvdXJjZXNDb250ZW50IjpbIntWYXJpYWJsZSwgQmVsaWV2ZX0gPSByZXF1aXJlICcuL21haW4nXG5cbmNsYXNzIFF1ZXJ5XG4gIGNvbnN0cnVjdG9yOiAoQGN0eCktPlxuICAgIEBjb25kcyA9IFtdXG4gIGFkZDogKGMpIC0+XG4gICAgYy5xdWVyeSA9IHRoaXNcbiAgICBjLmN0eCA9IEBjdHhcbiAgICBAY29uZHMucHVzaCBjXG4gIHdoZXJlOiAocywgdiwgbywgeCwgdCkgLT5cbiAgICBjb25kID0gbmV3IENvbmRpdGlvbihzLCB2LCBvLCB4LCB0KVxuICAgIHNyYyA9IEBjb25kc1tAY29uZHMubGVuZ3RoIC0gMV1cbiAgICAjY29uc29sZS5sb2cgc3JjXG4gICAgaWYgc3JjXG4gICAgICBjb25kLnNyYyA9IHNyY1xuICAgIEBhZGQgY29uZFxuICAgIHJldHVybiB0aGlzXG4gIGFuZDogKHMsIHYsIG8sIHgsIHQpIC0+IEB3aGVyZShzLCB2LCBvLCB4LCB0KVxuICBiaW5kZXJzOiAtPlxuICAgIHlpZWxkIGZyb20gQGNvbmRzW0Bjb25kcy5sZW5ndGggLSAxXS5iaW5kZXJzKClcbiAgZXhlYzogKG9uRWFjaCwgb25BbGwpIC0+XG4gICAgZm9yIGJpbmRlciBmcm9tIEBiaW5kZXJzKClcbiAgICAgIG9uRWFjaCBiaW5kZXJcblxuZXhwb3J0cy5RdWVyeSA9IFF1ZXJ5XG5leHBvcnRzLnF1ZXJ5XyA9IHF1ZXJ5XyA9IChjdHgpIC0+IG5ldyBRdWVyeSBjdHhcblxuY2xhc3MgQ29uZGl0aW9uXG4gIGNvbnN0cnVjdG9yOiAoQHMsIEB2LCBAbywgQHgsIHQpIC0+XG4gICAgQHQgPSB0IHx8IEJlbGlldmVcblxuICBibGFuazogLT5cbiAgICB5aWVsZCB7fVxuXG4gIGJvdW5kOiAoYiwgdikgLT5cbiAgICBpZiBiW3YubmFtZV0gdGhlbiB0cnVlIGVsc2UgZmFsc2VcblxuICBiaW5kaW5nOiAoYiwgdikgLT5cbiAgICByZXR1cm4gYlt2Lm5hbWVdXG5cbiAgYmluZGVyczogLT5cbiAgICBpZiBAc3JjXG4gICAgICBzb3VyY2UgPSBAc3JjLmJpbmRlcnMoKVxuICAgIGVsc2VcbiAgICAgIHNvdXJjZSA9IEBibGFuaygpXG4gICAgZm9yIGJpbmRlciBmcm9tIHNvdXJjZVxuICAgICAgcyA9IEBiaW5kaW5nKGJpbmRlciwgQHMpIHx8IEBzXG4gICAgICBvID0gQGJpbmRpbmcoYmluZGVyLCBAbykgfHwgQG9cbiAgICAgIGlmIHMgaW5zdGFuY2VvZiBWYXJpYWJsZVxuICAgICAgICBpZiBvIGluc3RhbmNlb2YgVmFyaWFibGVcbiAgICAgICAgICBmb3IgYyBmcm9tIEBjdHgubWF0Y2gocywgQHYsIG8sIEB4LCBAdClcbiAgICAgICAgICAgIHlpZWxkIE9iamVjdC5hc3NpZ24ge1wiI3tzLm5hbWV9XCI6IGMuc3ViaiwgXCIje28ubmFtZX1cIjogYy5vYmp9LCBiaW5kZXJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGZvciBjIGZyb20gQGN0eC5tYXRjaChzLCBAdiwgbywgQHgsIEB0KVxuICAgICAgICAgICAgeWllbGQgT2JqZWN0LmFzc2lnbiB7XCIje3MubmFtZX1cIjogYy5zdWJqfSwgYmluZGVyXG4gICAgICBlbHNlXG4gICAgICAgIGlmIG8gaW5zdGFuY2VvZiBWYXJpYWJsZVxuICAgICAgICAgIGZvciBjIGZyb20gQGN0eC5tYXRjaChzLCBAdiwgbywgQHgsIEB0KVxuICAgICAgICAgICAgeWllbGQgT2JqZWN0LmFzc2lnbiB7XCIje28ubmFtZX1cIjogYy5vYmp9LCBiaW5kZXJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGZvciBjIGZyb20gQGN0eC5tYXRjaChzLCBAdiwgbywgQHgsIEB0KVxuICAgICAgICAgICAgeWllbGQgYmluZGVyXG5cbmV4cG9ydHMuQ29uZGl0aW9uID0gQ29uZGl0aW9uXG4iXX0=
