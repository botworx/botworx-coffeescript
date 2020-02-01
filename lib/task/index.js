(function() {
  var i, k, len, m, name, ref, v;

  ref = ['policy', 'task', 'runner', 'streamer', 'project'];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay9pbmRleC5qcyIsInNvdXJjZXMiOlsidGFzay9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBOztBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7SUFPSSxDQUFBLEdBQUksT0FBQSxDQUFRLElBQUEsR0FBTyxJQUFmO0lBQ0osT0FBUSxDQUFBLElBQUEsQ0FBUixHQUFnQixFQURoQjs7Ozs7SUFNQSxLQUFBLE1BQUE7ZUFBQTs7TUFFRSxPQUFRLENBQUEsQ0FBQSxDQUFSLEdBQWEsQ0FBRSxDQUFBLENBQUE7SUFGakI7RUFiSjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZm9yIG5hbWUgaW4gW1xuICAgICdwb2xpY3knLFxuICAgICd0YXNrJyxcbiAgICAncnVubmVyJyxcbiAgICAnc3RyZWFtZXInLFxuICAgICdwcm9qZWN0J1xuICBdXG4gICAgbSA9IHJlcXVpcmUoJy4vJyArIG5hbWUpXG4gICAgZXhwb3J0c1tuYW1lXSA9IG1cbiAgICAjIyNcbiAgICBjb25zb2xlLmxvZyBcIm1vZHVsZTogI3tuYW1lfVwiXG4gICAgY29uc29sZS5sb2cgSlNPTi5zdHJpbmdpZnkobSlcbiAgICAjIyNcbiAgICBmb3IgaywgdiBvZiBtXG4gICAgICAjY29uc29sZS5sb2cgXCJrZXk6ICN7a30sIHZhbDogI3t2fVwiXG4gICAgICBleHBvcnRzW2tdID0gbVtrXVxuIl19
