(function() {
  var $$, analyze, compile, data, evaluate, lex, parse, transpile, unit_;

  ({unit_, lex, parse, analyze, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = '+ Block1\n+ Block1 on Block2\n+ Bob likes A & B & C\n+ Bob\n  likes Fish & Chips\n  hates Anchovies';

  describe('Assert', function() {
    return describe('@evaluate', function() {
      return it('should work', function() {
        //$$._ lex data
        //$$._ JSON.stringify (parse data), null, 2
        $$._(JSON.stringify(analyze(data), null, 2));
        //$$._ transpile data
        $$._(compile(data));
        return evaluate(data);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlcyI6WyJhc3NlcnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsU0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLEtBQWIsRUFBb0IsT0FBcEIsRUFBNkIsU0FBN0IsRUFBd0MsT0FBeEMsRUFBaUQsUUFBakQsQ0FBQSxHQUE2RCxPQUFBLENBQVEsVUFBUixDQUE3RDs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQVNBLFFBQUEsQ0FBUyxRQUFULEVBQW1CLFFBQUEsQ0FBQSxDQUFBO1dBQ2pCLFFBQUEsQ0FBUyxXQUFULEVBQXNCLFFBQUEsQ0FBQSxDQUFBO2FBQ3BCLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFFBQUEsQ0FBQSxDQUFBLEVBQUE7OztRQUdoQixFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUksQ0FBQyxTQUFMLENBQWdCLE9BQUEsQ0FBUSxJQUFSLENBQWhCLEVBQStCLElBQS9CLEVBQXFDLENBQXJDLENBQUwsRUFBQTs7UUFFQSxFQUFFLENBQUMsQ0FBSCxDQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUw7ZUFDQSxRQUFBLENBQVMsSUFBVDtNQU5nQixDQUFsQjtJQURvQixDQUF0QjtFQURpQixDQUFuQjtBQWJBIiwic291cmNlc0NvbnRlbnQiOlsie3VuaXRfLCBsZXgsIHBhcnNlLCBhbmFseXplLCB0cmFuc3BpbGUsIGNvbXBpbGUsIGV2YWx1YXRlfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG5cbmRhdGEgPVxuJycnXG4rIEJsb2NrMVxuKyBCbG9jazEgb24gQmxvY2syXG4rIEJvYiBsaWtlcyBBICYgQiAmIENcbisgQm9iXG4gIGxpa2VzIEZpc2ggJiBDaGlwc1xuICBoYXRlcyBBbmNob3ZpZXNcbicnJ1xuXG5kZXNjcmliZSAnQXNzZXJ0JywgLT5cbiAgZGVzY3JpYmUgJ0BldmFsdWF0ZScsIC0+XG4gICAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICAgICMkJC5fIGxleCBkYXRhXG4gICAgICAjJCQuXyBKU09OLnN0cmluZ2lmeSAocGFyc2UgZGF0YSksIG51bGwsIDJcbiAgICAgICQkLl8gSlNPTi5zdHJpbmdpZnkgKGFuYWx5emUgZGF0YSksIG51bGwsIDJcbiAgICAgICMkJC5fIHRyYW5zcGlsZSBkYXRhXG4gICAgICAkJC5fIGNvbXBpbGUgZGF0YVxuICAgICAgZXZhbHVhdGUgZGF0YVxuIl19
