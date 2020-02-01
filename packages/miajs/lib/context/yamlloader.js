(function() {
  var $_, Context, Loader, YamlLoader, _$, clause_, fs, yaml;

  yaml = require('js-yaml');

  fs = require('fs');

  ({Context} = require('./context'));

  ({$_, _$, clause_} = require('../main'));

  Loader = class Loader {
    constructor() {}

    loadJSON(ctx, json) {
      var k, obj, results, subj, v, verb, vk, vv;
      results = [];
      for (k in json) {
        v = json[k];
        subj = $_(k);
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
                  results2.push(ctx.add(clause_(subj, verb, $_(obj))));
                }
                return results2;
              })());
            } else {
              results1.push(ctx.add(clause_(subj, verb, $_(vv))));
            }
          }
          return results1;
        })());
      }
      return results;
    }

  };

  exports.Loader = Loader;

  YamlLoader = class YamlLoader extends Loader {
    constructor(filename1) {
      super();
      this.filename = filename1;
    }

    load(ctx) {
      var doc, e;
      try {
        doc = yaml.safeLoad(fs.readFileSync(this.filename), 'utf8');
      } catch (error) {
        e = error;
        console.log(e);
      }
      this.loadJSON(ctx, doc);
      return ctx;
    }

  };

  exports.YamlLoader = YamlLoader;

  exports.yamlloader_ = function(filename) {
    return new YamlLoader(filename);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC95YW1sbG9hZGVyLmpzIiwic291cmNlcyI6WyJjb250ZXh0L3lhbWxsb2FkZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFNBQVI7O0VBQ1AsRUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSOztFQUVQLENBQUEsQ0FBQyxPQUFELENBQUEsR0FBWSxPQUFBLENBQVEsV0FBUixDQUFaOztFQUNBLENBQUEsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLE9BQVQsQ0FBQSxHQUFvQixPQUFBLENBQVEsU0FBUixDQUFwQjs7RUFFTSxTQUFOLE1BQUEsT0FBQTtJQUNFLFdBQWEsQ0FBQSxDQUFBLEVBQUE7O0lBQ2IsUUFBVSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBQUE7QUFDUixVQUFBO0FBQUE7V0FBQSxTQUFBOztRQUNFLElBQUEsR0FBTyxFQUFBLENBQUcsQ0FBSDs7O0FBQ1A7ZUFBQSxPQUFBOztZQUNFLElBQUEsR0FBTyxFQUFBLENBQUcsRUFBSDtZQUNQLElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxFQUFkLENBQUg7OztBQUNFO3FCQUFBLG9DQUFBOztnQ0FDRSxHQUFHLENBQUMsR0FBSixDQUFRLE9BQUEsQ0FBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixFQUFBLENBQUcsR0FBSCxDQUFwQixDQUFSO0FBREY7O29CQURGO2FBQUEsTUFBQTs0QkFJRSxHQUFHLENBQUMsR0FBSixDQUFRLE9BQUEsQ0FBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixFQUFBLENBQUcsRUFBSCxDQUFwQixDQUFSLEdBSkY7O0FBRkY7OztBQUZGOztJQURROztFQUZaOztFQWFBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCOztFQUVYLGFBQU4sTUFBQSxXQUFBLFFBQXlCLE9BQXpCO0lBQ0UsV0FBYSxVQUFBLENBQUE7O01BQUMsSUFBQyxDQUFBO0lBQUY7O0lBRWIsSUFBTSxDQUFDLEdBQUQsQ0FBQTtBQUNKLFVBQUE7QUFBQTtRQUNFLEdBQUEsR0FBTSxJQUFJLENBQUMsUUFBTCxDQUFjLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQUMsQ0FBQSxRQUFqQixDQUFkLEVBQTBDLE1BQTFDLEVBRFI7T0FBQSxhQUFBO1FBRU07UUFDSixPQUFPLENBQUMsR0FBUixDQUFZLENBQVosRUFIRjs7TUFJQSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmO0FBQ0EsYUFBTztJQU5IOztFQUhSOztFQVdBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCOztFQUNyQixPQUFPLENBQUMsV0FBUixHQUFzQixRQUFBLENBQUMsUUFBRCxDQUFBO1dBQWMsSUFBSSxVQUFKLENBQWUsUUFBZjtFQUFkO0FBakN0QiIsInNvdXJjZXNDb250ZW50IjpbInlhbWwgPSByZXF1aXJlICdqcy15YW1sJ1xuZnMgICA9IHJlcXVpcmUgJ2ZzJ1xuXG57Q29udGV4dH0gPSByZXF1aXJlICcuL2NvbnRleHQnXG57JF8sIF8kLCBjbGF1c2VffSA9IHJlcXVpcmUoJy4uL21haW4nKVxuXG5jbGFzcyBMb2FkZXJcbiAgY29uc3RydWN0b3I6IC0+XG4gIGxvYWRKU09OOiAoY3R4LCBqc29uKSAtPlxuICAgIGZvciBrLCB2IG9mIGpzb25cbiAgICAgIHN1YmogPSAkXyBrXG4gICAgICBmb3IgdmssIHZ2IG9mIHZcbiAgICAgICAgdmVyYiA9ICRfIHZrXG4gICAgICAgIGlmIEFycmF5LmlzQXJyYXkgdnZcbiAgICAgICAgICBmb3Igb2JqIGluIHZ2XG4gICAgICAgICAgICBjdHguYWRkIGNsYXVzZV8gc3ViaiwgdmVyYiwgJF8gb2JqXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjdHguYWRkIGNsYXVzZV8gc3ViaiwgdmVyYiwgJF8gdnZcblxuZXhwb3J0cy5Mb2FkZXIgPSBMb2FkZXJcblxuY2xhc3MgWWFtbExvYWRlciBleHRlbmRzIExvYWRlclxuICBjb25zdHJ1Y3RvcjogKEBmaWxlbmFtZSkgLT5cbiAgICBzdXBlcigpXG4gIGxvYWQ6IChjdHgpIC0+XG4gICAgdHJ5XG4gICAgICBkb2MgPSB5YW1sLnNhZmVMb2FkKGZzLnJlYWRGaWxlU3luYyhAZmlsZW5hbWUpLCAndXRmOCcpXG4gICAgY2F0Y2ggZVxuICAgICAgY29uc29sZS5sb2coZSlcbiAgICBAbG9hZEpTT04gY3R4LCBkb2NcbiAgICByZXR1cm4gY3R4XG5cbmV4cG9ydHMuWWFtbExvYWRlciA9IFlhbWxMb2FkZXJcbmV4cG9ydHMueWFtbGxvYWRlcl8gPSAoZmlsZW5hbWUpIC0+IG5ldyBZYW1sTG9hZGVyKGZpbGVuYW1lKVxuIl19
