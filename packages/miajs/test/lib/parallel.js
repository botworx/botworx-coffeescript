(function() {
  var $$, assert, counter_, parallel_, runner_, runtime, task_, unit_;

  assert = require('chai').assert;

  ({unit_, runtime} = require('./common'));

  $$ = unit_(module);

  ({runner_, task_, parallel_, counter_} = runtime);

  describe('Parallel', function() {
    return describe('@action', function() {
      return it('should work', function() {
        var t1;
        t1 = parallel_(function() {
          this.counter(1, 5, function() {
            var counter1;
            counter1 = this;
            return this.task(function() {
              return $$.log(`Counter 1:  ${counter1.value}`);
            });
          });
          return this.counter(1, 10, function() {
            var counter2;
            counter2 = this;
            return this.task(function() {
              return $$.log(`Counter 2:  ${counter2.value}`);
            });
          });
        });
        return runner_().run(t1);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWxsZWwuanMiLCJzb3VyY2VzIjpbInBhcmFsbGVsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBOztFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUM7O0VBQ3pCLENBQUEsQ0FBQyxLQUFELEVBQVEsT0FBUixDQUFBLEdBQW1CLE9BQUEsQ0FBUSxVQUFSLENBQW5COztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFDTCxDQUFBLENBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsU0FBakIsRUFBNEIsUUFBNUIsQ0FBQSxHQUF3QyxPQUF4Qzs7RUFFQSxRQUFBLENBQVMsVUFBVCxFQUFxQixRQUFBLENBQUEsQ0FBQTtXQUNuQixRQUFBLENBQVMsU0FBVCxFQUFvQixRQUFBLENBQUEsQ0FBQTthQUNsQixFQUFBLENBQUcsYUFBSCxFQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixZQUFBO1FBQUEsRUFBQSxHQUFLLFNBQUEsQ0FBVSxRQUFBLENBQUEsQ0FBQTtVQUNiLElBQUMsQ0FBQSxPQUFELENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxRQUFBLENBQUEsQ0FBQTtBQUNiLGdCQUFBO1lBQUEsUUFBQSxHQUFXO21CQUNYLElBQUMsQ0FBQSxJQUFELENBQU0sUUFBQSxDQUFBLENBQUE7cUJBQ0osRUFBRSxDQUFDLEdBQUgsQ0FBTyxDQUFBLFlBQUEsQ0FBQSxDQUFlLFFBQVEsQ0FBQyxLQUF4QixDQUFBLENBQVA7WUFESSxDQUFOO1VBRmEsQ0FBZjtpQkFJQSxJQUFDLENBQUEsT0FBRCxDQUFTLENBQVQsRUFBWSxFQUFaLEVBQWdCLFFBQUEsQ0FBQSxDQUFBO0FBQ2QsZ0JBQUE7WUFBQSxRQUFBLEdBQVc7bUJBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxRQUFBLENBQUEsQ0FBQTtxQkFDSixFQUFFLENBQUMsR0FBSCxDQUFPLENBQUEsWUFBQSxDQUFBLENBQWUsUUFBUSxDQUFDLEtBQXhCLENBQUEsQ0FBUDtZQURJLENBQU47VUFGYyxDQUFoQjtRQUxhLENBQVY7ZUFVTCxPQUFBLENBQUEsQ0FBUyxDQUFDLEdBQVYsQ0FBYyxFQUFkO01BWGdCLENBQWxCO0lBRGtCLENBQXBCO0VBRG1CLENBQXJCO0FBTEEiLCJzb3VyY2VzQ29udGVudCI6WyJhc3NlcnQgPSByZXF1aXJlKCdjaGFpJykuYXNzZXJ0XG57dW5pdF8sIHJ1bnRpbWV9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGVcbntydW5uZXJfLCB0YXNrXywgcGFyYWxsZWxfLCBjb3VudGVyX30gPSBydW50aW1lXG5cbmRlc2NyaWJlICdQYXJhbGxlbCcsIC0+XG4gIGRlc2NyaWJlICdAYWN0aW9uJywgLT5cbiAgICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgICAgdDEgPSBwYXJhbGxlbF8gLT5cbiAgICAgICAgQGNvdW50ZXIgMSwgNSwgLT5cbiAgICAgICAgICBjb3VudGVyMSA9IHRoaXNcbiAgICAgICAgICBAdGFzayAtPlxuICAgICAgICAgICAgJCQubG9nIFwiQ291bnRlciAxOiAgI3tjb3VudGVyMS52YWx1ZX1cIlxuICAgICAgICBAY291bnRlciAxLCAxMCwgLT5cbiAgICAgICAgICBjb3VudGVyMiA9IHRoaXNcbiAgICAgICAgICBAdGFzayAtPlxuICAgICAgICAgICAgJCQubG9nIFwiQ291bnRlciAyOiAgI3tjb3VudGVyMi52YWx1ZX1cIlxuXG4gICAgICBydW5uZXJfKCkucnVuIHQxXG4iXX0=