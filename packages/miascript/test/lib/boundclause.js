(function() {
  var $$, analyze, compile, data, evaluate, lex, parse, transform, transpile, unit_;

  ({unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = 'def (stack $x on: $y -> $g)\n    | $g\n\nstack Block1 on: Block2';

  describe('BoundClause', function() {
    return it('should work', function() {
      //$$._ lex data
      $$._(JSON.stringify(parse(data), null, 2));
      //$$._ JSON.stringify (transform data), null, 2
      //$$._ JSON.stringify (analyze data), null, 2
      //$$._ transpile data
      //$$._ compile data
      return evaluate(data);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm91bmRjbGF1c2UuanMiLCJzb3VyY2VzIjpbImJvdW5kY2xhdXNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQSxTQUFBLEVBQUE7O0VBQUEsQ0FBQSxDQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsS0FBYixFQUFvQixTQUFwQixFQUErQixPQUEvQixFQUF3QyxTQUF4QyxFQUFtRCxPQUFuRCxFQUE0RCxRQUE1RCxDQUFBLEdBQXdFLE9BQUEsQ0FBUSxVQUFSLENBQXhFOztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFFTCxJQUFBLEdBQ0E7O0VBT0EsUUFBQSxDQUFTLGFBQVQsRUFBd0IsUUFBQSxDQUFBLENBQUE7V0FDdEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUEsRUFBQTs7TUFFaEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxJQUFJLENBQUMsU0FBTCxDQUFnQixLQUFBLENBQU0sSUFBTixDQUFoQixFQUE2QixJQUE3QixFQUFtQyxDQUFuQyxDQUFMLEVBQUE7Ozs7O2FBS0EsUUFBQSxDQUFTLElBQVQ7SUFQZ0IsQ0FBbEI7RUFEc0IsQ0FBeEI7QUFYQSIsInNvdXJjZXNDb250ZW50IjpbInt1bml0XywgbGV4LCBwYXJzZSwgdHJhbnNmb3JtLCBhbmFseXplLCB0cmFuc3BpbGUsIGNvbXBpbGUsIGV2YWx1YXRlfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG5cbmRhdGEgPVxuJycnXG5kZWYgKHN0YWNrICR4IG9uOiAkeSAtPiAkZylcbiAgICB8ICRnXG5cbnN0YWNrIEJsb2NrMSBvbjogQmxvY2syXG4nJydcblxuZGVzY3JpYmUgJ0JvdW5kQ2xhdXNlJywgLT5cbiAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICAjJCQuXyBsZXggZGF0YVxuICAgICQkLl8gSlNPTi5zdHJpbmdpZnkgKHBhcnNlIGRhdGEpLCBudWxsLCAyXG4gICAgIyQkLl8gSlNPTi5zdHJpbmdpZnkgKHRyYW5zZm9ybSBkYXRhKSwgbnVsbCwgMlxuICAgICMkJC5fIEpTT04uc3RyaW5naWZ5IChhbmFseXplIGRhdGEpLCBudWxsLCAyXG4gICAgIyQkLl8gdHJhbnNwaWxlIGRhdGFcbiAgICAjJCQuXyBjb21waWxlIGRhdGFcbiAgICBldmFsdWF0ZSBkYXRhXG4iXX0=
