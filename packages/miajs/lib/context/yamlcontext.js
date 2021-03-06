(function() {
  var $_, Context, YamlContext, _$, fs, yaml;

  yaml = require('js-yaml');

  fs = require('fs');

  ({Context} = require('./context'));

  ({$_, _$} = require('../main'));

  YamlContext = class YamlContext extends Context {
    constructor() {
      super();
    }

    load(filename) {
      var doc, e;
      try {
        doc = yaml.safeLoad(fs.readFileSync(filename), 'utf8');
      } catch (error) {
        e = error;
        console.log(e);
      }
      this.fromJSON(doc);
      return this;
    }

  };

  exports.YamlContext = YamlContext;

  exports.yamlcontext_ = function(cfg) {
    return new YamlContext().config(cfg);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC95YW1sY29udGV4dC5qcyIsInNvdXJjZXMiOlsiY29udGV4dC95YW1sY29udGV4dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7O0VBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxTQUFSOztFQUNQLEVBQUEsR0FBTyxPQUFBLENBQVEsSUFBUjs7RUFFUCxDQUFBLENBQUMsT0FBRCxDQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FBWjs7RUFDQSxDQUFBLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBQSxHQUFXLE9BQUEsQ0FBUSxTQUFSLENBQVg7O0VBR00sY0FBTixNQUFBLFlBQUEsUUFBMEIsUUFBMUI7SUFDRSxXQUFhLENBQUEsQ0FBQTtXQUNYLENBQUE7SUFEVzs7SUFFYixJQUFNLENBQUMsUUFBRCxDQUFBO0FBQ0osVUFBQSxHQUFBLEVBQUE7QUFBQTtRQUNFLEdBQUEsR0FBTSxJQUFJLENBQUMsUUFBTCxDQUFjLEVBQUUsQ0FBQyxZQUFILENBQWdCLFFBQWhCLENBQWQsRUFBeUMsTUFBekMsRUFEUjtPQUFBLGFBQUE7UUFFTTtRQUNKLE9BQU8sQ0FBQyxHQUFSLENBQVksQ0FBWixFQUhGOztNQUlBLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVjtBQUNBLGFBQU87SUFOSDs7RUFIUjs7RUFXQSxPQUFPLENBQUMsV0FBUixHQUFzQjs7RUFDdEIsT0FBTyxDQUFDLFlBQVIsR0FBdUIsUUFBQSxDQUFDLEdBQUQsQ0FBQTtXQUFTLElBQUksV0FBSixDQUFBLENBQWlCLENBQUMsTUFBbEIsQ0FBeUIsR0FBekI7RUFBVDtBQW5CdkIiLCJzb3VyY2VzQ29udGVudCI6WyJ5YW1sID0gcmVxdWlyZSAnanMteWFtbCdcbmZzICAgPSByZXF1aXJlICdmcydcblxue0NvbnRleHR9ID0gcmVxdWlyZSAnLi9jb250ZXh0J1xueyRfLCBfJH0gPSByZXF1aXJlKCcuLi9tYWluJylcblxuXG5jbGFzcyBZYW1sQ29udGV4dCBleHRlbmRzIENvbnRleHRcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXIoKVxuICBsb2FkOiAoZmlsZW5hbWUpIC0+XG4gICAgdHJ5XG4gICAgICBkb2MgPSB5YW1sLnNhZmVMb2FkKGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSksICd1dGY4JylcbiAgICBjYXRjaCBlXG4gICAgICBjb25zb2xlLmxvZyhlKVxuICAgIEBmcm9tSlNPTiBkb2NcbiAgICByZXR1cm4gdGhpc1xuXG5leHBvcnRzLllhbWxDb250ZXh0ID0gWWFtbENvbnRleHRcbmV4cG9ydHMueWFtbGNvbnRleHRfID0gKGNmZykgLT4gbmV3IFlhbWxDb250ZXh0KCkuY29uZmlnIGNmZ1xuIl19
