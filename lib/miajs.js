(function() {
  var MiaJs, fs, mia, path, process, yaml;

  yaml = require('js-yaml');

  fs = require('fs');

  path = require('path');

  process = require('process');

  MiaJs = class MiaJs {
    constructor() {
      this.env = 'development';
    }

    config(folder) {
      var cfg, doc, e, k, results, v;
      folder = folder || __dirname;
      try {
        doc = yaml.safeLoad(fs.readFileSync(path.join(folder, '../config/config.yml'), 'utf8'));
      } catch (error) {
        e = error;
        console.log(e);
      }
      cfg = doc[this.env];
      results = [];
      for (k in cfg) {
        v = cfg[k];
        results.push(process.env[k] = v);
      }
      return results;
    }

  };

  exports.mia = mia = new MiaJs();

  exports.config = function(folder) {
    return mia.config(folder);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlhanMuanMiLCJzb3VyY2VzIjpbIm1pYWpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTs7RUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFNBQVI7O0VBQ1AsRUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSOztFQUNQLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0VBRUosUUFBTixNQUFBLE1BQUE7SUFDRSxXQUFhLENBQUEsQ0FBQTtNQUNYLElBQUMsQ0FBQSxHQUFELEdBQU87SUFESTs7SUFFYixNQUFRLENBQUMsTUFBRCxDQUFBO0FBQ04sVUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsT0FBQSxFQUFBO01BQUEsTUFBQSxHQUFTLE1BQUEsSUFBVTtBQUNuQjtRQUNFLEdBQUEsR0FBTSxJQUFJLENBQUMsUUFBTCxDQUFjLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQUksQ0FBQyxJQUFMLENBQVUsTUFBVixFQUFrQixzQkFBbEIsQ0FBaEIsRUFBMkQsTUFBM0QsQ0FBZCxFQURSO09BQUEsYUFBQTtRQUVNO1FBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFaLEVBSEY7O01BS0EsR0FBQSxHQUFNLEdBQUksQ0FBQSxJQUFDLENBQUEsR0FBRDtBQUNWO01BQUEsS0FBQSxRQUFBOztxQkFDRSxPQUFPLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBWixHQUFpQjtNQURuQixDQUFBOztJQVJNOztFQUhWOztFQWNBLE9BQU8sQ0FBQyxHQUFSLEdBQWMsR0FBQSxHQUFNLElBQUksS0FBSixDQUFBOztFQUNwQixPQUFPLENBQUMsTUFBUixHQUFpQixRQUFBLENBQUMsTUFBRCxDQUFBO1dBQVksR0FBRyxDQUFDLE1BQUosQ0FBVyxNQUFYO0VBQVo7QUFwQmpCIiwic291cmNlc0NvbnRlbnQiOlsieWFtbCA9IHJlcXVpcmUgJ2pzLXlhbWwnXG5mcyAgID0gcmVxdWlyZSAnZnMnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbnByb2Nlc3MgPSByZXF1aXJlICdwcm9jZXNzJ1xuXG5jbGFzcyBNaWFKc1xuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBAZW52ID0gJ2RldmVsb3BtZW50J1xuICBjb25maWc6IChmb2xkZXIpIC0+XG4gICAgZm9sZGVyID0gZm9sZGVyIHx8IF9fZGlybmFtZVxuICAgIHRyeVxuICAgICAgZG9jID0geWFtbC5zYWZlTG9hZChmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGZvbGRlciwgJy4uL2NvbmZpZy9jb25maWcueW1sJyksICd1dGY4JykpXG4gICAgY2F0Y2ggZVxuICAgICAgY29uc29sZS5sb2coZSlcblxuICAgIGNmZyA9IGRvY1tAZW52XVxuICAgIGZvciBrLCB2IG9mIGNmZ1xuICAgICAgcHJvY2Vzcy5lbnZba10gPSB2XG5cbmV4cG9ydHMubWlhID0gbWlhID0gbmV3IE1pYUpzKClcbmV4cG9ydHMuY29uZmlnID0gKGZvbGRlcikgLT4gbWlhLmNvbmZpZyBmb2xkZXJcbiJdfQ==
