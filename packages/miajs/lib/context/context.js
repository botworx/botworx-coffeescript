(function() {
  var $_, Believe, Context, Query, _$, clause_;

  ({$_, _$, Believe, clause_} = require('../main'));

  ({Query} = require('./query'));

  Context = (function() {
    class Context {
      constructor() {
        this.clauses = [];
      }

      load(loader) {
        return loader.load(this);
      }

      config(cfg) {
        var c, i, k, len, v;
        if (!cfg) {
          return this;
        }
        for (k in cfg) {
          v = cfg[k];
          switch (k) {
            case 'clauses':
              for (i = 0, len = v.length; i < len; i++) {
                c = v[i];
                this.add(c);
              }
              break;
            default:
              this[k] = v;
          }
        }
        return this;
      }

      add(c) {
        if (Array.isArray(c)) {
          return this.clauses = this.clauses.concat(c);
        } else {
          return this.clauses.push(c);
        }
      }

      remove(clause) {
        var index;
        index = this.clauses.indexOf(clause);
        if (index > -1) {
          this.clauses.splice(index, 1);
        }
        return this;
      }

      believe(s, v, o, x) {
        this.add(new Believe(s, v, o, x));
        return this;
      }

      exists(t, s, v, o, x) {
        var c, i, len, ref;
        ref = this.clauses;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          if (c.match(t, s, v, o, x)) {
            return true;
          }
        }
        return false;
      }

      find(t, s, v, o, x) {
        var c, ref, result;
        result = [];
        ref = this.match(t, s, v, o, x);
        for (c of ref) {
          result.push(c);
        }
        return result;
      }

      * match(t, s, v, o, x) {
        var c, i, len, ref, results;
        ref = this.clauses;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          if (c.match(t, s, v, o, x)) {
            results.push((yield c));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }

      query(t, s, v, o, x) {
        return new Query(this).and(t, s, v, o, x);
      }

      toString() {
        var c, i, len, ref, result;
        result = '';
        ref = this.clauses;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          result += c.toString() + '\n';
        }
        return result;
      }

      fromJSON(json) {
        var k, obj, results, subj, t, v, verb, vk, vv;
        results = [];
        for (k in json) {
          v = json[k];
          t = v.type;
          subj = $_(k, t);
          results.push((function() {
            var results1;
            results1 = [];
            for (vk in v) {
              vv = v[vk];
              verb = $_(vk);
              if (Array.isArray(vv)) {
                results1.push((function() {
                  var i, len, results2;
                  results2 = [];
                  for (i = 0, len = vv.length; i < len; i++) {
                    obj = vv[i];
                    results2.push(this.believe(subj, verb, $_(obj)));
                  }
                  return results2;
                }).call(this));
              } else {
                results1.push(this.believe(subj, verb, $_(vv)));
              }
            }
            return results1;
          }).call(this));
        }
        return results;
      }

    };

    Context.iterator(function*() {
      return (yield* this.clauses);
    });

    return Context;

  }).call(this);

  /*
  fromJSON: (json) ->
    for k, v of json
      subj = $_ k
      for vk, vv of v
        verb = $_ vk
        if Array.isArray vv
  for obj in vv
  @add clause_ subj, verb, obj
        else
  @add clause_ subj, verb, vv
  */
  exports.Context = Context;

  exports.context_ = function(cfg) {
    return new Context().config(cfg);
  };

  /*
class ContextFactory
class ContextImporter extends ContextFactory
class YamlContextImporter extends ContextImporter
  constructor:
*/

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC9jb250ZXh0LmpzIiwic291cmNlcyI6WyJjb250ZXh0L2NvbnRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLE9BQVQsRUFBa0IsT0FBbEIsQ0FBQSxHQUE2QixPQUFBLENBQVEsU0FBUixDQUE3Qjs7RUFDQSxDQUFBLENBQUMsS0FBRCxDQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FBVjs7RUFFTTtJQUFOLE1BQUEsUUFBQTtNQUNFLFdBQWEsQ0FBQSxDQUFBO1FBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztNQURBOztNQUliLElBQU0sQ0FBQyxNQUFELENBQUE7ZUFDSixNQUFNLENBQUMsSUFBUCxDQUFZLElBQVo7TUFESTs7TUFFTixNQUFRLENBQUMsR0FBRCxDQUFBO0FBQ04sWUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7UUFBQSxJQUFHLENBQUMsR0FBSjtBQUFhLGlCQUFPLEtBQXBCOztRQUNBLEtBQUEsUUFBQTs7QUFDRSxrQkFBTyxDQUFQO0FBQUEsaUJBQ08sU0FEUDtjQUVJLEtBQUEsbUNBQUE7O2dCQUNFLElBQUMsQ0FBQSxHQUFELENBQUssQ0FBTDtjQURGO0FBREc7QUFEUDtjQUtJLElBQUssQ0FBQSxDQUFBLENBQUwsR0FBVTtBQUxkO1FBREY7QUFPQSxlQUFPO01BVEQ7O01BV1IsR0FBSyxDQUFDLENBQUQsQ0FBQTtRQUNILElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxDQUFkLENBQUg7aUJBQ0UsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFEYjtTQUFBLE1BQUE7aUJBR0UsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsQ0FBZCxF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QSxDQUFHLEdBQUgsQ0FBckI7a0JBREYsQ0FBQTs7K0JBREY7ZUFBQSxNQUFBOzhCQUlFLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBVCxFQUFlLElBQWYsRUFBcUIsRUFBQSxDQUFHLEVBQUgsQ0FBckIsR0FKRjs7WUFGRixDQUFBOzs7UUFIRixDQUFBOztNQURROztJQTVEWjs7SUFHRSxPQUFDLENBQUEsUUFBRCxDQUFVLFNBQUEsQ0FBQSxDQUFBO2FBQ1IsQ0FBQSxPQUFXLElBQUMsQ0FBQSxPQUFaO0lBRFEsQ0FBVjs7OztnQkFORjs7Ozs7Ozs7Ozs7Ozs7RUFzRkEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0VBQ2xCLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQUEsQ0FBQyxHQUFELENBQUE7V0FBUyxJQUFJLE9BQUosQ0FBQSxDQUFhLENBQUMsTUFBZCxDQUFxQixHQUFyQjtFQUFUOztFQXZGbkI7Ozs7OztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsieyRfLCBfJCwgQmVsaWV2ZSwgY2xhdXNlX30gPSByZXF1aXJlKCcuLi9tYWluJylcbntRdWVyeX0gPSByZXF1aXJlICcuL3F1ZXJ5J1xuXG5jbGFzcyBDb250ZXh0XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBjbGF1c2VzID0gW11cbiAgQGl0ZXJhdG9yIC0+XG4gICAgeWllbGQgZnJvbSBAY2xhdXNlc1xuICBsb2FkOiAobG9hZGVyKSAtPlxuICAgIGxvYWRlci5sb2FkIHRoaXNcbiAgY29uZmlnOiAoY2ZnKSAtPlxuICAgIGlmICFjZmcgdGhlbiByZXR1cm4gdGhpc1xuICAgIGZvciBrLCB2IG9mIGNmZ1xuICAgICAgc3dpdGNoIGtcbiAgICAgICAgd2hlbiAnY2xhdXNlcydcbiAgICAgICAgICBmb3IgYyBpbiB2XG4gICAgICAgICAgICBAYWRkIGNcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXNba10gPSB2XG4gICAgcmV0dXJuIHRoaXNcblxuICBhZGQ6IChjKSAtPlxuICAgIGlmIEFycmF5LmlzQXJyYXkgY1xuICAgICAgQGNsYXVzZXMgPSBAY2xhdXNlcy5jb25jYXQgY1xuICAgIGVsc2VcbiAgICAgIEBjbGF1c2VzLnB1c2goYylcblxuICByZW1vdmU6IChjbGF1c2UpIC0+XG4gICAgaW5kZXggPSBAY2xhdXNlcy5pbmRleE9mKGNsYXVzZSlcbiAgICBpZiAoaW5kZXggPiAtMSlcbiAgICAgIEBjbGF1c2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXNcblxuICBiZWxpZXZlOiAocywgdiwgbywgeCkgLT5cbiAgICBAYWRkIG5ldyBCZWxpZXZlKHMsIHYsIG8sIHgpXG4gICAgcmV0dXJuIHRoaXNcblxuICBleGlzdHM6ICh0LCBzLCB2LCBvLCB4KSAtPlxuICAgIGZvciBjIGluIEBjbGF1c2VzXG4gICAgICBpZiBjLm1hdGNoKHQsIHMsIHYsIG8sIHgpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgZmluZDogKHQsIHMsIHYsIG8sIHgpIC0+XG4gICAgcmVzdWx0ID0gW11cbiAgICBmb3IgYyBmcm9tIEBtYXRjaCh0LCBzLCB2LCBvLCB4KVxuICAgICAgcmVzdWx0LnB1c2ggY1xuICAgIHJldHVybiByZXN1bHRcblxuICBtYXRjaDogKHQsIHMsIHYsIG8sIHgpIC0+XG4gICAgZm9yIGMgaW4gQGNsYXVzZXNcbiAgICAgIGlmIGMubWF0Y2godCwgcywgdiwgbywgeClcbiAgICAgICAgeWllbGQgY1xuXG4gIHF1ZXJ5OiAodCwgcywgdiwgbywgeCkgLT5cbiAgICByZXR1cm4gbmV3IFF1ZXJ5KHRoaXMpLmFuZCB0LCBzLCB2LCBvLCB4XG5cbiAgdG9TdHJpbmc6IC0+XG4gICAgcmVzdWx0ID0gJydcbiAgICBmb3IgYyBpbiBAY2xhdXNlc1xuICAgICAgcmVzdWx0ICs9IGMudG9TdHJpbmcoKSArICdcXG4nXG4gICAgcmV0dXJuIHJlc3VsdFxuXG4gIGZyb21KU09OOiAoanNvbikgLT5cbiAgICBmb3IgaywgdiBvZiBqc29uXG4gICAgICB0ID0gdi50eXBlXG4gICAgICBzdWJqID0gJF8gaywgdFxuICAgICAgZm9yIHZrLCB2diBvZiB2XG4gICAgICAgIHZlcmIgPSAkXyB2a1xuICAgICAgICBpZiBBcnJheS5pc0FycmF5IHZ2XG4gICAgICAgICAgZm9yIG9iaiBpbiB2dlxuICAgICAgICAgICAgQGJlbGlldmUgc3ViaiwgdmVyYiwgJF8gb2JqXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBAYmVsaWV2ZSBzdWJqLCB2ZXJiLCAkXyB2dlxuICAjIyNcbiAgZnJvbUpTT046IChqc29uKSAtPlxuICAgIGZvciBrLCB2IG9mIGpzb25cbiAgICAgIHN1YmogPSAkXyBrXG4gICAgICBmb3IgdmssIHZ2IG9mIHZcbiAgICAgICAgdmVyYiA9ICRfIHZrXG4gICAgICAgIGlmIEFycmF5LmlzQXJyYXkgdnZcbiAgICAgICAgICBmb3Igb2JqIGluIHZ2XG4gICAgICAgICAgICBAYWRkIGNsYXVzZV8gc3ViaiwgdmVyYiwgb2JqXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBAYWRkIGNsYXVzZV8gc3ViaiwgdmVyYiwgdnZcbiAgIyMjXG5leHBvcnRzLkNvbnRleHQgPSBDb250ZXh0XG5leHBvcnRzLmNvbnRleHRfID0gKGNmZykgLT4gbmV3IENvbnRleHQoKS5jb25maWcgY2ZnXG5cbiMjI1xuY2xhc3MgQ29udGV4dEZhY3RvcnlcbmNsYXNzIENvbnRleHRJbXBvcnRlciBleHRlbmRzIENvbnRleHRGYWN0b3J5XG5jbGFzcyBZYW1sQ29udGV4dEltcG9ydGVyIGV4dGVuZHMgQ29udGV4dEltcG9ydGVyXG4gIGNvbnN0cnVjdG9yOlxuIyMjXG4iXX0=
