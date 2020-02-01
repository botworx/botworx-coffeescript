(function() {
  var Believe, Condition, QClause, QFilter, QNegClause, Query, Variable, query_;

  ({Variable, Believe} = require('../main'));

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

    and(t, s, v, o, x) {
      var cond, src;
      cond = new QClause(t, s, v, o, x);
      src = this.conds[this.conds.length - 1];
      if (src) {
        cond.src = src;
      }
      this.add(cond);
      return this;
    }

    not(t, s, v, o, x) {
      var cond, src;
      cond = new QNegClause(t, s, v, o, x);
      src = this.conds[this.conds.length - 1];
      if (src) {
        cond.src = src;
      }
      this.add(cond);
      return this;
    }

    filter(fn) {
      var cond, src;
      cond = new QFilter(fn);
      src = this.conds[this.conds.length - 1];
      if (src) {
        cond.src = src;
      }
      this.add(cond);
      return this;
    }

    * binders() {
      return (yield* this.conds[this.conds.length - 1].binders());
    }

    exec(onSuccess) {
      var binder, ref, results;
      ref = this.binders();
      results = [];
      for (binder of ref) {
        results.push(onSuccess(binder));
      }
      return results;
    }

  };

  exports.Query = Query;

  exports.query_ = query_ = function(ctx) {
    return new Query(ctx);
  };

  Condition = class Condition {
    constructor() {}

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
      if (v) {
        return b[v.name];
      } else {
        return void 0;
      }
    }

  };

  QFilter = class QFilter extends Condition {
    constructor(fn1) {
      super();
      this.fn = fn1;
    }

    * binders() {
      var binder, results, source;
      if (this.src) {
        source = this.src.binders();
      } else {
        source = this.blank();
      }
      results = [];
      for (binder of source) {
        if (this.fn(binder)) {
          results.push((yield binder));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

  };

  QClause = class QClause extends Condition {
    constructor(t1, s1, v1, o1, x1) {
      super();
      this.t = t1;
      this.s = s1;
      this.v = v1;
      this.o = o1;
      this.x = x1;
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
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

  exports.QClause = QClause;

  QNegClause = class QNegClause extends Condition {
    constructor(t1, s1, v1, o1, x1) {
      super();
      this.t = t1;
      this.s = s1;
      this.v = v1;
      this.o = o1;
      this.x = x1;
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
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
              ref = this.ctx.match(this.t, s, this.v, o, this.x);
              results1 = [];
              for (c of ref) {
                results1.push((yield Object.assign({
                  [`${o.name}`]: c.obj
                }, binder)));
              }
              return results1;
            }).call(this)));
          } else {
            if (!this.ctx.exists(this.t, s, this.v, o, this.x)) {
              results.push((yield binder));
            } else {
              results.push(void 0);
            }
          }
        }
      }
      return results;
    }

  };

  exports.QNegClause = QNegClause;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC9xdWVyeS5qcyIsInNvdXJjZXMiOlsiY29udGV4dC9xdWVyeS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLE9BQUEsRUFBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQTs7RUFBQSxDQUFBLENBQUMsUUFBRCxFQUFXLE9BQVgsQ0FBQSxHQUFzQixPQUFBLENBQVEsU0FBUixDQUF0Qjs7RUFFTSxRQUFOLE1BQUEsTUFBQTtJQUNFLFdBQWEsS0FBQSxDQUFBO01BQUMsSUFBQyxDQUFBO01BQ2IsSUFBQyxDQUFBLEtBQUQsR0FBUztJQURFOztJQUdiLEdBQUssQ0FBQyxDQUFELENBQUE7TUFDSCxDQUFDLENBQUMsS0FBRixHQUFVO01BQ1YsQ0FBQyxDQUFDLEdBQUYsR0FBUSxJQUFDLENBQUE7YUFDVCxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxDQUFaO0lBSEc7O0lBS0wsR0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQUE7QUFDSCxVQUFBLElBQUEsRUFBQTtNQUFBLElBQUEsR0FBTyxJQUFJLE9BQUosQ0FBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtNQUNQLEdBQUEsR0FBTSxJQUFDLENBQUEsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxHQUFnQixDQUFoQjtNQUNiLElBQUcsR0FBSDtRQUNFLElBQUksQ0FBQyxHQUFMLEdBQVcsSUFEYjs7TUFFQSxJQUFDLENBQUEsR0FBRCxDQUFLLElBQUw7QUFDQSxhQUFPO0lBTko7O0lBUUwsR0FBSyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQUE7QUFDSCxVQUFBLElBQUEsRUFBQTtNQUFBLElBQUEsR0FBTyxJQUFJLFVB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QTttQ0FBQTthQUpGO1dBUkY7O01BSEYsQ0FBQTs7SUFMTzs7RUFIWDs7RUEwQkEsT0FBTyxDQUFDLFVBQVIsR0FBcUI7QUEzSHJCIiwic291cmNlc0NvbnRlbnQiOlsie1ZhcmlhYmxlLCBCZWxpZXZlfSA9IHJlcXVpcmUgJy4uL21haW4nXG5cbmNsYXNzIFF1ZXJ5XG4gIGNvbnN0cnVjdG9yOiAoQGN0eCktPlxuICAgIEBjb25kcyA9IFtdXG5cbiAgYWRkOiAoYykgLT5cbiAgICBjLnF1ZXJ5ID0gdGhpc1xuICAgIGMuY3R4ID0gQGN0eFxuICAgIEBjb25kcy5wdXNoIGNcblxuICBhbmQ6ICh0LCBzLCB2LCBvLCB4KSAtPlxuICAgIGNvbmQgPSBuZXcgUUNsYXVzZSh0LCBzLCB2LCBvLCB4KVxuICAgIHNyYyA9IEBjb25kc1tAY29uZHMubGVuZ3RoIC0gMV1cbiAgICBpZiBzcmNcbiAgICAgIGNvbmQuc3JjID0gc3JjXG4gICAgQGFkZCBjb25kXG4gICAgcmV0dXJuIHRoaXNcblxuICBub3Q6ICh0LCBzLCB2LCBvLCB4KSAtPlxuICAgIGNvbmQgPSBuZXcgUU5lZ0NsYXVzZSh0LCBzLCB2LCBvLCB4KVxuICAgIHNyYyA9IEBjb25kc1tAY29uZHMubGVuZ3RoIC0gMV1cbiAgICBpZiBzcmNcbiAgICAgIGNvbmQuc3JjID0gc3JjXG4gICAgQGFkZCBjb25kXG4gICAgcmV0dXJuIHRoaXNcblxuICBmaWx0ZXI6IChmbikgLT5cbiAgICBjb25kID0gbmV3IFFGaWx0ZXIgZm5cbiAgICBzcmMgPSBAY29uZHNbQGNvbmRzLmxlbmd0aCAtIDFdXG4gICAgaWYgc3JjXG4gICAgICBjb25kLnNyYyA9IHNyY1xuICAgIEBhZGQgY29uZFxuICAgIHJldHVybiB0aGlzXG5cbiAgYmluZGVyczogLT5cbiAgICB5aWVsZCBmcm9tIEBjb25kc1tAY29uZHMubGVuZ3RoIC0gMV0uYmluZGVycygpXG5cbiAgZXhlYzogKG9uU3VjY2VzcykgLT5cbiAgICBmb3IgYmluZGVyIGZyb20gQGJpbmRlcnMoKVxuICAgICAgb25TdWNjZXNzIGJpbmRlclxuXG5leHBvcnRzLlF1ZXJ5ID0gUXVlcnlcbmV4cG9ydHMucXVlcnlfID0gcXVlcnlfID0gKGN0eCkgLT4gbmV3IFF1ZXJ5IGN0eFxuXG5jbGFzcyBDb25kaXRpb25cbiAgY29uc3RydWN0b3I6IC0+XG4gIGJsYW5rOiAtPlxuICAgIHlpZWxkIHt9XG4gIGJvdW5kOiAoYiwgdikgLT5cbiAgICBpZiBiW3YubmFtZV0gdGhlbiB0cnVlIGVsc2UgZmFsc2VcbiAgYmluZGluZzogKGIsIHYpIC0+XG4gICAgaWYgdlxuICAgICAgcmV0dXJuIGJbdi5uYW1lXVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB1bmRlZmluZWRcblxuY2xhc3MgUUZpbHRlciBleHRlbmRzIENvbmRpdGlvblxuICBjb25zdHJ1Y3RvcjogKEBmbikgLT5cbiAgICBzdXBlcigpXG4gIGJpbmRlcnM6IC0+XG4gICAgaWYgQHNyY1xuICAgICAgc291cmNlID0gQHNyYy5iaW5kZXJzKClcbiAgICBlbHNlXG4gICAgICBzb3VyY2UgPSBAYmxhbmsoKVxuICAgIGZvciBiaW5kZXIgZnJvbSBzb3VyY2VcbiAgICAgIGlmIEBmbiBiaW5kZXJcbiAgICAgICAgeWllbGQgYmluZGVyXG5cbmNsYXNzIFFDbGF1c2UgZXh0ZW5kcyBDb25kaXRpb25cbiAgY29uc3RydWN0b3I6IChAdCwgQHMsIEB2LCBAbywgQHgpIC0+XG4gICAgc3VwZXIoKVxuICBiaW5kZXJzOiAtPlxuICAgIGlmIEBzcmNcbiAgICAgIHNvdXJjZSA9IEBzcmMuYmluZGVycygpXG4gICAgZWxzZVxuICAgICAgc291cmNlID0gQGJsYW5rKClcbiAgICBmb3IgYmluZGVyIGZyb20gc291cmNlXG4gICAgICBzID0gQGJpbmRpbmcoYmluZGVyLCBAcykgfHwgQHNcbiAgICAgIG8gPSBAYmluZGluZyhiaW5kZXIsIEBvKSB8fCBAb1xuICAgICAgaWYgcyBpbnN0YW5jZW9mIFZhcmlhYmxlXG4gICAgICAgIGlmIG8gaW5zdGFuY2VvZiBWYXJpYWJsZVxuICAgICAgICAgIGZvciBjIGZyb20gQGN0eC5tYXRjaChAdCwgcywgQHYsIG8sIEB4KVxuICAgICAgICAgICAgeWllbGQgT2JqZWN0LmFzc2lnbiB7XCIje3MubmFtZX1cIjogYy5zdWJqLCBcIiN7by5uYW1lfVwiOiBjLm9ian0sIGJpbmRlclxuICAgICAgICBlbHNlXG4gICAgICAgICAgZm9yIGMgZnJvbSBAY3R4Lm1hdGNoKEB0LCBzLCBAdiwgbywgQHgpXG4gICAgICAgICAgICB5aWVsZCBPYmplY3QuYXNzaWduIHtcIiN7cy5uYW1lfVwiOiBjLnN1Ymp9LCBiaW5kZXJcbiAgICAgIGVsc2VcbiAgICAgICAgaWYgbyBpbnN0YW5jZW9mIFZhcmlhYmxlXG4gICAgICAgICAgZm9yIGMgZnJvbSBAY3R4Lm1hdGNoKEB0LCBzLCBAdiwgbywgQHgpXG4gICAgICAgICAgICB5aWVsZCBPYmplY3QuYXNzaWduIHtcIiN7by5uYW1lfVwiOiBjLm9ian0sIGJpbmRlclxuICAgICAgICBlbHNlXG4gICAgICAgICAgZm9yIGMgZnJvbSBAY3R4Lm1hdGNoKEB0LCBzLCBAdiwgbywgQHgpXG4gICAgICAgICAgICB5aWVsZCBiaW5kZXJcblxuZXhwb3J0cy5RQ2xhdXNlID0gUUNsYXVzZVxuXG5jbGFzcyBRTmVnQ2xhdXNlIGV4dGVuZHMgQ29uZGl0aW9uXG4gIGNvbnN0cnVjdG9yOiAoQHQsIEBzLCBAdiwgQG8sIEB4KSAtPlxuICAgIHN1cGVyKClcbiAgYmluZGVyczogLT5cbiAgICBpZiBAc3JjXG4gICAgICBzb3VyY2UgPSBAc3JjLmJpbmRlcnMoKVxuICAgIGVsc2VcbiAgICAgIHNvdXJjZSA9IEBibGFuaygpXG4gICAgZm9yIGJpbmRlciBmcm9tIHNvdXJjZVxuICAgICAgcyA9IEBiaW5kaW5nKGJpbmRlciwgQHMpIHx8IEBzXG4gICAgICBvID0gQGJpbmRpbmcoYmluZGVyLCBAbykgfHwgQG9cbiAgICAgIGlmIHMgaW5zdGFuY2VvZiBWYXJpYWJsZVxuICAgICAgICBpZiBvIGluc3RhbmNlb2YgVmFyaWFibGVcbiAgICAgICAgICBmb3IgYyBmcm9tIEBjdHgubWF0Y2goQHQsIHMsIEB2LCBvLCBAeClcbiAgICAgICAgICAgIHlpZWxkIE9iamVjdC5hc3NpZ24ge1wiI3tzLm5hbWV9XCI6IGMuc3ViaiwgXCIje28ubmFtZX1cIjogYy5vYmp9LCBiaW5kZXJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGZvciBjIGZyb20gQGN0eC5tYXRjaChAdCwgcywgQHYsIG8sIEB4KVxuICAgICAgICAgICAgeWllbGQgT2JqZWN0LmFzc2lnbiB7XCIje3MubmFtZX1cIjogYy5zdWJqfSwgYmluZGVyXG4gICAgICBlbHNlXG4gICAgICAgIGlmIG8gaW5zdGFuY2VvZiBWYXJpYWJsZVxuICAgICAgICAgIGZvciBjIGZyb20gQGN0eC5tYXRjaChAdCwgcywgQHYsIG8sIEB4KVxuICAgICAgICAgICAgeWllbGQgT2JqZWN0LmFzc2lnbiB7XCIje28ubmFtZX1cIjogYy5vYmp9LCBiaW5kZXJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGlmICFAY3R4LmV4aXN0cyhAdCwgcywgQHYsIG8sIEB4KVxuICAgICAgICAgICAgeWllbGQgYmluZGVyXG5cbmV4cG9ydHMuUU5lZ0NsYXVzZSA9IFFOZWdDbGF1c2VcbiJdfQ==
