(function() {
  var $, $$, $_, Achieve, ConsoleWriter, ReadFile, Rule, Runner, Task, Variable, __, _make, attempt_, build, def, m, minimatch, mm, onAttempt, project_, runtime, sourcer_, t, t1, task_, unit_, workspace_;

  minimatch = require("minimatch");

  mm = function(pattern, options) {
    return minimatch.makeRe(pattern, options);
  };

  ({runtime, $$, unit_} = require('./common'));

  $$ = unit_(module);

  ({task_, def, $_, __, $, $_, Runner, Task, Variable, Rule, Achieve, onAttempt, attempt_} = runtime);

  ({ReadFile, ConsoleWriter} = runtime.streamer);

  ({project_, workspace_, sourcer_, build} = runtime.project);

  _make = $_('make');

  t1 = workspace_({
    tasks: [
      project_({
        files: '*.txt',
        rules: [
          def(onAttempt(Achieve,
          __,
          _make,
          'test.js'),
          function() {
            return $$.h2("onAttempt(Achieve, __, _make, 'test.js')");
          }),
          def(onAttempt(Achieve,
          __,
          _make,
          'notatest.js'),
          function() {
            return $$.h2("onAttempt(Achieve, __, _make, 'notatest.js')");
          }),
          def(onAttempt(Achieve,
          __,
          _make,
          $('x')),
          function() {
            $$.h2("onAttempt(Achieve, __, _make, $('x'))");
            return $$._(this.msg.$x);
          }),
          def(onAttempt(Achieve,
          __,
          _make,
          mm('*.js')),
          function() {
            return $$.h2("onAttempt(Achieve, __, _make, mm('*.js'))");
          }),
          def(onAttempt(Achieve,
          __,
          _make,
          mm('*.txt')),
          function() {
            return $$.h2("onAttempt(Achieve, __, _make, mm('*.txt'))");
          }),
          def(onAttempt(Achieve,
          __,
          _make,
          $('x',
          mm('*.js'))),
          function() {
            $$.h2("onAttempt(Achieve, __, _make, $('x', mm('*.js')))");
            return $$._(this.msg.$x);
          })
        ]
      })
    ]
  });

  t = t1;

  m = attempt_(Achieve, __, _make, 'test.js');

  //$$._ m
  t.broadcast(m);

  t.run();

  //$$._ t

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC9ydWxlcy5qcyIsInNvdXJjZXMiOlsicHJvamVjdC9ydWxlcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxhQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxTQUFBLEVBQUEsRUFBQSxFQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSOztFQUNaLEVBQUEsR0FBSyxRQUFBLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FBQTtXQUNILFNBQVMsQ0FBQyxNQUFWLENBQWlCLE9BQWpCLEVBQTBCLE9BQTFCO0VBREc7O0VBR0wsQ0FBQSxDQUFDLE9BQUQsRUFBVSxFQUFWLEVBQWMsS0FBZCxDQUFBLEdBQXVCLE9BQUEsQ0FBUSxVQUFSLENBQXZCOztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFDTCxDQUFBLENBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLENBQXJCLEVBQXdCLEVBQXhCLEVBQTRCLE1BQTVCLEVBQW9DLElBQXBDLEVBQTBDLFFBQTFDLEVBQW9ELElBQXBELEVBQTBELE9BQTFELEVBQW1FLFNBQW5FLEVBQThFLFFBQTlFLENBQUEsR0FBMEYsT0FBMUY7O0VBQ0EsQ0FBQSxDQUFDLFFBQUQsRUFBVyxhQUFYLENBQUEsR0FBNEIsT0FBTyxDQUFDLFFBQXBDOztFQUNBLENBQUEsQ0FBQyxRQUFELEVBQVcsVUFBWCxFQUF1QixRQUF2QixFQUFpQyxLQUFqQyxDQUFBLEdBQTBDLE9BQU8sQ0FBQyxPQUFsRDs7RUFFQSxLQUFBLEdBQVEsRUFBQSxDQUFHLE1BQUg7O0VBRVIsRUFBQSxHQUFLLFVBQUEsQ0FDSDtJQUFBLEtBQUEsRUFBTztNQUNMLFFBQUEsQ0FDRTtRQUFBLEtBQUEsRUFBTyxPQUFQO1FBQ0EsS0FBQSxFQUFPO1VBQ0wsR0FBQSxDQUFJLFNBQUEsQ0FBVSxPQUFWO1VBQW1CLEVBQW5CO1VBQXVCLEtBQXZCO1VBQThCLFNBQTlCLENBQUo7VUFBOEMsUUFBQSxDQUFBLENBQUE7bUJBQzVDLEVBQUUsQ0FBQyxFQUFILENBQU0sMENBQU47VUFENEMsQ0FBOUMsQ0FESztVQUdMLEdBQUEsQ0FBSSxTQUFBLENBQVUsT0FBVjtVQUFtQixFQUFuQjtVQUF1QixLQUF2QjtVQUE4QixhQUE5QixDQUFKO1VBQWtELFFBQUEsQ0FBQSxDQUFBO21CQUNoRCxFQUFFLENBQUMsRUFBSCxDQUFNLDhDQUFOO1VBRGdELENBQWxELENBSEs7VUFLTCxHQUFBLENBQUksU0FBQSxDQUFVLE9BQVY7VUFBbUIsRUFBbkI7VUFBdUIsS0FBdkI7VUFBOEIsQ0FBQSxDQUFFLEdBQUYsQ0FBOUIsQ0FBSjtVQUEyQyxRQUFBLENBQUEsQ0FBQTtZQUN6QyxFQUFFLENBQUMsRUFBSCxDQUFNLHVDQUFOO21CQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssSUFBQyxDQUFBLEdBQUcsQ0FBQyxFQUFWO1VBRnlDLENBQTNDLENBTEs7VUFRTCxHQUFBLENBQUksU0FBQSxDQUFVLE9BQVY7VUFBbUIsRUFBbkI7VUFBdUIsS0FBdkI7VUFBOEIsRUFBQSxDQUFHLE1BQUgsQ0FBOUIsQ0FBSjtVQUErQyxRQUFBLENBQUEsQ0FBQTttQkFDN0MsRUFBRSxDQUFDLEVBQUgsQ0FBTSwyQ0FBTjtVQUQ2QyxDQUEvQyxDQVJLO1VBVUwsR0FBQSxDQUFJLFNBQUEsQ0FBVSxPQUFWO1VBQW1CLEVBQW5CO1VBQXVCLEtBQXZCO1VBQThCLEVBQUEsQ0FBRyxPQUFILENBQTlCLENBQUo7VUFBZ0QsUUFBQSxDQUFBLENBQUE7bUJBQzlDLEVBQUUsQ0FBQyxFQUFILENBQU0sNENBQU47VUFEOEMsQ0FBaEQsQ0FWSztVQVlMLEdBQUEsQ0FBSSxTQUFBLENBQVUsT0FBVjtVQUFtQixFQUFuQjtVQUF1QixLQUF2QjtVQUE4QixDQUFBLENBQUUsR0FBRjtVQUFPLEVBQUEsQ0FBRyxNQUFILENBQVAsQ0FBOUIsQ0FBSjtVQUF1RCxRQUFBLENBQUEsQ0FBQTtZQUNyRCxFQUFFLENBQUMsRUFBSCxDQUFNLG1EQUFOO21CQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssSUFBQyxDQUFBLEdBQUcsQ0FBQyxFQUFWO1VBRnFELENBQXZELENBWks7O01BRFAsQ0FERixDQURLOztFQUFQLENBREc7O0VBc0JMLENBQUEsR0FBSTs7RUFDSixDQUFBLEdBQUksUUFBQSxDQUFTLE9BQVQsRUFBa0IsRUFBbEIsRUFBc0IsS0FBdEIsRUFBNkIsU0FBN0IsRUFuQ0o7OztFQXFDQSxDQUFDLENBQUMsU0FBRixDQUFZLENBQVo7O0VBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBQTs7RUF0Q0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIm1pbmltYXRjaCA9IHJlcXVpcmUoXCJtaW5pbWF0Y2hcIilcbm1tID0gKHBhdHRlcm4sIG9wdGlvbnMpIC0+XG4gIG1pbmltYXRjaC5tYWtlUmUocGF0dGVybiwgb3B0aW9ucylcblxue3J1bnRpbWUsICQkLCB1bml0X30gPSByZXF1aXJlICcuL2NvbW1vbidcbiQkID0gdW5pdF8gbW9kdWxlXG57dGFza18sIGRlZiwgJF8sIF9fLCAkLCAkXywgUnVubmVyLCBUYXNrLCBWYXJpYWJsZSwgUnVsZSwgQWNoaWV2ZSwgb25BdHRlbXB0LCBhdHRlbXB0X30gPSBydW50aW1lXG57UmVhZEZpbGUsIENvbnNvbGVXcml0ZXJ9ID0gcnVudGltZS5zdHJlYW1lclxue3Byb2plY3RfLCB3b3Jrc3BhY2VfLCBzb3VyY2VyXywgYnVpbGR9ID0gcnVudGltZS5wcm9qZWN0XG5cbl9tYWtlID0gJF8gJ21ha2UnXG5cbnQxID0gd29ya3NwYWNlX1xuICB0YXNrczogW1xuICAgIHByb2plY3RfXG4gICAgICBmaWxlczogJyoudHh0J1xuICAgICAgcnVsZXM6IFtcbiAgICAgICAgZGVmIG9uQXR0ZW1wdChBY2hpZXZlLCBfXywgX21ha2UsICd0ZXN0LmpzJyksIC0+XG4gICAgICAgICAgJCQuaDIgXCJvbkF0dGVtcHQoQWNoaWV2ZSwgX18sIF9tYWtlLCAndGVzdC5qcycpXCJcbiAgICAgICAgZGVmIG9uQXR0ZW1wdChBY2hpZXZlLCBfXywgX21ha2UsICdub3RhdGVzdC5qcycpLCAtPlxuICAgICAgICAgICQkLmgyIFwib25BdHRlbXB0KEFjaGlldmUsIF9fLCBfbWFrZSwgJ25vdGF0ZXN0LmpzJylcIlxuICAgICAgICBkZWYgb25BdHRlbXB0KEFjaGlldmUsIF9fLCBfbWFrZSwgJCgneCcpKSwgLT5cbiAgICAgICAgICAkJC5oMiBcIm9uQXR0ZW1wdChBY2hpZXZlLCBfXywgX21ha2UsICQoJ3gnKSlcIlxuICAgICAgICAgICQkLl8gQG1zZy4keFxuICAgICAgICBkZWYgb25BdHRlbXB0KEFjaGlldmUsIF9fLCBfbWFrZSwgbW0oJyouanMnKSksIC0+XG4gICAgICAgICAgJCQuaDIgXCJvbkF0dGVtcHQoQWNoaWV2ZSwgX18sIF9tYWtlLCBtbSgnKi5qcycpKVwiXG4gICAgICAgIGRlZiBvbkF0dGVtcHQoQWNoaWV2ZSwgX18sIF9tYWtlLCBtbSgnKi50eHQnKSksIC0+XG4gICAgICAgICAgJCQuaDIgXCJvbkF0dGVtcHQoQWNoaWV2ZSwgX18sIF9tYWtlLCBtbSgnKi50eHQnKSlcIlxuICAgICAgICBkZWYgb25BdHRlbXB0KEFjaGlldmUsIF9fLCBfbWFrZSwgJCgneCcsIG1tKCcqLmpzJykpKSwgLT5cbiAgICAgICAgICAkJC5oMiBcIm9uQXR0ZW1wdChBY2hpZXZlLCBfXywgX21ha2UsICQoJ3gnLCBtbSgnKi5qcycpKSlcIlxuICAgICAgICAgICQkLl8gQG1zZy4keFxuICAgICAgXVxuICBdXG5cbnQgPSB0MVxubSA9IGF0dGVtcHRfIEFjaGlldmUsIF9fLCBfbWFrZSwgJ3Rlc3QuanMnXG4jJCQuXyBtXG50LmJyb2FkY2FzdCBtXG50LnJ1bigpXG4jJCQuXyB0XG4iXX0=