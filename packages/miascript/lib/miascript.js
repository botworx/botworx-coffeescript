(function() {
  var $$, Analyzer, MiaCompiler, MiaLexer, MiaParser, Stringer, Transformer, analyze, coffeescript, compile, evaluate, grammar, lex, miascript, parse, transform, transpile, unit_, yy;

  coffeescript = require('coffeescript');

  miascript = require('./index');

  ({unit_, MiaLexer, MiaParser, Transformer, Analyzer, MiaCompiler, grammar, yy, Stringer} = miascript);

  $$ = unit_(module);

  exports.lex = lex = function(code, options) {
    var lexer, terminals, token, tokens;
    terminals = grammar.parser.terminals_;
    lexer = new MiaLexer();
    lexer.setInput(code);
    tokens = [];
    while ((token = lexer.lex()) !== lexer.EOF) {
      tokens.push(terminals[token]);
    }
    //$$._ terminals[token]
    return tokens;
  };

  exports.parse = parse = function(code, options) {
    var lexer, parser;
    lexer = new MiaLexer();
    parser = new MiaParser(lexer, yy);
    
    /*
    try
      ast = parser.parse(code)
    catch err
      console.log err
    */
    return parser.parse(code);
  };

  //$$.$ $$.stringify ast, null, 2
  /*
  console.log('-----------------')
  console.log(JSON.stringify(ast, null, 2))
  console.log('-----------------')
  */
  exports.transform = transform = function(code, options) {
    var ast, transformer;
    ast = parse(code, options);
    transformer = new Transformer();
    ast = transformer.transform(ast, options);
    return ast;
  };

  exports.analyze = analyze = function(code, options) {
    var analyzer, ast;
    ast = transform(code, options);
    analyzer = new Analyzer();
    ast = analyzer.analyze(ast, options);
    return ast;
  };

  exports.transpile = transpile = function(code, options) {
    var ast, coffeecode, compiler, stringer;
    ast = analyze(code, options);
    stringer = new Stringer();
    compiler = new MiaCompiler(stringer);
    compiler.compile(ast, options);
    coffeecode = stringer.toString();
    return coffeecode;
  };

  exports.compile = compile = function(code, options) {
    var coffeecode, js;
    coffeecode = transpile(code, options);
    js = coffeescript.compile(coffeecode, options);
    return js;
  };

  exports.evaluate = evaluate = function(code, options) {
    var coffeecode, result;
    coffeecode = transpile(code, options);
    result = coffeescript.eval(coffeecode, options);
    return result;
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlhc2NyaXB0LmpzIiwic291cmNlcyI6WyJtaWFzY3JpcHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBLFdBQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUEsT0FBQSxFQUFBLFlBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQTs7RUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGNBQVI7O0VBQ2YsU0FBQSxHQUFZLE9BQUEsQ0FBUSxTQUFSOztFQUNaLENBQUEsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixTQUFsQixFQUE2QixXQUE3QixFQUEwQyxRQUExQyxFQUFvRCxXQUFwRCxFQUFpRSxPQUFqRSxFQUEwRSxFQUExRSxFQUE4RSxRQUE5RSxDQUFBLEdBQTBGLFNBQTFGOztFQUVBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFFTCxPQUFPLENBQUMsR0FBUixHQUFjLEdBQUEsR0FBTSxRQUFBLENBQUMsSUFBRCxFQUFPLE9BQVAsQ0FBQTtBQUNsQixRQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsS0FBQSxFQUFBO0lBQUEsU0FBQSxHQUFZLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDM0IsS0FBQSxHQUFRLElBQUksUUFBSixDQUFBO0lBQ1IsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmO0lBQ0EsTUFBQSxHQUFTO0FBQ1QsV0FBTSxDQUFDLEtBQUEsR0FBUSxLQUFLLENBQUMsR0FBTixDQUFBLENBQVQsQ0FBQSxLQUF5QixLQUFLLENBQUMsR0FBckM7TUFDRSxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVUsQ0FBQSxLQUFBLENBQXRCO0lBREYsQ0FKQTs7V0FPQTtFQVJrQjs7RUFVcEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsS0FBQSxHQUFRLFFBQUEsQ0FBQyxJQUFELEVBQU8sT0FBUCxDQUFBO0FBQ3RCLFFBQUEsS0FBQSxFQUFBO0lBQUEsS0FBQSxHQUFRLElBQUksUUFBSixDQUFBO0lBQ1IsTUFBQSxHQUFTLElBQUksU0FBSixDQUFjLEtBQWQsRUFBcUIsRUFBckIsRUFEVDs7Ozs7Ozs7V0FTQSxNQUFNLENBQUMsS0FBUCxDQUFhLElBQWI7RUFWc0IsRUFoQnhCOzs7Ozs7OztFQWtDQSxPQUFPLENBQUMsU0FBUixHQUFvQixTQUFBLEdBQVksUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDOUIsUUFBQSxHQUFBLEVBQUE7SUFBQSxHQUFBLEdBQU0sS0FBQSxDQUFNLElBQU4sRUFBWSxPQUFaO0lBQ04sV0FBQSxHQUFjLElBQUksV0FBSixDQUFBO0lBQ2QsR0FBQSxHQUFNLFdBQVcsQ0FBQyxTQUFaLENBQXNCLEdBQXRCLEVBQTJCLE9BQTNCO0FBQ04sV0FBTztFQUp1Qjs7RUFNaEMsT0FBTyxDQUFDLE9BQVIsR0FBa0IsT0FBQSxHQUFVLFFBQUEsQ0FBQyxJQUFELEVBQU8sT0FBUCxDQUFBO0FBQzFCLFFBQUEsUUFBQSxFQUFBO0lBQUEsR0FBQSxHQUFNLFNBQUEsQ0FBVSxJQUFWLEVBQWdCLE9BQWhCO0lBQ04sUUFBQSxHQUFXLElBQUksUUFBSixDQUFBO0lBQ1gsR0FBQSxHQUFNLFFBQVEsQ0FBQyxPQUFULENBQWlCLEdBQWpCLEVBQXNCLE9BQXRCO0FBQ04sV0FBTztFQUptQjs7RUFNNUIsT0FBTyxDQUFDLFNBQVIsR0FBb0IsU0FBQSxHQUFhLFFBQUEsQ0FBQyxJQUFELEVBQU8sT0FBUCxDQUFBO0FBQy9CLFFBQUEsR0FBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUE7SUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLElBQVIsRUFBYyxPQUFkO0lBQ04sUUFBQSxHQUFXLElBQUksUUFBSixDQUFBO0lBQ1gsUUFBQSxHQUFXLElBQUksV0FBSixDQUFnQixRQUFoQjtJQUNYLFFBQVEsQ0FBQyxPQUFULENBQWlCLEdBQWpCLEVBQXNCLE9BQXRCO0lBQ0EsVUFBQSxHQUFhLFFBQVEsQ0FBQyxRQUFULENBQUE7QUFDYixXQUFPO0VBTndCOztFQVFqQyxPQUFPLENBQUMsT0FBUixHQUFrQixPQUFBLEdBQVUsUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDMUIsUUFBQSxVQUFBLEVBQUE7SUFBQSxVQUFBLEdBQWEsU0FBQSxDQUFVLElBQVYsRUFBZ0IsT0FBaEI7SUFDYixFQUFBLEdBQUssWUFBWSxDQUFDLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMsT0FBakM7QUFDTCxXQUFPO0VBSG1COztFQUs1QixPQUFPLENBQUMsUUFBUixHQUFtQixRQUFBLEdBQVcsUUFBQSxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7QUFDNUIsUUFBQSxVQUFBLEVBQUE7SUFBQSxVQUFBLEdBQWEsU0FBQSxDQUFVLElBQVYsRUFBZ0IsT0FBaEI7SUFDYixNQUFBLEdBQVMsWUFBWSxDQUFDLElBQWIsQ0FBa0IsVUFBbEIsRUFBOEIsT0FBOUI7QUFDVCxXQUFPO0VBSHFCO0FBM0Q5QiIsInNvdXJjZXNDb250ZW50IjpbImNvZmZlZXNjcmlwdCA9IHJlcXVpcmUgJ2NvZmZlZXNjcmlwdCdcbm1pYXNjcmlwdCA9IHJlcXVpcmUoJy4vaW5kZXgnKVxue3VuaXRfLCBNaWFMZXhlciwgTWlhUGFyc2VyLCBUcmFuc2Zvcm1lciwgQW5hbHl6ZXIsIE1pYUNvbXBpbGVyLCBncmFtbWFyLCB5eSwgU3RyaW5nZXJ9ID0gbWlhc2NyaXB0XG5cbiQkID0gdW5pdF8gbW9kdWxlXG5cbmV4cG9ydHMubGV4ID0gbGV4ID0gKGNvZGUsIG9wdGlvbnMpIC0+XG4gIHRlcm1pbmFscyA9IGdyYW1tYXIucGFyc2VyLnRlcm1pbmFsc19cbiAgbGV4ZXIgPSBuZXcgTWlhTGV4ZXIoKVxuICBsZXhlci5zZXRJbnB1dChjb2RlKVxuICB0b2tlbnMgPSBbXVxuICB3aGlsZSAodG9rZW4gPSBsZXhlci5sZXgoKSkgIT0gbGV4ZXIuRU9GXG4gICAgdG9rZW5zLnB1c2ggdGVybWluYWxzW3Rva2VuXVxuICAgICMkJC5fIHRlcm1pbmFsc1t0b2tlbl1cbiAgdG9rZW5zXG5cbmV4cG9ydHMucGFyc2UgPSBwYXJzZSA9IChjb2RlLCBvcHRpb25zKSAtPlxuICBsZXhlciA9IG5ldyBNaWFMZXhlcigpXG4gIHBhcnNlciA9IG5ldyBNaWFQYXJzZXIobGV4ZXIsIHl5KVxuICAjXG4gICMjI1xuICB0cnlcbiAgICBhc3QgPSBwYXJzZXIucGFyc2UoY29kZSlcbiAgY2F0Y2ggZXJyXG4gICAgY29uc29sZS5sb2cgZXJyXG4gICMjI1xuICBwYXJzZXIucGFyc2UoY29kZSlcbiAgIyQkLiQgJCQuc3RyaW5naWZ5IGFzdCwgbnVsbCwgMlxuICAjIyNcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tJylcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXN0LCBudWxsLCAyKSlcbiAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tJylcbiAgIyMjXG5cbmV4cG9ydHMudHJhbnNmb3JtID0gdHJhbnNmb3JtID0gKGNvZGUsIG9wdGlvbnMpIC0+XG4gIGFzdCA9IHBhcnNlIGNvZGUsIG9wdGlvbnNcbiAgdHJhbnNmb3JtZXIgPSBuZXcgVHJhbnNmb3JtZXIoKVxuICBhc3QgPSB0cmFuc2Zvcm1lci50cmFuc2Zvcm0oYXN0LCBvcHRpb25zKVxuICByZXR1cm4gYXN0XG5cbmV4cG9ydHMuYW5hbHl6ZSA9IGFuYWx5emUgPSAoY29kZSwgb3B0aW9ucykgLT5cbiAgYXN0ID0gdHJhbnNmb3JtIGNvZGUsIG9wdGlvbnNcbiAgYW5hbHl6ZXIgPSBuZXcgQW5hbHl6ZXIoKVxuICBhc3QgPSBhbmFseXplci5hbmFseXplKGFzdCwgb3B0aW9ucylcbiAgcmV0dXJuIGFzdFxuXG5leHBvcnRzLnRyYW5zcGlsZSA9IHRyYW5zcGlsZSAgPSAoY29kZSwgb3B0aW9ucykgLT5cbiAgYXN0ID0gYW5hbHl6ZSBjb2RlLCBvcHRpb25zXG4gIHN0cmluZ2VyID0gbmV3IFN0cmluZ2VyKClcbiAgY29tcGlsZXIgPSBuZXcgTWlhQ29tcGlsZXIoc3RyaW5nZXIpXG4gIGNvbXBpbGVyLmNvbXBpbGUoYXN0LCBvcHRpb25zKVxuICBjb2ZmZWVjb2RlID0gc3RyaW5nZXIudG9TdHJpbmcoKVxuICByZXR1cm4gY29mZmVlY29kZVxuXG5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlID0gKGNvZGUsIG9wdGlvbnMpIC0+XG4gIGNvZmZlZWNvZGUgPSB0cmFuc3BpbGUgY29kZSwgb3B0aW9uc1xuICBqcyA9IGNvZmZlZXNjcmlwdC5jb21waWxlIGNvZmZlZWNvZGUsIG9wdGlvbnNcbiAgcmV0dXJuIGpzXG5cbmV4cG9ydHMuZXZhbHVhdGUgPSBldmFsdWF0ZSA9IChjb2RlLCBvcHRpb25zKSAtPlxuICBjb2ZmZWVjb2RlID0gdHJhbnNwaWxlIGNvZGUsIG9wdGlvbnNcbiAgcmVzdWx0ID0gY29mZmVlc2NyaXB0LmV2YWwgY29mZmVlY29kZSwgb3B0aW9uc1xuICByZXR1cm4gcmVzdWx0XG4iXX0=
