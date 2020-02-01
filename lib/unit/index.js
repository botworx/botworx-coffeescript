(function() {
  var i, len, m, name, ref;

  ref = ['unit', 'package', 'testunit'];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    m = require('./' + name);
    exports[name] = m;
    Object.assign(exports, m);
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC9pbmRleC5qcyIsInNvdXJjZXMiOlsidW5pdC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQTs7QUFBQTtFQUFBLEtBQUEscUNBQUE7O0lBS0ksQ0FBQSxHQUFJLE9BQUEsQ0FBUSxJQUFBLEdBQU8sSUFBZjtJQUNKLE9BQVEsQ0FBQSxJQUFBLENBQVIsR0FBZ0I7SUFDaEIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxPQUFkLEVBQXVCLENBQXZCO0VBUEo7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImZvciBuYW1lIGluIFtcbiAgICAndW5pdCcsXG4gICAgJ3BhY2thZ2UnLFxuICAgICd0ZXN0dW5pdCdcbiAgXVxuICAgIG0gPSByZXF1aXJlKCcuLycgKyBuYW1lKVxuICAgIGV4cG9ydHNbbmFtZV0gPSBtXG4gICAgT2JqZWN0LmFzc2lnbiBleHBvcnRzLCBtXG4iXX0=
