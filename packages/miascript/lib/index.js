(function() {
  var i, len, m, miajs, name, ref;

  exports.miajs = miajs = require('miajs');

  Object.assign(exports, miajs);

  ref = ['transformer', 'analyzer', 'yy', 'grammar', 'miacompiler', 'mialexer', 'miaparser', 'visitor', 'miascript'];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    m = require('./' + name);
    exports[name] = m;
    Object.assign(exports, m);
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQTs7RUFBQSxPQUFPLENBQUMsS0FBUixHQUFnQixLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0VBQ3hCLE1BQU0sQ0FBQyxNQUFQLENBQWMsT0FBZCxFQUF1QixLQUF2Qjs7QUFDQTtFQUFBLEtBQUEscUNBQUE7O0lBV0ksQ0FBQSxHQUFJLE9BQUEsQ0FBUSxJQUFBLEdBQU8sSUFBZjtJQUNKLE9BQVEsQ0FBQSxJQUFBLENBQVIsR0FBZ0I7SUFDaEIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxPQUFkLEVBQXVCLENBQXZCO0VBYko7QUFGQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMubWlhanMgPSBtaWFqcyA9IHJlcXVpcmUgJ21pYWpzJ1xuT2JqZWN0LmFzc2lnbiBleHBvcnRzLCBtaWFqc1xuZm9yIG5hbWUgaW4gW1xuICAgICd0cmFuc2Zvcm1lcicsXG4gICAgJ2FuYWx5emVyJyxcbiAgICAneXknLFxuICAgICdncmFtbWFyJyxcbiAgICAnbWlhY29tcGlsZXInLFxuICAgICdtaWFsZXhlcicsXG4gICAgJ21pYXBhcnNlcicsXG4gICAgJ3Zpc2l0b3InLFxuICAgICdtaWFzY3JpcHQnXG4gIF1cbiAgICBtID0gcmVxdWlyZSgnLi8nICsgbmFtZSlcbiAgICBleHBvcnRzW25hbWVdID0gbVxuICAgIE9iamVjdC5hc3NpZ24gZXhwb3J0cywgbVxuIl19
