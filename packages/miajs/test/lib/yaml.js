(function() {
  var $$, assert, fs, unit_, yaml;

  assert = require('chai').assert;

  yaml = require('js-yaml');

  fs = require('fs');

  ({$$, unit_} = require('./common'));

  $$ = unit_(module, $$);

  describe('Yaml', function() {
    return it('should work', function() {
      var doc, e;
      try {
        // Get document, or throw exception on error
        doc = yaml.safeLoad(fs.readFileSync($$.dataPath('cleavers.yml'), 'utf8'));
        return console.log(doc);
      } catch (error) {
        e = error;
        return console.log(e);
      }
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFtbC5qcyIsInNvdXJjZXMiOlsieWFtbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsRUFBQTs7RUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLE1BQVIsQ0FBZSxDQUFDOztFQUV6QixJQUFBLEdBQU8sT0FBQSxDQUFRLFNBQVI7O0VBQ1AsRUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSOztFQUVQLENBQUEsQ0FBQyxFQUFELEVBQUssS0FBTCxDQUFBLEdBQWMsT0FBQSxDQUFRLFVBQVIsQ0FBZDs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU4sRUFBYyxFQUFkOztFQUVMLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFFBQUEsQ0FBQSxDQUFBO1dBQ2YsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFFaEIsVUFBQSxHQUFBLEVBQUE7QUFBQTs7UUFDRSxHQUFBLEdBQU0sSUFBSSxDQUFDLFFBQUwsQ0FBYyxFQUFFLENBQUMsWUFBSCxDQUFnQixFQUFFLENBQUMsUUFBSCxDQUFZLGNBQVosQ0FBaEIsRUFBNkMsTUFBN0MsQ0FBZDtlQUNOLE9BQU8sQ0FBQyxHQUFSLENBQVksR0FBWixFQUZGO09BQUEsYUFBQTtRQUdNO2VBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSxDQUFaLEVBSkY7O0lBRmdCLENBQWxCO0VBRGUsQ0FBakI7QUFSQSIsInNvdXJjZXNDb250ZW50IjpbImFzc2VydCA9IHJlcXVpcmUoJ2NoYWknKS5hc3NlcnRcblxueWFtbCA9IHJlcXVpcmUgJ2pzLXlhbWwnXG5mcyAgID0gcmVxdWlyZSAnZnMnXG5cbnskJCwgdW5pdF99ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGUsICQkXG5cbmRlc2NyaWJlICdZYW1sJywgLT5cbiAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICAjIEdldCBkb2N1bWVudCwgb3IgdGhyb3cgZXhjZXB0aW9uIG9uIGVycm9yXG4gICAgdHJ5XG4gICAgICBkb2MgPSB5YW1sLnNhZmVMb2FkKGZzLnJlYWRGaWxlU3luYygkJC5kYXRhUGF0aCgnY2xlYXZlcnMueW1sJyksICd1dGY4JykpXG4gICAgICBjb25zb2xlLmxvZyhkb2MpXG4gICAgY2F0Y2ggZVxuICAgICAgY29uc29sZS5sb2coZSlcbiJdfQ==
