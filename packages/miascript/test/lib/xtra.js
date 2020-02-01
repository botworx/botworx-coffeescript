(function() {
  var $$, compile, data, evaluate, parse, transpile, unit_;

  ({unit_, parse, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = 'def ($x likes $y with: $z)\n  | "#{$x} likes #{$y} with #{$z}"\n\n+ Bob likes Tuna with: Cheese';

  describe('Xtra', function() {
    return describe('@evaluate', function() {
      return it('should work', function() {
        var code;
        //evaluate data
        //compile data
        $$._(JSON.stringify(parse(data), null, 2));
        $$._(transpile(data));
        code = compile(data);
        $$._(code);
        return evaluate(data);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRyYS5qcyIsInNvdXJjZXMiOlsieHRyYS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsU0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFNBQWYsRUFBMEIsT0FBMUIsRUFBbUMsUUFBbkMsQ0FBQSxHQUErQyxPQUFBLENBQVEsVUFBUixDQUEvQzs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQU9BLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFFBQUEsQ0FBQSxDQUFBO1dBQ2YsUUFBQSxDQUFTLFdBQVQsRUFBc0IsUUFBQSxDQUFBLENBQUE7YUFDcEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFHaEIsWUFBQSxJQUFBOzs7UUFBQSxFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUksQ0FBQyxTQUFMLENBQWdCLEtBQUEsQ0FBTSxJQUFOLENBQWhCLEVBQTZCLElBQTdCLEVBQW1DLENBQW5DLENBQUw7UUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLFNBQUEsQ0FBVSxJQUFWLENBQUw7UUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLElBQVI7UUFDUCxFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUw7ZUFDQSxRQUFBLENBQVMsSUFBVDtNQVBnQixDQUFsQjtJQURvQixDQUF0QjtFQURlLENBQWpCO0FBWEEiLCJzb3VyY2VzQ29udGVudCI6WyJ7dW5pdF8sIHBhcnNlLCB0cmFuc3BpbGUsIGNvbXBpbGUsIGV2YWx1YXRlfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG5cbmRhdGEgPVxuJycnXG5kZWYgKCR4IGxpa2VzICR5IHdpdGg6ICR6KVxuICB8IFwiI3skeH0gbGlrZXMgI3skeX0gd2l0aCAjeyR6fVwiXG5cbisgQm9iIGxpa2VzIFR1bmEgd2l0aDogQ2hlZXNlXG4nJydcblxuZGVzY3JpYmUgJ1h0cmEnLCAtPlxuICBkZXNjcmliZSAnQGV2YWx1YXRlJywgLT5cbiAgICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgICAgI2V2YWx1YXRlIGRhdGFcbiAgICAgICNjb21waWxlIGRhdGFcbiAgICAgICQkLl8gSlNPTi5zdHJpbmdpZnkgKHBhcnNlIGRhdGEpLCBudWxsLCAyXG4gICAgICAkJC5fIHRyYW5zcGlsZSBkYXRhXG4gICAgICBjb2RlID0gY29tcGlsZSBkYXRhXG4gICAgICAkJC5fIGNvZGVcbiAgICAgIGV2YWx1YXRlIGRhdGFcbiJdfQ==
