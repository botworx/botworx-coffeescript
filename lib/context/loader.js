(function() {
  var $_, Context, Loader, YamlLoader, _$, fs, yaml;

  yaml = require('js-yaml');

  fs = require('fs');

  ({Context} = require('./context'));

  ({$_, _$} = require('../main'));

  Loader = class Loader {
    constructor() {}

    loadJSON(ctx, json) {
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
                  results2.push(ctx.believe(subj, verb, $_(obj)));
                }
                return results2;
              })());
            } else {
              results1.push(ctx.believe(subj, verb, $_(vv)));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC9sb2FkZXIuanMiLCJzb3VyY2VzIjpbImNvbnRleHQvbG9hZGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxTQUFSOztFQUNQLEVBQUEsR0FBTyxPQUFBLENBQVEsSUFBUjs7RUFFUCxDQUFBLENBQUMsT0FBRCxDQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FBWjs7RUFDQSxDQUFBLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBQSxHQUFXLE9BQUEsQ0FBUSxTQUFSLENBQVg7O0VBRU0sU0FBTixNQUFBLE9BQUE7SUFDRSxXQUFhLENBQUEsQ0FBQSxFQUFBOztJQUNiLFFBQVUsQ0FBQyxHQUFELEVBQU0sSUFBTixDQUFBO0FBQ1IsVUFBQTtBQUFBO1dBQUEsU0FBQTs7UUFDRSxDQUFBLEdBQUksQ0FBQyxDQUFDO1FBQ04sSUFBQSxHQUFPLEVBQUEsQ0FBRyxDQUFILEVBQU0sQ0FBTjs7O0FBQ1A7ZUFBQSxPQUFBOztZQUNFLElBQUEsR0FBTyxFQUFBLENBQUcsRUFBSDtZQUNQLElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxFQUFkLENBQUg7OztBQUNFO3FCQUFBLG9DQUFBOztnQ0FDRSxHQUFHLENBQUMsT0FBSixDQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0IsRUFBQSxDQUFHLEdBQUgsQ0FBeEI7QUFERjs7b0JBREY7YUFBQSxNQUFBOzRCQUlFLEdBQUcsQ0FBQyxPQUFKLENBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixFQUFBLENBQUcsRUFBSCxDQUF4QixHQUpGOztBQUZGOzs7QUFIRjs7SUFEUTs7RUFGWjs7RUFjQSxPQUFPLENBQUMsTUFBUixHQUFpQjs7RUFFWCxhQUFOLE1BQUEsV0FBQSxRQUF5QixPQUF6QjtJQUNFLFdBQWEsVUFBQSxDQUFBOztNQUFDLElBQUMsQ0FBQTtJQUFGOztJQUViLElBQU0sQ0FBQyxHQUFELENBQUE7QUFDSixVQUFBO0FBQUE7UUFDRSxHQUFBLEdBQU0sSUFBSSxDQUFDLFFBQUwsQ0FBYyxFQUFFLENBQUMsWUFBSCxDQUFnQixJQUFDLENBQUEsUUFBakIsQ0FBZCxFQUEwQyxNQUExQyxFQURSO09BQUEsYUFBQTtRQUVNO1FBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFaLEVBSEY7O01BSUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZjtBQUNBLGFBQU87SUFOSDs7RUFIUjs7RUFXQSxPQUFPLENBQUMsVUFBUixHQUFxQjs7RUFDckIsT0FBTyxDQUFDLFdBQVIsR0FBc0IsUUFBQSxDQUFDLFFBQUQsQ0FBQTtXQUFjLElBQUksVUFBSixDQUFlLFFBQWY7RUFBZDtBQWxDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJ5YW1sID0gcmVxdWlyZSAnanMteWFtbCdcbmZzICAgPSByZXF1aXJlICdmcydcblxue0NvbnRleHR9ID0gcmVxdWlyZSAnLi9jb250ZXh0J1xueyRfLCBfJH0gPSByZXF1aXJlKCcuLi9tYWluJylcblxuY2xhc3MgTG9hZGVyXG4gIGNvbnN0cnVjdG9yOiAtPlxuICBsb2FkSlNPTjogKGN0eCwganNvbikgLT5cbiAgICBmb3IgaywgdiBvZiBqc29uXG4gICAgICB0ID0gdi50eXBlXG4gICAgICBzdWJqID0gJF8gaywgdFxuICAgICAgZm9yIHZrLCB2diBvZiB2XG4gICAgICAgIHZlcmIgPSAkXyB2a1xuICAgICAgICBpZiBBcnJheS5pc0FycmF5IHZ2XG4gICAgICAgICAgZm9yIG9iaiBpbiB2dlxuICAgICAgICAgICAgY3R4LmJlbGlldmUgc3ViaiwgdmVyYiwgJF8gb2JqXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjdHguYmVsaWV2ZSBzdWJqLCB2ZXJiLCAkXyB2dlxuXG5leHBvcnRzLkxvYWRlciA9IExvYWRlclxuXG5jbGFzcyBZYW1sTG9hZGVyIGV4dGVuZHMgTG9hZGVyXG4gIGNvbnN0cnVjdG9yOiAoQGZpbGVuYW1lKSAtPlxuICAgIHN1cGVyKClcbiAgbG9hZDogKGN0eCkgLT5cbiAgICB0cnlcbiAgICAgIGRvYyA9IHlhbWwuc2FmZUxvYWQoZnMucmVhZEZpbGVTeW5jKEBmaWxlbmFtZSksICd1dGY4JylcbiAgICBjYXRjaCBlXG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgIEBsb2FkSlNPTiBjdHgsIGRvY1xuICAgIHJldHVybiBjdHhcblxuZXhwb3J0cy5ZYW1sTG9hZGVyID0gWWFtbExvYWRlclxuZXhwb3J0cy55YW1sbG9hZGVyXyA9IChmaWxlbmFtZSkgLT4gbmV3IFlhbWxMb2FkZXIoZmlsZW5hbWUpXG4iXX0=
