(function() {
  var $$, compile, data, evaluate, lex, parse, transpile, unit_;

  ({unit_, lex, parse, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = "Bob\n  likes Fish\n  likes Chips\nJoe\n  likes Fish\n\ndefg (start)\n  | @rnr.ctx\n  where\n    $x likes Fish\n    !$x likes Chips\n  -->\n    | _.$x\n\ndefg (impasse)\n  | String(@rnr.ctx)";

  describe('Query', function() {
    return it('should work', function() {
      var code;
      //evaluate data
      //compile data
      $$._(JSON.stringify(parse(data), null, 2));
      //$$._ JSON.stringify (lex data), null, 2
      //$$._ transpile data
      code = compile(data);
      $$._(code);
      return evaluate(data);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicW5lZ2NsYXVzZS5qcyIsInNvdXJjZXMiOlsicW5lZ2NsYXVzZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFNBQUEsRUFBQTs7RUFBQSxDQUFBLENBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYSxLQUFiLEVBQW9CLFNBQXBCLEVBQStCLE9BQS9CLEVBQXdDLFFBQXhDLENBQUEsR0FBb0QsT0FBQSxDQUFRLFVBQVIsQ0FBcEQ7O0VBQ0EsRUFBQSxHQUFLLEtBQUEsQ0FBTSxNQUFOOztFQUVMLElBQUEsR0FDQTs7RUFtQkEsUUFBQSxDQUFTLE9BQVQsRUFBa0IsUUFBQSxDQUFBLENBQUE7V0FDaEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFHaEIsVUFBQSxJQUFBOzs7TUFBQSxFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUksQ0FBQyxTQUFMLENBQWdCLEtBQUEsQ0FBTSxJQUFOLENBQWhCLEVBQTZCLElBQTdCLEVBQW1DLENBQW5DLENBQUwsRUFBQTs7O01BR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxJQUFSO01BQ1AsRUFBRSxDQUFDLENBQUgsQ0FBSyxJQUFMO2FBQ0EsUUFBQSxDQUFTLElBQVQ7SUFSZ0IsQ0FBbEI7RUFEZ0IsQ0FBbEI7QUF2QkEiLCJzb3VyY2VzQ29udGVudCI6WyJ7dW5pdF8sIGxleCwgcGFyc2UsIHRyYW5zcGlsZSwgY29tcGlsZSwgZXZhbHVhdGV9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGVcblxuZGF0YSA9XG5cIlwiXCJcbkJvYlxuICBsaWtlcyBGaXNoXG4gIGxpa2VzIENoaXBzXG5Kb2VcbiAgbGlrZXMgRmlzaFxuXG5kZWZnIChzdGFydClcbiAgfCBAcm5yLmN0eFxuICB3aGVyZVxuICAgICR4IGxpa2VzIEZpc2hcbiAgICAhJHggbGlrZXMgQ2hpcHNcbiAgLS0+XG4gICAgfCBfLiR4XG5cbmRlZmcgKGltcGFzc2UpXG4gIHwgU3RyaW5nKEBybnIuY3R4KVxuXCJcIlwiXG5cbmRlc2NyaWJlICdRdWVyeScsIC0+XG4gIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgI2V2YWx1YXRlIGRhdGFcbiAgICAjY29tcGlsZSBkYXRhXG4gICAgJCQuXyBKU09OLnN0cmluZ2lmeSAocGFyc2UgZGF0YSksIG51bGwsIDJcbiAgICAjJCQuXyBKU09OLnN0cmluZ2lmeSAobGV4IGRhdGEpLCBudWxsLCAyXG4gICAgIyQkLl8gdHJhbnNwaWxlIGRhdGFcbiAgICBjb2RlID0gY29tcGlsZSBkYXRhXG4gICAgJCQuXyBjb2RlXG4gICAgZXZhbHVhdGUgZGF0YVxuIl19
