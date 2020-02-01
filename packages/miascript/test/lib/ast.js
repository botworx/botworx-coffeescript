(function() {
  var $$, compile, data, evaluate, parse, unit_;

  ({unit_, parse, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = "def (hello)\n\n  def (say $t)\n    | $t\n\n  say \"Hello World\"\n  say \"Goodbye World\"\n\nhello";

  describe('AST', function() {
    return describe('@evaluate', function() {
      return it('should work', function() {
        var ast;
        ast = parse(data);
        return $$._($$.stringify(ast, null, 2));
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LmpzIiwic291cmNlcyI6WyJhc3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE9BQWYsRUFBd0IsUUFBeEIsQ0FBQSxHQUFvQyxPQUFBLENBQVEsVUFBUixDQUFwQzs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQVlBLFFBQUEsQ0FBUyxLQUFULEVBQWdCLFFBQUEsQ0FBQSxDQUFBO1dBQ2QsUUFBQSxDQUFTLFdBQVQsRUFBc0IsUUFBQSxDQUFBLENBQUE7YUFDcEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFDaEIsWUFBQTtRQUFBLEdBQUEsR0FBTSxLQUFBLENBQU0sSUFBTjtlQUNOLEVBQUUsQ0FBQyxDQUFILENBQUssRUFBRSxDQUFDLFNBQUgsQ0FBYSxHQUFiLEVBQWtCLElBQWxCLEVBQXdCLENBQXhCLENBQUw7TUFGZ0IsQ0FBbEI7SUFEb0IsQ0FBdEI7RUFEYyxDQUFoQjtBQWhCQSIsInNvdXJjZXNDb250ZW50IjpbInt1bml0XywgcGFyc2UsIGNvbXBpbGUsIGV2YWx1YXRlfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG5cbmRhdGEgPVxuXCJcIlwiXG5kZWYgKGhlbGxvKVxuXG4gIGRlZiAoc2F5ICR0KVxuICAgIHwgJHRcblxuICBzYXkgXCJIZWxsbyBXb3JsZFwiXG4gIHNheSBcIkdvb2RieWUgV29ybGRcIlxuXG5oZWxsb1xuXCJcIlwiXG5cbmRlc2NyaWJlICdBU1QnLCAtPlxuICBkZXNjcmliZSAnQGV2YWx1YXRlJywgLT5cbiAgICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgICAgYXN0ID0gcGFyc2UgZGF0YVxuICAgICAgJCQuXyAkJC5zdHJpbmdpZnkgYXN0LCBudWxsLCAyXG4iXX0=
