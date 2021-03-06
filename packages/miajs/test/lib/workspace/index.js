(function() {
  var $, $$, $_, ConsoleWriter, ReadFile, Rule, Runner, Task, Variable, __, _make, attempt_, build, def, minimatch, mm, onAttempt, project_, runtime, sourcer_, t, t1, task_, workspace_;

  minimatch = require("minimatch");

  mm = function(pattern, options) {
    return minimatch.makeRe(pattern, options);
  };

  ({runtime} = require('./common'));

  ({task_, def, $_, __, $$, $, $_, Runner, Task, Variable, Rule, onAttempt, attempt_} = runtime);

  ({ReadFile, ConsoleWriter} = runtime.streamer);

  ({project_, workspace_, sourcer_, build} = runtime.project);

  _make = $_('make');

  t1 = workspace_({
    location: './out',
    tasks: [require('./project')]
  });

  t = t1;

  //m = attempt_ __, _make, 'test.js'
  //console.log m
  //t.broadcast m
  t.run();

  //console.log t

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlL2luZGV4LmpzIiwic291cmNlcyI6WyJ3b3Jrc3BhY2UvaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxhQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLFNBQUEsRUFBQSxFQUFBLEVBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsS0FBQSxFQUFBOztFQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsV0FBUjs7RUFDWixFQUFBLEdBQUssUUFBQSxDQUFDLE9BQUQsRUFBVSxPQUFWLENBQUE7V0FDSCxTQUFTLENBQUMsTUFBVixDQUFpQixPQUFqQixFQUEwQixPQUExQjtFQURHOztFQUdMLENBQUEsQ0FBQyxPQUFELENBQUEsR0FBWSxPQUFBLENBQVEsVUFBUixDQUFaOztFQUNBLENBQUEsQ0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsQ0FBekIsRUFBNEIsRUFBNUIsRUFBZ0MsTUFBaEMsRUFBd0MsSUFBeEMsRUFBOEMsUUFBOUMsRUFBd0QsSUFBeEQsRUFBOEQsU0FBOUQsRUFBeUUsUUFBekUsQ0FBQSxHQUFxRixPQUFyRjs7RUFDQSxDQUFBLENBQUMsUUFBRCxFQUFXLGFBQVgsQ0FBQSxHQUE0QixPQUFPLENBQUMsUUFBcEM7O0VBQ0EsQ0FBQSxDQUFDLFFBQUQsRUFBVyxVQUFYLEVBQXVCLFFBQXZCLEVBQWlDLEtBQWpDLENBQUEsR0FBMEMsT0FBTyxDQUFDLE9BQWxEOztFQUVBLEtBQUEsR0FBUSxFQUFBLENBQUcsTUFBSDs7RUFFUixFQUFBLEdBQUssVUFBQSxDQUNIO0lBQUEsUUFBQSxFQUFVLE9BQVY7SUFDQSxLQUFBLEVBQU8sQ0FDTCxPQUFBLENBQVEsV0FBUixDQURLO0VBRFAsQ0FERzs7RUFNTCxDQUFBLEdBQUksR0FqQko7Ozs7O0VBcUJBLENBQUMsQ0FBQyxHQUFGLENBQUE7O0VBckJBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJtaW5pbWF0Y2ggPSByZXF1aXJlKFwibWluaW1hdGNoXCIpXG5tbSA9IChwYXR0ZXJuLCBvcHRpb25zKSAtPlxuICBtaW5pbWF0Y2gubWFrZVJlKHBhdHRlcm4sIG9wdGlvbnMpXG5cbntydW50aW1lfSA9IHJlcXVpcmUgJy4vY29tbW9uJ1xue3Rhc2tfLCBkZWYsICRfLCBfXywgJCQsICQsICRfLCBSdW5uZXIsIFRhc2ssIFZhcmlhYmxlLCBSdWxlLCBvbkF0dGVtcHQsIGF0dGVtcHRffSA9IHJ1bnRpbWVcbntSZWFkRmlsZSwgQ29uc29sZVdyaXRlcn0gPSBydW50aW1lLnN0cmVhbWVyXG57cHJvamVjdF8sIHdvcmtzcGFjZV8sIHNvdXJjZXJfLCBidWlsZH0gPSBydW50aW1lLnByb2plY3RcblxuX21ha2UgPSAkXyAnbWFrZSdcblxudDEgPSB3b3Jrc3BhY2VfXG4gIGxvY2F0aW9uOiAnLi9vdXQnXG4gIHRhc2tzOiBbXG4gICAgcmVxdWlyZSAnLi9wcm9qZWN0J1xuICBdXG5cbnQgPSB0MVxuI20gPSBhdHRlbXB0XyBfXywgX21ha2UsICd0ZXN0LmpzJ1xuI2NvbnNvbGUubG9nIG1cbiN0LmJyb2FkY2FzdCBtXG50LnJ1bigpXG4jY29uc29sZS5sb2cgdFxuIl19
