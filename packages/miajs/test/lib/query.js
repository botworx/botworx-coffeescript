(function() {
  var $$, $_, Believe, Variable, _$, __, _brother, _dad, _exists, _mom, _wife, assert, context_, runtime, unit_, yamlcontext_;

  assert = require('chai').assert;

  ({unit_, runtime, _exists, _dad, _mom, _brother, _wife} = require('./common'));

  $$ = unit_(module);

  ({__, $_, _$, context_, yamlcontext_, Variable, Believe} = runtime);

  describe('Query', function() {
    return describe('Basic', function() {
      return it('should work', function() {
        var _$d, _$w, _$x, ctx;
        ctx = yamlcontext_().load($$.dataPath('cleavers.yml'));
        $$.h2("All Clauses");
        $$._(ctx.toString());
        $$.h2('Binders');
        _$x = new Variable('$x');
        _$d = new Variable('$d');
        _$w = new Variable('$w');
        $$.$("ctx.query Believe, _$x, _dad, _$d");
        ctx.query(Believe, _$x, _dad, _$d).exec(function(binder) {
          return $$._(binder);
        });
        $$.$("ctx.query Believe, _$x, _dad, _$d\n.and Believe, _$d, _wife, _$w");
        return ctx.query(Believe, _$x, _dad, _$d).and(Believe, _$d, _wife, _$w).exec(function(binder) {
          return $$._(binder);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VzIjpbInF1ZXJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQzs7RUFDekIsQ0FBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLE9BQWpCLEVBQTBCLElBQTFCLEVBQWdDLElBQWhDLEVBQXNDLFFBQXRDLEVBQWdELEtBQWhELENBQUEsR0FBeUQsT0FBQSxDQUFRLFVBQVIsQ0FBekQ7O0VBQ0EsRUFBQSxHQUFLLEtBQUEsQ0FBTSxNQUFOOztFQUNMLENBQUEsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxRQUFiLEVBQXVCLFlBQXZCLEVBQXFDLFFBQXJDLEVBQStDLE9BQS9DLENBQUEsR0FBMEQsT0FBMUQ7O0VBRUEsUUFBQSxDQUFTLE9BQVQsRUFBa0IsUUFBQSxDQUFBLENBQUE7V0FDaEIsUUFBQSxDQUFTLE9BQVQsRUFBa0IsUUFBQSxDQUFBLENBQUE7YUFDaEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFDaEIsWUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtRQUFBLEdBQUEsR0FBTSxZQUFBLENBQUEsQ0FBYyxDQUFDLElBQWYsQ0FBb0IsRUFBRSxDQUFDLFFBQUgsQ0FBWSxjQUFaLENBQXBCO1FBRU4sRUFBRSxDQUFDLEVBQUgsQ0FBTSxhQUFOO1FBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxHQUFHLENBQUMsUUFBSixDQUFBLENBQUw7UUFFQSxFQUFFLENBQUMsRUFBSCxDQUFNLFNBQU47UUFDQSxHQUFBLEdBQU0sSUFBSSxRQUFKLENBQWEsSUFBYjtRQUNOLEdBQUEsR0FBTSxJQUFJLFFBQUosQ0FBYSxJQUFiO1FBQ04sR0FBQSxHQUFNLElBQUksUUFBSixDQUFhLElBQWI7UUFFTixFQUFFLENBQUMsQ0FBSCxDQUFLLG1DQUFMO1FBQ0EsR0FBRyxDQUFDLEtBQUosQ0FBVSxPQUFWLEVBQW1CLEdBQW5CLEVBQXdCLElBQXhCLEVBQThCLEdBQTlCLENBQ0EsQ0FBQyxJQURELENBQ00sUUFBQSxDQUFDLE1BQUQsQ0FBQTtpQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLLE1BQUw7UUFESSxDQUROO1FBSUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxrRUFBTDtlQUlBLEdBQUcsQ0FBQyxLQUFKLENBQVUsT0FBVixFQUFtQixHQUFuQixFQUF3QixJQUF4QixFQUE4QixHQUE5QixDQUNBLENBQUMsR0FERCxDQUNLLE9BREwsRUFDYyxHQURkLEVBQ21CLEtBRG5CLEVBQzBCLEdBRDFCLENBRUEsQ0FBQyxJQUZELENBRU0sUUFBQSxDQUFDLE1BQUQsQ0FBQTtpQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLLE1BQUw7UUFESSxDQUZOO01BcEJnQixDQUFsQjtJQURnQixDQUFsQjtFQURnQixDQUFsQjtBQUxBIiwic291cmNlc0NvbnRlbnQiOlsiYXNzZXJ0ID0gcmVxdWlyZSgnY2hhaScpLmFzc2VydFxue3VuaXRfLCBydW50aW1lLCBfZXhpc3RzLCBfZGFkLCBfbW9tLCBfYnJvdGhlciwgX3dpZmV9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGVcbntfXywgJF8sIF8kLCBjb250ZXh0XywgeWFtbGNvbnRleHRfLCBWYXJpYWJsZSwgQmVsaWV2ZX0gPSBydW50aW1lXG5cbmRlc2NyaWJlICdRdWVyeScsIC0+XG4gIGRlc2NyaWJlICdCYXNpYycsIC0+XG4gICAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICAgIGN0eCA9IHlhbWxjb250ZXh0XygpLmxvYWQgJCQuZGF0YVBhdGgoJ2NsZWF2ZXJzLnltbCcpXG5cbiAgICAgICQkLmgyIFwiQWxsIENsYXVzZXNcIlxuICAgICAgJCQuXyBjdHgudG9TdHJpbmcoKVxuXG4gICAgICAkJC5oMiAnQmluZGVycydcbiAgICAgIF8keCA9IG5ldyBWYXJpYWJsZSAnJHgnXG4gICAgICBfJGQgPSBuZXcgVmFyaWFibGUgJyRkJ1xuICAgICAgXyR3ID0gbmV3IFZhcmlhYmxlICckdydcblxuICAgICAgJCQuJCBcImN0eC5xdWVyeSBCZWxpZXZlLCBfJHgsIF9kYWQsIF8kZFwiXG4gICAgICBjdHgucXVlcnkgQmVsaWV2ZSwgXyR4LCBfZGFkLCBfJGRcbiAgICAgIC5leGVjIChiaW5kZXIpIC0+XG4gICAgICAgICQkLl8gYmluZGVyXG5cbiAgICAgICQkLiQgXCJcIlwiXG4gICAgICBjdHgucXVlcnkgQmVsaWV2ZSwgXyR4LCBfZGFkLCBfJGRcbiAgICAgIC5hbmQgQmVsaWV2ZSwgXyRkLCBfd2lmZSwgXyR3XG4gICAgICBcIlwiXCJcbiAgICAgIGN0eC5xdWVyeSBCZWxpZXZlLCBfJHgsIF9kYWQsIF8kZFxuICAgICAgLmFuZCBCZWxpZXZlLCBfJGQsIF93aWZlLCBfJHdcbiAgICAgIC5leGVjIChiaW5kZXIpIC0+XG4gICAgICAgICQkLl8gYmluZGVyXG4iXX0=