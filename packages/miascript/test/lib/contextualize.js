(function() {
  var $$, compile, data, evaluate, parse, transpile, unit_;

  ({unit_, parse, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = 'Block: Block1\n\nBlock1 on Block2\n\nBlock: Block1 ::\n  on Block2\n\nBlock2 on Block3 ::\n\nBlock3 on Block4 ::\n  blah';

  describe('Contextualize', function() {
    return describe('@evaluate', function() {
      return it('should work', function() {
        var code;
        $$._(JSON.stringify(parse(data), null, 2));
        $$._(transpile(data));
        code = compile(data);
        return $$._(code);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dHVhbGl6ZS5qcyIsInNvdXJjZXMiOlsiY29udGV4dHVhbGl6ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFNBQWYsRUFBMEIsT0FBMUIsRUFBbUMsUUFBbkMsQ0FBQSxHQUErQyxPQUFBLENBQVEsVUFBUixDQUEvQzs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQWNBLFFBQUEsQ0FBUyxlQUFULEVBQTBCLFFBQUEsQ0FBQSxDQUFBO1dBQ3hCLFFBQUEsQ0FBUyxXQUFULEVBQXNCLFFBQUEsQ0FBQSxDQUFBO2FBQ3BCLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFFBQUEsQ0FBQSxDQUFBO0FBR2hCLFlBQUE7UUFBQSxFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUksQ0FBQyxTQUFMLENBQWdCLEtBQUEsQ0FBTSxJQUFOLENBQWhCLEVBQTZCLElBQTdCLEVBQW1DLENBQW5DLENBQUw7UUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLFNBQUEsQ0FBVSxJQUFWLENBQUw7UUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLElBQVI7ZUFDUCxFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUw7TUFOZ0IsQ0FBbEI7SUFEb0IsQ0FBdEI7RUFEd0IsQ0FBMUI7QUFsQkEiLCJzb3VyY2VzQ29udGVudCI6WyJ7dW5pdF8sIHBhcnNlLCB0cmFuc3BpbGUsIGNvbXBpbGUsIGV2YWx1YXRlfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG5cbmRhdGEgPVxuJycnXG5CbG9jazogQmxvY2sxXG5cbkJsb2NrMSBvbiBCbG9jazJcblxuQmxvY2s6IEJsb2NrMSA6OlxuICBvbiBCbG9jazJcblxuQmxvY2syIG9uIEJsb2NrMyA6OlxuXG5CbG9jazMgb24gQmxvY2s0IDo6XG4gIGJsYWhcbicnJ1xuXG5kZXNjcmliZSAnQ29udGV4dHVhbGl6ZScsIC0+XG4gIGRlc2NyaWJlICdAZXZhbHVhdGUnLCAtPlxuICAgIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgICAjZXZhbHVhdGUgZGF0YVxuICAgICAgI2NvbXBpbGUgZGF0YVxuICAgICAgJCQuXyBKU09OLnN0cmluZ2lmeSAocGFyc2UgZGF0YSksIG51bGwsIDJcbiAgICAgICQkLl8gdHJhbnNwaWxlIGRhdGFcbiAgICAgIGNvZGUgPSBjb21waWxlIGRhdGFcbiAgICAgICQkLl8gY29kZVxuICAgICAgI2V2YWx1YXRlIGRhdGFcbiJdfQ==
