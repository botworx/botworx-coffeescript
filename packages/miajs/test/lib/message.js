(function() {
  var $$, $$self, Achieve, Assert, Attempt, Believe, Context, Message, Method, OnAssert, OnAttempt, OnRetract, Policy, Retract, Rule, Runner, Term, Trigger, _Bob, _Fish, _Joe, _Peas, __, _get, _likes, assert, believe_, module_, runtime, unit_;

  assert = require('chai').assert;

  ({unit_, runtime} = require('./common'));

  $$ = unit_(module);

  ({Term, Context, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime);

  ({__, module_, $$self, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime);

  ({_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common'));

  describe('Message', function() {
    return describe('@match', function() {
      return it('should work', function() {
        var c1, c2, ctx, m;
        ctx = new Context();
        c1 = believe_(_Bob, _likes, _Fish);
        ctx.add(c1);
        c2 = believe_(_Joe, _likes, _Peas);
        ctx.add(c2);
        $$.h2("All Clauses");
        $$._(String(ctx));
        $$._(ctx);
        $$.h2('Message Matching');
        m = new Assert(c1);
        $$._(m.match(Assert, Believe, _Bob, _likes, _Fish));
        $$._(m.match(Retract, Believe, _Bob, _likes, _Fish));
        $$._(m.match(Assert, Believe, _Joe, _likes, _Fish));
        return $$._(m.match(Assert, Achieve, _Joe, _likes, _Fish));
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXMiOlsibWVzc2FnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxFQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQzs7RUFDekIsQ0FBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQUEsR0FBbUIsT0FBQSxDQUFRLFVBQVIsQ0FBbkI7O0VBQ0EsRUFBQSxHQUFLLEtBQUEsQ0FBTSxNQUFOOztFQUNMLENBQUEsQ0FBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixNQUFoQixFQUF3QixPQUF4QixFQUFpQyxPQUFqQyxFQUEwQyxRQUExQyxFQUFvRCxPQUFwRCxFQUE2RCxPQUE3RCxDQUFBLEdBQXdFLE9BQXhFOztFQUNBLENBQUEsQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFjLE1BQWQsRUFBc0IsT0FBdEIsRUFBK0IsTUFBL0IsRUFBdUMsSUFBdkMsRUFBNkMsT0FBN0MsRUFBc0QsUUFBdEQsRUFBZ0UsU0FBaEUsRUFBMkUsU0FBM0UsRUFBc0YsTUFBdEYsRUFBOEYsTUFBOUYsQ0FBQSxHQUF3RyxPQUF4Rzs7RUFDQSxDQUFBLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxNQUFiLEVBQXFCLEtBQXJCLEVBQTRCLEtBQTVCLEVBQW1DLElBQW5DLENBQUEsR0FBMkMsT0FBQSxDQUFRLFVBQVIsQ0FBM0M7O0VBRUEsUUFBQSxDQUFTLFNBQVQsRUFBb0IsUUFBQSxDQUFBLENBQUE7V0FDbEIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsUUFBQSxDQUFBLENBQUE7YUFDakIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFDaEIsWUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEdBQUEsRUFBQTtRQUFBLEdBQUEsR0FBTSxJQUFJLE9BQUosQ0FBQTtRQUNOLEVBQUEsR0FBSyxRQUFBLENBQVMsSUFBVCxFQUFlLE1BQWYsRUFBdUIsS0FBdkI7UUFDTCxHQUFHLENBQUMsR0FBSixDQUFRLEVBQVI7UUFDQSxFQUFBLEdBQUssUUFBQSxDQUFTLElBQVQsRUFBZSxNQUFmLEVBQXVCLEtBQXZCO1FBQ0wsR0FBRyxDQUFDLEdBQUosQ0FBUSxFQUFSO1FBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxhQUFOO1FBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxNQUFBLENBQU8sR0FBUCxDQUFMO1FBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxHQUFMO1FBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxrQkFBTjtRQUNBLENBQUEsR0FBSSxJQUFJLE1BQUosQ0FBVyxFQUFYO1FBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSyxDQUFDLENBQUMsS0FBRixDQUFRLE1BQVIsRUFBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsTUFBL0IsRUFBdUMsS0FBdkMsQ0FBTDtRQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLEVBQWlCLE9BQWpCLEVBQTBCLElBQTFCLEVBQWdDLE1BQWhDLEVBQXdDLEtBQXhDLENBQUw7UUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLENBQUMsQ0FBQyxLQUFGLENBQVEsTUFBUixFQUFnQixPQUFoQixFQUF5QixJQUF6QixFQUErQixNQUEvQixFQUF1QyxLQUF2QyxDQUFMO2VBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxDQUFDLENBQUMsS0FBRixDQUFRLE1BQVIsRUFBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBK0IsTUFBL0IsRUFBdUMsS0FBdkMsQ0FBTDtNQWhCZ0IsQ0FBbEI7SUFEaUIsQ0FBbkI7RUFEa0IsQ0FBcEI7QUFQQSIsInNvdXJjZXNDb250ZW50IjpbImFzc2VydCA9IHJlcXVpcmUoJ2NoYWknKS5hc3NlcnRcbnt1bml0XywgcnVudGltZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxue1Rlcm0sIENvbnRleHQsIEFzc2VydCwgUmV0cmFjdCwgQmVsaWV2ZSwgYmVsaWV2ZV8sIEF0dGVtcHQsIEFjaGlldmV9ID0gcnVudGltZVxue19fLCBtb2R1bGVfLCAkJHNlbGYsIE1lc3NhZ2UsIFBvbGljeSwgUnVsZSwgVHJpZ2dlciwgT25Bc3NlcnQsIE9uUmV0cmFjdCwgT25BdHRlbXB0LCBSdW5uZXIsIE1ldGhvZH0gPSBydW50aW1lXG57X0JvYiwgX0pvZSwgX2xpa2VzLCBfRmlzaCwgX1BlYXMsIF9nZXR9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuXG5kZXNjcmliZSAnTWVzc2FnZScsIC0+XG4gIGRlc2NyaWJlICdAbWF0Y2gnLCAtPlxuICAgIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgICBjdHggPSBuZXcgQ29udGV4dCgpXG4gICAgICBjMSA9IGJlbGlldmVfIF9Cb2IsIF9saWtlcywgX0Zpc2hcbiAgICAgIGN0eC5hZGQoYzEpXG4gICAgICBjMiA9IGJlbGlldmVfIF9Kb2UsIF9saWtlcywgX1BlYXNcbiAgICAgIGN0eC5hZGQoYzIpXG5cbiAgICAgICQkLmgyIFwiQWxsIENsYXVzZXNcIlxuICAgICAgJCQuXyBTdHJpbmcoY3R4KVxuICAgICAgJCQuXyBjdHhcblxuICAgICAgJCQuaDIgJ01lc3NhZ2UgTWF0Y2hpbmcnXG4gICAgICBtID0gbmV3IEFzc2VydChjMSlcbiAgICAgICQkLl8gbS5tYXRjaChBc3NlcnQsIEJlbGlldmUsIF9Cb2IsIF9saWtlcywgX0Zpc2gpXG4gICAgICAkJC5fIG0ubWF0Y2goUmV0cmFjdCwgQmVsaWV2ZSwgX0JvYiwgX2xpa2VzLCBfRmlzaClcbiAgICAgICQkLl8gbS5tYXRjaChBc3NlcnQsIEJlbGlldmUsIF9Kb2UsIF9saWtlcywgX0Zpc2gpXG4gICAgICAkJC5fIG0ubWF0Y2goQXNzZXJ0LCBBY2hpZXZlLCBfSm9lLCBfbGlrZXMsIF9GaXNoKVxuIl19