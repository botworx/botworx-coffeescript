(function() {
  var $$, compile, data, evaluate, parse, transform, transpile, unit_;

  ({unit_, parse, transform, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = "Table: Table1\nBlock: Block1\nBlock: Block2\nBlock3 :Block\nBlock1 on Block2\nAchieve: Block1 on Block2\n+ put Block1 on: Block2\n+ Achieve: Block1 on Block2\nBlock3 ^Block\n\ndef (hello)\n  where\n    (Block: $x) exists\n    #$x on $y\n  -->\n    | _.$x\n\ndef (goodbye)\n  | String(@rnr.ctx)\n\nhello\ngoodbye";

  describe('Typed', function() {
    return describe('@evaluate', function() {
      return it('should work', function() {
        //$$._ JSON.stringify (parse data), null, 2
        $$._(JSON.stringify(transform(data), null, 2));
        $$._(transpile(data));
        $$._(compile(data));
        return evaluate(data);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWQuanMiLCJzb3VyY2VzIjpbInR5cGVkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLFNBQWYsRUFBMEIsU0FBMUIsRUFBcUMsT0FBckMsRUFBOEMsUUFBOUMsQ0FBQSxHQUEwRCxPQUFBLENBQVEsVUFBUixDQUExRDs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQXlCQSxRQUFBLENBQVMsT0FBVCxFQUFrQixRQUFBLENBQUEsQ0FBQTtXQUNoQixRQUFBLENBQVMsV0FBVCxFQUFzQixRQUFBLENBQUEsQ0FBQTthQUNwQixFQUFBLENBQUcsYUFBSCxFQUFrQixRQUFBLENBQUEsQ0FBQSxFQUFBOztRQUVoQixFQUFFLENBQUMsQ0FBSCxDQUFLLElBQUksQ0FBQyxTQUFMLENBQWdCLFNBQUEsQ0FBVSxJQUFWLENBQWhCLEVBQWlDLElBQWpDLEVBQXVDLENBQXZDLENBQUw7UUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLFNBQUEsQ0FBVSxJQUFWLENBQUw7UUFDQSxFQUFFLENBQUMsQ0FBSCxDQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUw7ZUFDQSxRQUFBLENBQVMsSUFBVDtNQUxnQixDQUFsQjtJQURvQixDQUF0QjtFQURnQixDQUFsQjtBQTdCQSIsInNvdXJjZXNDb250ZW50IjpbInt1bml0XywgcGFyc2UsIHRyYW5zZm9ybSwgdHJhbnNwaWxlLCBjb21waWxlLCBldmFsdWF0ZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxuXG5kYXRhID1cblwiXCJcIlxuVGFibGU6IFRhYmxlMVxuQmxvY2s6IEJsb2NrMVxuQmxvY2s6IEJsb2NrMlxuQmxvY2szIDpCbG9ja1xuQmxvY2sxIG9uIEJsb2NrMlxuQWNoaWV2ZTogQmxvY2sxIG9uIEJsb2NrMlxuKyBwdXQgQmxvY2sxIG9uOiBCbG9jazJcbisgQWNoaWV2ZTogQmxvY2sxIG9uIEJsb2NrMlxuQmxvY2szIF5CbG9ja1xuXG5kZWYgKGhlbGxvKVxuICB3aGVyZVxuICAgIChCbG9jazogJHgpIGV4aXN0c1xuICAgICMkeCBvbiAkeVxuICAtLT5cbiAgICB8IF8uJHhcblxuZGVmIChnb29kYnllKVxuICB8IFN0cmluZyhAcm5yLmN0eClcblxuaGVsbG9cbmdvb2RieWVcblwiXCJcIlxuXG5kZXNjcmliZSAnVHlwZWQnLCAtPlxuICBkZXNjcmliZSAnQGV2YWx1YXRlJywgLT5cbiAgICBpdCAnc2hvdWxkIHdvcmsnLCAtPlxuICAgICAgIyQkLl8gSlNPTi5zdHJpbmdpZnkgKHBhcnNlIGRhdGEpLCBudWxsLCAyXG4gICAgICAkJC5fIEpTT04uc3RyaW5naWZ5ICh0cmFuc2Zvcm0gZGF0YSksIG51bGwsIDJcbiAgICAgICQkLl8gdHJhbnNwaWxlIGRhdGFcbiAgICAgICQkLl8gY29tcGlsZSBkYXRhXG4gICAgICBldmFsdWF0ZSBkYXRhXG4iXX0=
