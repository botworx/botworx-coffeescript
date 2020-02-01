(function() {
  var $$, analyze, compile, data, evaluate, lex, parse, transform, transpile, unit_;

  ({unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = 'defg (impasse)\n  | \'Impassed\'\n\ndef (goodbye)\n  | String(@rnr.ctx)\n\ngoodbye';

  describe('Impasse', function() {
    return it('should work', function() {
      //$$._ lex data
      //$$._ JSON.stringify (parse data), null, 2
      $$._(JSON.stringify(transform(data), null, 2));
      //$$._ JSON.stringify (analyze data), null, 2
      $$._(transpile(data));
      //$$._ compile data
      return evaluate(data);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wYXNzZS5qcyIsInNvdXJjZXMiOlsiaW1wYXNzZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLEtBQWIsRUFBb0IsU0FBcEIsRUFBK0IsT0FBL0IsRUFBd0MsU0FBeEMsRUFBbUQsT0FBbkQsRUFBNEQsUUFBNUQsQ0FBQSxHQUF3RSxPQUFBLENBQVEsVUFBUixDQUF4RTs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQVVBLFFBQUEsQ0FBUyxTQUFULEVBQW9CLFFBQUEsQ0FBQSxDQUFBO1dBQ2xCLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFFBQUEsQ0FBQSxDQUFBLEVBQUE7OztNQUdoQixFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUksQ0FBQyxTQUFMLENBQWdCLFNBQUEsQ0FBVSxJQUFWLENBQWhCLEVBQWlDLElBQWpDLEVBQXVDLENBQXZDLENBQUwsRUFBQTs7TUFFQSxFQUFFLENBQUMsQ0FBSCxDQUFLLFNBQUEsQ0FBVSxJQUFWLENBQUwsRUFGQTs7YUFJQSxRQUFBLENBQVMsSUFBVDtJQVBnQixDQUFsQjtFQURrQixDQUFwQjtBQWRBIiwic291cmNlc0NvbnRlbnQiOlsie3VuaXRfLCBsZXgsIHBhcnNlLCB0cmFuc2Zvcm0sIGFuYWx5emUsIHRyYW5zcGlsZSwgY29tcGlsZSwgZXZhbHVhdGV9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGVcblxuZGF0YSA9XG4nJydcbmRlZmcgKGltcGFzc2UpXG4gIHwgJ0ltcGFzc2VkJ1xuXG5kZWYgKGdvb2RieWUpXG4gIHwgU3RyaW5nKEBybnIuY3R4KVxuXG5nb29kYnllXG4nJydcblxuZGVzY3JpYmUgJ0ltcGFzc2UnLCAtPlxuICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgICMkJC5fIGxleCBkYXRhXG4gICAgIyQkLl8gSlNPTi5zdHJpbmdpZnkgKHBhcnNlIGRhdGEpLCBudWxsLCAyXG4gICAgJCQuXyBKU09OLnN0cmluZ2lmeSAodHJhbnNmb3JtIGRhdGEpLCBudWxsLCAyXG4gICAgIyQkLl8gSlNPTi5zdHJpbmdpZnkgKGFuYWx5emUgZGF0YSksIG51bGwsIDJcbiAgICAkJC5fIHRyYW5zcGlsZSBkYXRhXG4gICAgIyQkLl8gY29tcGlsZSBkYXRhXG4gICAgZXZhbHVhdGUgZGF0YVxuIl19
