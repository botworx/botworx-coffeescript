(function() {
  var $$, $_, Achieve, Assert, Attempt, Believe, Context, Message, Method, MyPromise, OnAssert, OnAttempt, OnRetract, Policy, Retract, Rule, Runner, Term, Trigger, __, _hello, _say, assert, foo, foo2, module_, runner_, runtime, unit_;

  assert = require('chai').assert;

  ({$$, unit_, runtime} = require('./common'));

  $$ = unit_(module);

  ({Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime);

  ({$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime);

  ({_hello, _say} = $_(['hello', 'say']));

  foo = function() {
    return new Promise(function(resolve, reject) {
      return resolve(true);
    });
  };

  MyPromise = class MyPromise {
    constructor() {}

    then(resolve1, reject1) {
      this.resolve = resolve1;
      this.reject = reject1;
      console.log(arguments);
      console.log('Then');
      console.log(this);
      return this.resolve('Howdy');
    }

  };

  foo2 = function() {
    return new MyPromise();
  };

  describe('Await', function() {
    $$.tap();
    it('should work', function() {
      var bar;
      bar = async function() {
        return console.log((await foo()));
      };
      return bar();
    });
    return it('should work', function() {
      var bar;
      bar = async function() {
        return console.log((await foo2()));
      };
      return bar();
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdhaXQuanMiLCJzb3VyY2VzIjpbImF3YWl0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBOztFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUM7O0VBQ3pCLENBQUEsQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZLE9BQVosQ0FBQSxHQUF1QixPQUFBLENBQVEsVUFBUixDQUF2Qjs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBQ0wsQ0FBQSxDQUFDLElBQUQsRUFBTyxPQUFQLEVBQWdCLE1BQWhCLEVBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEVBQTBDLE9BQTFDLEVBQW1ELE9BQW5ELENBQUEsR0FBOEQsT0FBOUQ7O0VBQ0EsQ0FBQSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQixPQUEzQixFQUFvQyxNQUFwQyxFQUE0QyxJQUE1QyxFQUFrRCxPQUFsRCxFQUEyRCxRQUEzRCxFQUFxRSxTQUFyRSxFQUFnRixTQUFoRixFQUEyRixNQUEzRixFQUFtRyxNQUFuRyxDQUFBLEdBQTZHLE9BQTdHOztFQUVBLENBQUEsQ0FBRSxNQUFGLEVBQVUsSUFBVixDQUFBLEdBQW1CLEVBQUEsQ0FBRyxDQUFFLE9BQUYsRUFBVyxLQUFYLENBQUgsQ0FBbkI7O0VBRUEsR0FBQSxHQUFNLFFBQUEsQ0FBQSxDQUFBO1dBQ0osSUFBSSxPQUFKLENBQVksUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLENBQUE7YUFDVixPQUFBLENBQVEsSUFBUjtJQURVLENBQVo7RUFESTs7RUFJQSxZQUFOLE1BQUEsVUFBQTtJQUNFLFdBQWMsQ0FBQSxDQUFBLEVBQUE7O0lBQ2QsSUFBTSxTQUFBLFNBQUEsQ0FBQTtNQUFDLElBQUMsQ0FBQTtNQUFTLElBQUMsQ0FBQTtNQUNoQixPQUFPLENBQUMsR0FBUixDQUFZLFNBQVo7TUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQVo7TUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7YUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTLE9BQVQ7SUFKSTs7RUFGUjs7RUFRQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7V0FDTCxJQUFJLFNBQUosQ0FBQTtFQURLOztFQUdQLFFBQUEsQ0FBUyxPQUFULEVBQWtCLFFBQUEsQ0FBQSxDQUFBO0lBQ2hCLEVBQUUsQ0FBQyxHQUFILENBQUE7SUFFQSxFQUFBLENBQUcsYUFBSCxFQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUEsR0FBQSxHQUFNLE1BQUEsUUFBQSxDQUFBLENBQUE7ZUFDSixPQUFPLENBQUMsR0FBUixDQUFZLENBQUEsTUFBTSxHQUFBLENBQUEsQ0FBTixDQUFaO01BREk7YUFFTixHQUFBLENBQUE7SUFIZ0IsQ0FBbEI7V0FLQSxFQUFBLENBQUcsYUFBSCxFQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUEsR0FBQSxHQUFNLE1BQUEsUUFBQSxDQUFBLENBQUE7ZUFDSixPQUFPLENBQUMsR0FBUixDQUFZLENBQUEsTUFBTSxJQUFBLENBQUEsQ0FBTixDQUFaO01BREk7YUFFTixHQUFBLENBQUE7SUFIZ0IsQ0FBbEI7RUFSZ0IsQ0FBbEI7QUF2QkEiLCJzb3VyY2VzQ29udGVudCI6WyJhc3NlcnQgPSByZXF1aXJlKCdjaGFpJykuYXNzZXJ0XG57JCQsIHVuaXRfLCBydW50aW1lfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG57VGVybSwgQ29udGV4dCwgQXNzZXJ0LCBSZXRyYWN0LCBCZWxpZXZlLCBBdHRlbXB0LCBBY2hpZXZlfSA9IHJ1bnRpbWVcbnskXywgX18sIHJ1bm5lcl8sIG1vZHVsZV8sIE1lc3NhZ2UsIFBvbGljeSwgUnVsZSwgVHJpZ2dlciwgT25Bc3NlcnQsIE9uUmV0cmFjdCwgT25BdHRlbXB0LCBSdW5uZXIsIE1ldGhvZH0gPSBydW50aW1lXG5cbnsgX2hlbGxvLCBfc2F5IH0gPSAkXyBbICdoZWxsbycsICdzYXknIF1cblxuZm9vID0gLT5cbiAgbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICByZXNvbHZlIHRydWVcblxuY2xhc3MgTXlQcm9taXNlXG4gIGNvbnN0cnVjdG9yOiAgLT5cbiAgdGhlbjogKEByZXNvbHZlLCBAcmVqZWN0KSAtPlxuICAgIGNvbnNvbGUubG9nIGFyZ3VtZW50c1xuICAgIGNvbnNvbGUubG9nICdUaGVuJ1xuICAgIGNvbnNvbGUubG9nIHRoaXNcbiAgICBAcmVzb2x2ZSAnSG93ZHknXG5cbmZvbzIgPSAtPlxuICBuZXcgTXlQcm9taXNlKClcblxuZGVzY3JpYmUgJ0F3YWl0JywgLT5cbiAgJCQudGFwKClcblxuICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgIGJhciA9IC0+XG4gICAgICBjb25zb2xlLmxvZyBhd2FpdCBmb28oKVxuICAgIGJhcigpXG5cbiAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICBiYXIgPSAtPlxuICAgICAgY29uc29sZS5sb2cgYXdhaXQgZm9vMigpXG4gICAgYmFyKClcbiJdfQ==
