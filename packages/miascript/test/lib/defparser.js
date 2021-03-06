(function() {
  var $$, MiaLexer, MiaParser, assert, compiler, grammar, unit_, yy;

  assert = require('assert');

  ({unit_, grammar, yy, compiler, MiaLexer, MiaParser} = require('./common'));

  $$ = unit_(module);

  describe('DefParser', function() {
    return describe('@parse', function() {
      return it('should work', function() {
        var ast, data, err, lexer, parser, terminals, tok;
        $$.h2('Data');
        data = "say $t";
        $$._(data);
        $$.h2('Lex');
        terminals = grammar.parser.terminals_;
        lexer = new MiaLexer();
        lexer.setInput(data);
        while ((tok = lexer.lex()) !== lexer.EOF) {
          $$._(terminals[tok]);
        }
        $$.h2('Parse');
        parser = new MiaParser(lexer, yy);
        try {
          ast = parser.parse(data);
        } catch (error) {
          err = error;
          $$._(err.message);
          $$._(err.hash);
        }
        $$.h2('AST');
        return $$._(JSON.stringify(ast, null, 2));
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcGFyc2VyLmpzIiwic291cmNlcyI6WyJkZWZwYXJzZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBLFNBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztFQUNULENBQUEsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixFQUFqQixFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxTQUF6QyxDQUFBLEdBQXNELE9BQUEsQ0FBUSxVQUFSLENBQXREOztFQUNBLEVBQUEsR0FBSyxLQUFBLENBQU0sTUFBTjs7RUFFTCxRQUFBLENBQVMsV0FBVCxFQUFzQixRQUFBLENBQUEsQ0FBQTtXQUNwQixRQUFBLENBQVMsUUFBVCxFQUFtQixRQUFBLENBQUEsQ0FBQTthQUNqQixFQUFBLENBQUcsYUFBSCxFQUFrQixRQUFBLENBQUEsQ0FBQTtBQUNoQixZQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsU0FBQSxFQUFBO1FBQUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxNQUFOO1FBQ0EsSUFBQSxHQUFPO1FBQ1AsRUFBRSxDQUFDLENBQUgsQ0FBSyxJQUFMO1FBRUEsRUFBRSxDQUFDLEVBQUgsQ0FBTSxLQUFOO1FBQ0EsU0FBQSxHQUFZLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDM0IsS0FBQSxHQUFRLElBQUksUUFBSixDQUFBO1FBQ1IsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmO0FBQ0EsZUFBTSxDQUFDLEdBQUEsR0FBTSxLQUFLLENBQUMsR0FBTixDQUFBLENBQVAsQ0FBQSxLQUF1QixLQUFLLENBQUMsR0FBbkM7VUFDRSxFQUFFLENBQUMsQ0FBSCxDQUFLLFNBQVUsQ0FBQSxHQUFBLENBQWY7UUFERjtRQUdBLEVBQUUsQ0FBQyxFQUFILENBQU0sT0FBTjtRQUNBLE1BQUEsR0FBUyxJQUFJLFNBQUosQ0FBYyxLQUFkLEVBQXFCLEVBQXJCO0FBQ1Q7VUFDRSxHQUFBLEdBQU0sTUFBTSxDQUFDLEtBQVAsQ0FBYSxJQUFiLEVBRFI7U0FBQSxhQUFBO1VBRU07VUFDSixFQUFFLENBQUMsQ0FBSCxDQUFLLEdBQUcsQ0FBQyxPQUFUO1VBQ0EsRUFBRSxDQUFDLENBQUgsQ0FBSyxHQUFHLENBQUMsSUFBVCxFQUpGOztRQU1BLEVBQUUsQ0FBQyxFQUFILENBQU0sS0FBTjtlQUNBLEVBQUUsQ0FBQyxDQUFILENBQUssSUFBSSxDQUFDLFNBQUwsQ0FBZSxHQUFmLEVBQW9CLElBQXBCLEVBQTBCLENBQTFCLENBQUw7TUFyQmdCLENBQWxCO0lBRGlCLENBQW5CO0VBRG9CLENBQXRCO0FBSkEiLCJzb3VyY2VzQ29udGVudCI6WyJhc3NlcnQgPSByZXF1aXJlICdhc3NlcnQnXG57dW5pdF8sIGdyYW1tYXIsIHl5LCBjb21waWxlciwgTWlhTGV4ZXIsIE1pYVBhcnNlcn0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxuXG5kZXNjcmliZSAnRGVmUGFyc2VyJywgLT5cbiAgZGVzY3JpYmUgJ0BwYXJzZScsIC0+XG4gICAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICAgICQkLmgyICdEYXRhJ1xuICAgICAgZGF0YSA9IFwic2F5ICR0XCJcbiAgICAgICQkLl8gZGF0YVxuXG4gICAgICAkJC5oMiAnTGV4J1xuICAgICAgdGVybWluYWxzID0gZ3JhbW1hci5wYXJzZXIudGVybWluYWxzX1xuICAgICAgbGV4ZXIgPSBuZXcgTWlhTGV4ZXIoKVxuICAgICAgbGV4ZXIuc2V0SW5wdXQgZGF0YVxuICAgICAgd2hpbGUgKHRvayA9IGxleGVyLmxleCgpKSAhPSBsZXhlci5FT0ZcbiAgICAgICAgJCQuXyB0ZXJtaW5hbHNbdG9rXVxuXG4gICAgICAkJC5oMignUGFyc2UnKVxuICAgICAgcGFyc2VyID0gbmV3IE1pYVBhcnNlcihsZXhlciwgeXkpXG4gICAgICB0cnlcbiAgICAgICAgYXN0ID0gcGFyc2VyLnBhcnNlKGRhdGEpXG4gICAgICBjYXRjaCBlcnJcbiAgICAgICAgJCQuXyBlcnIubWVzc2FnZVxuICAgICAgICAkJC5fIGVyci5oYXNoXG5cbiAgICAgICQkLmgyKCdBU1QnKVxuICAgICAgJCQuXyhKU09OLnN0cmluZ2lmeShhc3QsIG51bGwsIDIpKVxuIl19
