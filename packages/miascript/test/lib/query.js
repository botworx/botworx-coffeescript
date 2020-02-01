(function() {
  var $$, compile, data, evaluate, lex, parse, transpile, unit_;

  ({unit_, lex, parse, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = "+ Bob likes Fish\n+ Joe likes Fish\n\ndef (hello)\n  | @rnr.ctx\n  where\n    $x likes $y\n    $z likes $y\n    $x != $z\n  -->\n    | _\n    + $x likes $z\n\ndef (goodbye)\n  | String(@rnr.ctx)\n\nhello\ngoodbye";

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VzIjpbInF1ZXJ5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsU0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLEtBQWIsRUFBb0IsU0FBcEIsRUFBK0IsT0FBL0IsRUFBd0MsUUFBeEMsQ0FBQSxHQUFvRCxPQUFBLENBQVEsVUFBUixDQUFwRDs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQXFCQSxRQUFBLENBQVMsT0FBVCxFQUFrQixRQUFBLENBQUEsQ0FBQTtXQUNoQixFQUFBLENBQUcsYUFBSCxFQUFrQixRQUFBLENBQUEsQ0FBQTtBQUdoQixVQUFBLElBQUE7OztNQUFBLEVBQUUsQ0FBQyxDQUFILENBQUssSUFBSSxDQUFDLFNBQUwsQ0FBZ0IsS0FBQSxDQUFNLElBQU4sQ0FBaEIsRUFBNkIsSUFBN0IsRUFBbUMsQ0FBbkMsQ0FBTCxFQUFBOzs7TUFHQSxJQUFBLEdBQU8sT0FBQSxDQUFRLElBQVI7TUFDUCxFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUw7YUFDQSxRQUFBLENBQVMsSUFBVDtJQVJnQixDQUFsQjtFQURnQixDQUFsQjtBQXpCQSIsInNvdXJjZXNDb250ZW50IjpbInt1bml0XywgbGV4LCBwYXJzZSwgdHJhbnNwaWxlLCBjb21waWxlLCBldmFsdWF0ZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxuXG5kYXRhID1cblwiXCJcIlxuKyBCb2IgbGlrZXMgRmlzaFxuKyBKb2UgbGlrZXMgRmlzaFxuXG5kZWYgKGhlbGxvKVxuICB8IEBybnIuY3R4XG4gIHdoZXJlXG4gICAgJHggbGlrZXMgJHlcbiAgICAkeiBsaWtlcyAkeVxuICAgICR4ICE9ICR6XG4gIC0tPlxuICAgIHwgX1xuICAgICsgJHggbGlrZXMgJHpcblxuZGVmIChnb29kYnllKVxuICB8IFN0cmluZyhAcm5yLmN0eClcblxuaGVsbG9cbmdvb2RieWVcblwiXCJcIlxuXG5kZXNjcmliZSAnUXVlcnknLCAtPlxuICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgICNldmFsdWF0ZSBkYXRhXG4gICAgI2NvbXBpbGUgZGF0YVxuICAgICQkLl8gSlNPTi5zdHJpbmdpZnkgKHBhcnNlIGRhdGEpLCBudWxsLCAyXG4gICAgIyQkLl8gSlNPTi5zdHJpbmdpZnkgKGxleCBkYXRhKSwgbnVsbCwgMlxuICAgICMkJC5fIHRyYW5zcGlsZSBkYXRhXG4gICAgY29kZSA9IGNvbXBpbGUgZGF0YVxuICAgICQkLl8gY29kZVxuICAgIGV2YWx1YXRlIGRhdGFcbiJdfQ==
