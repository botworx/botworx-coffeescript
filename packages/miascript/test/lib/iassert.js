(function() {

  /*
  Implicit Asserts
  */
  var $$, analyze, compile, data, evaluate, lex, parse, transpile, unit_;

  ({unit_, lex, parse, analyze, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = 'Block1\nBlock1 on Block2\nBob likes A & B & C\nBob :Person\n  likes Fish & Chips\n  hates Anchovies';

  describe('Assert', function() {
    return describe('@evaluate', function() {
      return it('should work', function() {
        $$._(lex(data));
        //$$._ JSON.stringify (parse data), null, 2
        $$._(JSON.stringify(analyze(data), null, 2));
        $$._(transpile(data));
        return $$._(compile(data));
      });
    });
  });

  //evaluate data

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWFzc2VydC5qcyIsInNvdXJjZXMiOlsiaWFzc2VydC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTs7OztNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUE7O0VBQUEsQ0FBQSxDQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsS0FBYixFQUFvQixPQUFwQixFQUE2QixTQUE3QixFQUF3QyxPQUF4QyxFQUFpRCxRQUFqRCxDQUFBLEdBQTZELE9BQUEsQ0FBUSxVQUFSLENBQTdEOztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFLTCxJQUFBLEdBQ0E7O0VBU0EsUUFBQSxDQUFTLFFBQVQsRUFBbUIsUUFBQSxDQUFBLENBQUE7V0FDakIsUUFBQSxDQUFTLFdBQVQsRUFBc0IsUUFBQSxDQUFBLENBQUE7YUFDcEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7UUFDaEIsRUFBRSxDQUFDLENBQUgsQ0FBSyxHQUFBLENBQUksSUFBSixDQUFMLEVBQUE7O1FBRUEsRUFBRSxDQUFDLENBQUgsQ0FBSyxJQUFJLENBQUMsU0FBTCxDQUFnQixPQUFBLENBQVEsSUFBUixDQUFoQixFQUErQixJQUEvQixFQUFxQyxDQUFyQyxDQUFMO1FBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxTQUFBLENBQVUsSUFBVixDQUFMO2VBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxPQUFBLENBQVEsSUFBUixDQUFMO01BTGdCLENBQWxCO0lBRG9CLENBQXRCO0VBRGlCLENBQW5COztFQWhCQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsie3VuaXRfLCBsZXgsIHBhcnNlLCBhbmFseXplLCB0cmFuc3BpbGUsIGNvbXBpbGUsIGV2YWx1YXRlfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG5cbiMjI1xuSW1wbGljaXQgQXNzZXJ0c1xuIyMjXG5kYXRhID1cbicnJ1xuQmxvY2sxXG5CbG9jazEgb24gQmxvY2syXG5Cb2IgbGlrZXMgQSAmIEIgJiBDXG5Cb2IgOlBlcnNvblxuICBsaWtlcyBGaXNoICYgQ2hpcHNcbiAgaGF0ZXMgQW5jaG92aWVzXG4nJydcblxuZGVzY3JpYmUgJ0Fzc2VydCcsIC0+XG4gIGRlc2NyaWJlICdAZXZhbHVhdGUnLCAtPlxuICAgIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgICAkJC5fIGxleCBkYXRhXG4gICAgICAjJCQuXyBKU09OLnN0cmluZ2lmeSAocGFyc2UgZGF0YSksIG51bGwsIDJcbiAgICAgICQkLl8gSlNPTi5zdHJpbmdpZnkgKGFuYWx5emUgZGF0YSksIG51bGwsIDJcbiAgICAgICQkLl8gdHJhbnNwaWxlIGRhdGFcbiAgICAgICQkLl8gY29tcGlsZSBkYXRhXG4gICAgICAjZXZhbHVhdGUgZGF0YVxuIl19
