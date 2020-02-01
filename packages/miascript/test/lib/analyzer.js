(function() {
  var $$, analyze, compile, data, evaluate, parse, unit_;

  ({unit_, parse, analyze, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = "def (hello)\n\n  def (say $t)\n    | $t\n\n  say \"Hello World\"\n  say \"Goodbye World\"\n\nhello";

  describe('Analyzer', function() {
    return describe('@analyze', function() {
      return it('should work', function() {
        var ast;
        ast = analyze(data);
        return $$._($$.stringify(ast, null, 2));
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl6ZXIuanMiLCJzb3VyY2VzIjpbImFuYWx5emVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsQ0FBQSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsT0FBZixFQUF3QixPQUF4QixFQUFpQyxRQUFqQyxDQUFBLEdBQTZDLE9BQUEsQ0FBUSxVQUFSLENBQTdDOztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFFTCxJQUFBLEdBQ0E7O0VBWUEsUUFBQSxDQUFTLFVBQVQsRUFBcUIsUUFBQSxDQUFBLENBQUE7V0FDbkIsUUFBQSxDQUFTLFVBQVQsRUFBcUIsUUFBQSxDQUFBLENBQUE7YUFDbkIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFDaEIsWUFBQTtRQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsSUFBUjtlQUNOLEVBQUUsQ0FBQyxDQUFILENBQUssRUFBRSxDQUFDLFNBQUgsQ0FBYSxHQUFiLEVBQWtCLElBQWxCLEVBQXdCLENBQXhCLENBQUw7TUFGZ0IsQ0FBbEI7SUFEbUIsQ0FBckI7RUFEbUIsQ0FBckI7QUFoQkEiLCJzb3VyY2VzQ29udGVudCI6WyJ7dW5pdF8sIHBhcnNlLCBhbmFseXplLCBjb21waWxlLCBldmFsdWF0ZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxuXG5kYXRhID1cblwiXCJcIlxuZGVmIChoZWxsbylcblxuICBkZWYgKHNheSAkdClcbiAgICB8ICR0XG5cbiAgc2F5IFwiSGVsbG8gV29ybGRcIlxuICBzYXkgXCJHb29kYnllIFdvcmxkXCJcblxuaGVsbG9cblwiXCJcIlxuXG5kZXNjcmliZSAnQW5hbHl6ZXInLCAtPlxuICBkZXNjcmliZSAnQGFuYWx5emUnLCAtPlxuICAgIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgICBhc3QgPSBhbmFseXplIGRhdGFcbiAgICAgICQkLl8gJCQuc3RyaW5naWZ5IGFzdCwgbnVsbCwgMlxuIl19
