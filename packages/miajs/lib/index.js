(function() {
  var i, k, len, m, name, ref, v;

  exports.id = module.id;

  ref = ['miajs', 'task', 'main', 'context', 'query', 'stream', 'unit'];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    m = require('./' + name);
    exports[name] = m;
/*
console.log "module: #{name}"
console.log JSON.stringify(m)
*/
    for (k in m) {
      v = m[k];
      //console.log "key: #{k}, val: #{v}"
      exports[k] = m[k];
    }
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUE7O0VBQUEsT0FBTyxDQUFDLEVBQVIsR0FBYSxNQUFNLENBQUM7O0FBQ3BCO0VBQUEsS0FBQSxxQ0FBQTs7SUFTSSxDQUFBLEdBQUksT0FBQSxDQUFRLElBQUEsR0FBTyxJQUFmO0lBQ0osT0FBUSxDQUFBLElBQUEsQ0FBUixHQUFnQixFQURoQjs7Ozs7SUFNQSxLQUFBLE1BQUE7ZUFBQTs7TUFFRSxPQUFRLENBQUEsQ0FBQSxDQUFSLEdBQWEsQ0FBRSxDQUFBLENBQUE7SUFGakI7RUFmSjtBQURBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cy5pZCA9IG1vZHVsZS5pZFxuZm9yIG5hbWUgaW4gW1xuICAgICdtaWFqcycsXG4gICAgJ3Rhc2snLFxuICAgICdtYWluJyxcbiAgICAnY29udGV4dCcsXG4gICAgJ3F1ZXJ5JyxcbiAgICAnc3RyZWFtJyxcbiAgICAndW5pdCdcbiAgXVxuICAgIG0gPSByZXF1aXJlKCcuLycgKyBuYW1lKVxuICAgIGV4cG9ydHNbbmFtZV0gPSBtXG4gICAgIyMjXG4gICAgY29uc29sZS5sb2cgXCJtb2R1bGU6ICN7bmFtZX1cIlxuICAgIGNvbnNvbGUubG9nIEpTT04uc3RyaW5naWZ5KG0pXG4gICAgIyMjXG4gICAgZm9yIGssIHYgb2YgbVxuICAgICAgI2NvbnNvbGUubG9nIFwia2V5OiAje2t9LCB2YWw6ICN7dn1cIlxuICAgICAgZXhwb3J0c1trXSA9IG1ba11cbiJdfQ==
