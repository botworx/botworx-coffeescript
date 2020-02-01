(function() {
  var $$, analyze, compile, data, evaluate, lex, parse, transform, transpile, unit_;

  ({unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common'));

  $$ = unit_(module);

  data = 'Table1 :Table\n  isClear true\n\nBlock1 :Block\n  onTop Table1\n\nBlock2 :Block\n  onTop Block1\n\nBlock3 :Block\n  onTop Block2\n  isClear true\n\n+ Achieve: stack Block1 on: Block2\n+ Achieve: stack Block2 on: Block3\n\ndefg (impasse)\n  | \'Impassed\'\n  where\n    ($g :Goal) status Active\n  -->\n    /* $g\n  !=>\n    halt\n\ndef (+ $g :Goal)\n  + $g status Active\n\ndef (- $g :Goal)\n  - $g status Active\n\ndef (stack $x on: $y -> $g)\n  where\n    ! $x isClear true\n  -->\n    /clear $x\n  ==>\n    return\n  #else\n  where\n    ! $y isClear true\n  -->\n    /clear $y\n  ==>\n    return\n  #else\n  where\n    $x onTop $z\n  -->\n    - $x onTop $z\n\n  + $x onTop $y\n\n  - $g\n\ndef (goodbye)\n  | String(@rnr.ctx)\n\ngoodbye';

  describe('Blox', function() {
    return it('should work', function() {
      //$$._ lex data
      //$$._ JSON.stringify (parse data), null, 2
      //$$._ JSON.stringify (transform data), null, 2
      //$$._ JSON.stringify (analyze data), null, 2
      $$._(transpile(data));
      //$$._ compile data
      return evaluate(data);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxveC5qcyIsInNvdXJjZXMiOlsiYmxveC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxTQUFBLEVBQUEsU0FBQSxFQUFBOztFQUFBLENBQUEsQ0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLEtBQWIsRUFBb0IsU0FBcEIsRUFBK0IsT0FBL0IsRUFBd0MsU0FBeEMsRUFBbUQsT0FBbkQsRUFBNEQsUUFBNUQsQ0FBQSxHQUF3RSxPQUFBLENBQVEsVUFBUixDQUF4RTs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU47O0VBRUwsSUFBQSxHQUNBOztFQThEQSxRQUFBLENBQVMsTUFBVCxFQUFpQixRQUFBLENBQUEsQ0FBQTtXQUNmLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFFBQUEsQ0FBQSxDQUFBLEVBQUE7Ozs7O01BS2hCLEVBQUUsQ0FBQyxDQUFILENBQUssU0FBQSxDQUFVLElBQVYsQ0FBTCxFQUFBOzthQUVBLFFBQUEsQ0FBUyxJQUFUO0lBUGdCLENBQWxCO0VBRGUsQ0FBakI7QUFsRUEiLCJzb3VyY2VzQ29udGVudCI6WyJ7dW5pdF8sIGxleCwgcGFyc2UsIHRyYW5zZm9ybSwgYW5hbHl6ZSwgdHJhbnNwaWxlLCBjb21waWxlLCBldmFsdWF0ZX0gPSByZXF1aXJlKCcuL2NvbW1vbicpXG4kJCA9IHVuaXRfIG1vZHVsZVxuXG5kYXRhID1cbicnJ1xuVGFibGUxIDpUYWJsZVxuICBpc0NsZWFyIHRydWVcblxuQmxvY2sxIDpCbG9ja1xuICBvblRvcCBUYWJsZTFcblxuQmxvY2syIDpCbG9ja1xuICBvblRvcCBCbG9jazFcblxuQmxvY2szIDpCbG9ja1xuICBvblRvcCBCbG9jazJcbiAgaXNDbGVhciB0cnVlXG5cbisgQWNoaWV2ZTogc3RhY2sgQmxvY2sxIG9uOiBCbG9jazJcbisgQWNoaWV2ZTogc3RhY2sgQmxvY2syIG9uOiBCbG9jazNcblxuZGVmZyAoaW1wYXNzZSlcbiAgfCAnSW1wYXNzZWQnXG4gIHdoZXJlXG4gICAgKCRnIDpHb2FsKSBzdGF0dXMgQWN0aXZlXG4gIC0tPlxuICAgIC8qICRnXG4gICE9PlxuICAgIGhhbHRcblxuZGVmICgrICRnIDpHb2FsKVxuICArICRnIHN0YXR1cyBBY3RpdmVcblxuZGVmICgtICRnIDpHb2FsKVxuICAtICRnIHN0YXR1cyBBY3RpdmVcblxuZGVmIChzdGFjayAkeCBvbjogJHkgLT4gJGcpXG4gIHdoZXJlXG4gICAgISAkeCBpc0NsZWFyIHRydWVcbiAgLS0+XG4gICAgL2NsZWFyICR4XG4gID09PlxuICAgIHJldHVyblxuICAjZWxzZVxuICB3aGVyZVxuICAgICEgJHkgaXNDbGVhciB0cnVlXG4gIC0tPlxuICAgIC9jbGVhciAkeVxuICA9PT5cbiAgICByZXR1cm5cbiAgI2Vsc2VcbiAgd2hlcmVcbiAgICAkeCBvblRvcCAkelxuICAtLT5cbiAgICAtICR4IG9uVG9wICR6XG5cbiAgKyAkeCBvblRvcCAkeVxuXG4gIC0gJGdcblxuZGVmIChnb29kYnllKVxuICB8IFN0cmluZyhAcm5yLmN0eClcblxuZ29vZGJ5ZVxuJycnXG5cbmRlc2NyaWJlICdCbG94JywgLT5cbiAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICAjJCQuXyBsZXggZGF0YVxuICAgICMkJC5fIEpTT04uc3RyaW5naWZ5IChwYXJzZSBkYXRhKSwgbnVsbCwgMlxuICAgICMkJC5fIEpTT04uc3RyaW5naWZ5ICh0cmFuc2Zvcm0gZGF0YSksIG51bGwsIDJcbiAgICAjJCQuXyBKU09OLnN0cmluZ2lmeSAoYW5hbHl6ZSBkYXRhKSwgbnVsbCwgMlxuICAgICQkLl8gdHJhbnNwaWxlIGRhdGFcbiAgICAjJCQuXyBjb21waWxlIGRhdGFcbiAgICBldmFsdWF0ZSBkYXRhXG4iXX0=
