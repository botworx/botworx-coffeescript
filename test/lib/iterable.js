(function() {
  var $$, unit_;

  ({$$, unit_} = require('./common'));

  $$ = unit_(module, $$);

  describe('TIterable', function() {
    return it('should work', function() {
      var A, B, b, l, results;
      A = (function() {
        class A {};

        A.iterator(function*() {
          yield 'a';
          return (yield 'b');
        });

        return A;

      }).call(this);
      B = (function() {
        class B extends A {
          * iterator() {
            yield* super.iterator();
            return (yield 'c');
          }

        };

        B.TIterable();

        return B;

      }).call(this);
      b = new B();
      results = [];
      for (l of b) {
        results.push($$._(l));
      }
      return results;
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmFibGUuanMiLCJzb3VyY2VzIjpbIml0ZXJhYmxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxFQUFELEVBQUssS0FBTCxDQUFBLEdBQWMsT0FBQSxDQUFRLFVBQVIsQ0FBZDs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU4sRUFBYyxFQUFkOztFQUVMLFFBQUEsQ0FBUyxXQUFULEVBQXNCLFFBQUEsQ0FBQSxDQUFBO1dBQ3BCLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFFBQUEsQ0FBQSxDQUFBO0FBQ2hCLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO01BQU07UUFBTixNQUFBLEVBQUEsQ0FBQTs7UUFDRSxDQUFDLENBQUEsUUFBRCxDQUFVLFNBQUEsQ0FBQSxDQUFBO1VBQ1IsTUFBTTtpQkFDTixDQUFBLE1BQU0sR0FBTjtRQUZRLENBQVY7Ozs7O01BR0k7UUFBTixNQUFBLEVBQUEsUUFBZ0IsRUFBaEI7VUFFWSxFQUFWLFFBQVUsQ0FBQSxDQUFBO1lBQ1IsWUFERixDQUFBLFFBQ2EsQ0FBQTttQkFDWCxDQUFBLE1BQU0sR0FBTjtVQUZROztRQUZaOztRQUNFLENBQUMsQ0FBQSxTQUFELENBQUE7Ozs7O01BS0YsQ0FBQSxHQUFJLElBQUksQ0FBSixDQUFBO0FBQ0o7TUFBQSxLQUFBLE1BQUE7cUJBQ0UsRUFBRSxDQUFDLENBQUgsQ0FBSyxDQUFMO01BREYsQ0FBQTs7SUFaZ0IsQ0FBbEI7RUFEb0IsQ0FBdEI7QUFIQSIsInNvdXJjZXNDb250ZW50IjpbInskJCwgdW5pdF99ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGUsICQkXG5cbmRlc2NyaWJlICdUSXRlcmFibGUnLCAtPlxuICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgIGNsYXNzIEFcbiAgICAgIEBpdGVyYXRvciAtPlxuICAgICAgICB5aWVsZCAnYSdcbiAgICAgICAgeWllbGQgJ2InXG4gICAgY2xhc3MgQiBleHRlbmRzIEFcbiAgICAgIEBUSXRlcmFibGUoKVxuICAgICAgaXRlcmF0b3I6IC0+XG4gICAgICAgIHlpZWxkIGZyb20gc3VwZXIoKVxuICAgICAgICB5aWVsZCAnYydcblxuICAgIGIgPSBuZXcgQigpXG4gICAgZm9yIGwgZnJvbSBiXG4gICAgICAkJC5fIGxcbiJdfQ==
