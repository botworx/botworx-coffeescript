(function() {
  var $$, $_, Term, assert, runtime, unit_;

  assert = require('chai').assert;

  ({unit_, runtime} = require('./common'));

  $$ = unit_(module);

  ({$_, Term} = runtime);

  describe('Term', function() {
    return describe('typed', function() {
      return it('should work', function() {
        var Table, t1, t2;
        //t = $_ 'Block1', 'Block'
        Table = class Table extends Term {};
        t1 = $_('Table1', Table);
        $$._(t1);
        t2 = $_('Block1', 'Block');
        return $$._(t2);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWQuanMiLCJzb3VyY2VzIjpbInR5cGVkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQTs7RUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLE1BQVIsQ0FBZSxDQUFDOztFQUN6QixDQUFBLENBQUMsS0FBRCxFQUFRLE9BQVIsQ0FBQSxHQUFtQixPQUFBLENBQVEsVUFBUixDQUFuQjs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBQ0wsQ0FBQSxDQUFDLEVBQUQsRUFBSyxJQUFMLENBQUEsR0FBYSxPQUFiOztFQUVBLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFFBQUEsQ0FBQSxDQUFBO1dBQ2YsUUFBQSxDQUFTLE9BQVQsRUFBa0IsUUFBQSxDQUFBLENBQUE7YUFDaEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFFaEIsWUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7O1FBQU0sUUFBTixNQUFBLE1BQUEsUUFBb0IsS0FBcEIsQ0FBQTtRQUNBLEVBQUEsR0FBSyxFQUFBLENBQUcsUUFBSCxFQUFhLEtBQWI7UUFDTCxFQUFFLENBQUMsQ0FBSCxDQUFLLEVBQUw7UUFFQSxFQUFBLEdBQUssRUFBQSxDQUFHLFFBQUgsRUFBYSxPQUFiO2VBQ0wsRUFBRSxDQUFDLENBQUgsQ0FBSyxFQUFMO01BUGdCLENBQWxCO0lBRGdCLENBQWxCO0VBRGUsQ0FBakI7QUFMQSIsInNvdXJjZXNDb250ZW50IjpbImFzc2VydCA9IHJlcXVpcmUoJ2NoYWknKS5hc3NlcnRcbnt1bml0XywgcnVudGltZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxueyRfLCBUZXJtfSA9IHJ1bnRpbWVcblxuZGVzY3JpYmUgJ1Rlcm0nLCAtPlxuICBkZXNjcmliZSAndHlwZWQnLCAtPlxuICAgIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgICAjdCA9ICRfICdCbG9jazEnLCAnQmxvY2snXG4gICAgICBjbGFzcyBUYWJsZSBleHRlbmRzIFRlcm1cbiAgICAgIHQxID0gJF8gJ1RhYmxlMScsIFRhYmxlXG4gICAgICAkJC5fIHQxXG5cbiAgICAgIHQyID0gJF8gJ0Jsb2NrMScsICdCbG9jaydcbiAgICAgICQkLl8gdDJcbiJdfQ==
