(function() {
  var $, $$, Achieve, Assert, Attempt, Believe, Context, Message, Method, OnAssert, OnAttempt, OnRetract, Policy, Retract, Rule, Runner, Term, Trigger, _$, _Bob, _Cheese, _Fish, _Joe, _Peas, _Tuna, __, _get, _likes, assert, believe_, context_, runner_, runtime, unit_;

  assert = require('chai').assert;

  ({unit_, runtime} = require('./common'));

  $$ = unit_(module);

  ({Term, Context, context_, Assert, Retract, Believe, believe_, Attempt, Achieve} = runtime);

  ({__, $, _$, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, runner_, Method} = runtime);

  ({_Bob, _Joe, _likes, _Fish, _Tuna, _Cheese, _Peas, _get} = require('./common'));

  describe('Clause', function() {
    return describe('@xtra', function() {
      return it('should work', function() {
        var c, c1, c2, ctx, i, len, m, r, ref, rnr;
        ctx = context_();
        c1 = believe_(_Bob, _likes, _Tuna, {
          with: _Cheese
        });
        ctx.add(c1);
        c2 = believe_(_Joe, _likes, _Peas);
        ctx.add(c2);
        $$.h2("All Clauses");
        ref = ctx.clauses;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          $$._(c.toString());
        }
        $$.h2("Find in Context");
        r = ctx.find(Believe, _Bob, _likes, _Tuna);
        $$.$("< Bob likes Tuna >");
        $$._(r.toString());
        r = ctx.find(Believe, __, _likes, _Tuna);
        $$.$("< __ likes Tuna >");
        $$._(r.toString());
        r = ctx.find(Believe, __, _likes, __);
        $$.$("< __ likes __ >");
        $$._(r.toString());
        $$.h2("Message Matches");
        m = new Assert(c1);
        $$._(m.match(Assert, Believe, __, _likes, _Tuna));
        $$._(m.match(Assert, Believe, _Bob, _likes, _Tuna));
        $$._(m.match(Assert, Believe, _Bob, _likes, _Fish));
        $$._(m.match(Retract, Believe, _Bob, _likes, _Fish));
        $$._(m.match(Assert, Believe, _Joe, _likes, _Fish));
        rnr = runner_();
        rnr.def(new OnAssert(Believe, __, _likes, _Tuna), function() {
          var $x;
          $x = this.msg.data.subj;
          return this.task(function() {
            $$._('A');
            return this.perform($x, _get, _Fish);
          }).task(function() {
            return $$._('B');
          });
        });
        rnr.def(new OnAttempt(Achieve, __, _get, _Fish), function() {
          var $x;
          $x = this.msg.data.subj;
          return $$._(`${$x} is getting Fish.`);
        });
        rnr.post(m);
        return rnr.run();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRyYS5qcyIsInNvdXJjZXMiOlsieHRyYS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxFQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBOztFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUM7O0VBQ3pCLENBQUEsQ0FBQyxLQUFELEVBQVEsT0FBUixDQUFBLEdBQW1CLE9BQUEsQ0FBUSxVQUFSLENBQW5COztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFDTCxDQUFBLENBQUMsSUFBRCxFQUFPLE9BQVAsRUFBZ0IsUUFBaEIsRUFBMEIsTUFBMUIsRUFBa0MsT0FBbEMsRUFBMkMsT0FBM0MsRUFBb0QsUUFBcEQsRUFBOEQsT0FBOUQsRUFBdUUsT0FBdkUsQ0FBQSxHQUFrRixPQUFsRjs7RUFDQSxDQUFBLENBQUMsRUFBRCxFQUFLLENBQUwsRUFBUSxFQUFSLEVBQVksT0FBWixFQUFxQixNQUFyQixFQUE2QixJQUE3QixFQUFtQyxPQUFuQyxFQUE0QyxRQUE1QyxFQUFzRCxTQUF0RCxFQUFpRSxTQUFqRSxFQUE0RSxNQUE1RSxFQUFvRixPQUFwRixFQUE2RixNQUE3RixDQUFBLEdBQXVHLE9BQXZHOztFQUVBLENBQUEsQ0FBQyxJQUFELEVBQU8sSUFBUCxF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QUFhLE9BQWIsRUFBc0IsRUFBdEIsRUFBMEIsTUFBMUIsRUFBa0MsS0FBbEMsQ0FBUixFQUFrRCxRQUFBLENBQUEsQ0FBQTtBQUNoRCxjQUFBO1VBQUEsRUFBQSxHQUFLLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDO2lCQUNmLElBQUMsQ0FBQSxJQUFELENBQU0sUUFBQSxDQUFBLENBQUE7WUFDSixFQUFFLENBQUMsQ0FBSCxDQUFLLEdBQUw7bUJBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUyxFQUFULEVBQWEsSUFBYixFQUFtQixLQUFuQjtVQUZJLENBQU4sQ0FHQSxDQUFDLElBSEQsQ0FHTSxRQUFBLENBQUEsQ0FBQTttQkFDSixFQUFFLENBQUMsQ0FBSCxDQUFLLEdBQUw7VUFESSxDQUhOO1FBRmdELENBQWxEO1FBUUEsR0FBRyxDQUFDLEdBQUosQ0FBUSxJQUFJLFNBQUosQ0FBYyxPQUFkLEVBQXVCLEVBQXZCLEVBQTJCLElBQTNCLEVBQWlDLEtBQWpDLENBQVIsRUFBa0QsUUFBQSxDQUFBLENBQUE7QUFDaEQsY0FBQTtVQUFBLEVBQUEsR0FBSyxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUksQ0FBQztpQkFDZixFQUFFLENBQUMsQ0FBSCxDQUFLLENBQUEsQ0FBQSxDQUFHLEVBQUgsQ0FBTSxpQkFBTixDQUFMO1FBRmdELENBQWxEO1FBSUEsR0FBRyxDQUFDLElBQUosQ0FBUyxDQUFUO2VBQ0EsR0FBRyxDQUFDLEdBQUosQ0FBQTtNQS9DaUIsQ0FBbkI7SUFEZ0IsQ0FBbEI7RUFEaUIsQ0FBbkI7QUFSQSIsInNvdXJjZXNDb250ZW50IjpbImFzc2VydCA9IHJlcXVpcmUoJ2NoYWknKS5hc3NlcnRcbnt1bml0XywgcnVudGltZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxue1Rlcm0sIENvbnRleHQsIGNvbnRleHRfLCBBc3NlcnQsIFJldHJhY3QsIEJlbGlldmUsIGJlbGlldmVfLCBBdHRlbXB0LCBBY2hpZXZlfSA9IHJ1bnRpbWVcbntfXywgJCwgXyQsIE1lc3NhZ2UsIFBvbGljeSwgUnVsZSwgVHJpZ2dlciwgT25Bc3NlcnQsIE9uUmV0cmFjdCwgT25BdHRlbXB0LCBSdW5uZXIsIHJ1bm5lcl8sIE1ldGhvZH0gPSBydW50aW1lXG5cbntfQm9iLCBfSm9lLCBfbGlrZXMsIF9GaXNoLCBfVHVuYSwgX0NoZWVzZSwgX1BlYXMsIF9nZXR9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuXG5kZXNjcmliZSAnQ2xhdXNlJywgLT5cbiAgZGVzY3JpYmUgJ0B4dHJhJywgLT5cbiAgICBpdCAnc2hvdWxkIHdvcmsnLCAgLT5cbiAgICAgIGN0eCA9IGNvbnRleHRfKClcbiAgICAgIGMxID0gYmVsaWV2ZV8gX0JvYiwgX2xpa2VzLCBfVHVuYSwge3dpdGg6IF9DaGVlc2V9XG4gICAgICBjdHguYWRkIGMxXG4gICAgICBjMiA9IGJlbGlldmVfIF9Kb2UsIF9saWtlcywgX1BlYXNcbiAgICAgIGN0eC5hZGQgYzJcblxuICAgICAgJCQuaDIgXCJBbGwgQ2xhdXNlc1wiXG4gICAgICBmb3IgYyBpbiBjdHguY2xhdXNlc1xuICAgICAgICAkJC5fIGMudG9TdHJpbmcoKVxuXG4gICAgICAkJC5oMiBcIkZpbmQgaW4gQ29udGV4dFwiXG4gICAgICByID0gY3R4LmZpbmQgQmVsaWV2ZSwgX0JvYiwgX2xpa2VzLCBfVHVuYVxuICAgICAgJCQuJCBcIjwgQm9iIGxpa2VzIFR1bmEgPlwiXG4gICAgICAkJC5fIHIudG9TdHJpbmcoKVxuXG4gICAgICByID0gY3R4LmZpbmQgQmVsaWV2ZSwgX18sIF9saWtlcywgX1R1bmFcbiAgICAgICQkLiQgXCI8IF9fIGxpa2VzIFR1bmEgPlwiXG4gICAgICAkJC5fIHIudG9TdHJpbmcoKVxuXG4gICAgICByID0gY3R4LmZpbmQgQmVsaWV2ZSwgX18sIF9saWtlcywgX19cbiAgICAgICQkLiQgXCI8IF9fIGxpa2VzIF9fID5cIlxuICAgICAgJCQuXyByLnRvU3RyaW5nKClcblxuICAgICAgJCQuaDIgXCJNZXNzYWdlIE1hdGNoZXNcIlxuICAgICAgbSA9IG5ldyBBc3NlcnQoYzEpXG4gICAgICAkJC5fIG0ubWF0Y2ggQXNzZXJ0LCBCZWxpZXZlLCBfXywgX2xpa2VzLCBfVHVuYVxuICAgICAgJCQuXyBtLm1hdGNoIEFzc2VydCwgQmVsaWV2ZSwgX0JvYiwgX2xpa2VzLCBfVHVuYVxuICAgICAgJCQuXyBtLm1hdGNoIEFzc2VydCwgQmVsaWV2ZSwgX0JvYiwgX2xpa2VzLCBfRmlzaFxuICAgICAgJCQuXyBtLm1hdGNoIFJldHJhY3QsIEJlbGlldmUsIF9Cb2IsIF9saWtlcywgX0Zpc2hcbiAgICAgICQkLl8gbS5tYXRjaCBBc3NlcnQsIEJlbGlldmUsIF9Kb2UsIF9saWtlcywgX0Zpc2hcblxuICAgICAgcm5yID0gcnVubmVyXygpXG5cbiAgICAgIHJuci5kZWYgbmV3IE9uQXNzZXJ0KEJlbGlldmUsIF9fLCBfbGlrZXMsIF9UdW5hKSwgLT5cbiAgICAgICAgJHggPSBAbXNnLmRhdGEuc3VialxuICAgICAgICBAdGFzayAtPlxuICAgICAgICAgICQkLl8gJ0EnXG4gICAgICAgICAgQHBlcmZvcm0oJHgsIF9nZXQsIF9GaXNoKVxuICAgICAgICAudGFzayAtPlxuICAgICAgICAgICQkLl8gJ0InXG5cbiAgICAgIHJuci5kZWYgbmV3IE9uQXR0ZW1wdChBY2hpZXZlLCBfXywgX2dldCwgX0Zpc2gpLCAgLT5cbiAgICAgICAgJHggPSBAbXNnLmRhdGEuc3VialxuICAgICAgICAkJC5fIFwiI3skeH0gaXMgZ2V0dGluZyBGaXNoLlwiXG5cbiAgICAgIHJuci5wb3N0IG1cbiAgICAgIHJuci5ydW4oKVxuIl19
