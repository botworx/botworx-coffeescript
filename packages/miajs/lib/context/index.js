(function() {
  var i, k, len, m, name, ref, v;

  ref = ['context', 'yamlcontext'];
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    m = require('./' + name);
    exports[name] = m;
    for (k in m) {
      v = m[k];
      exports[k] = m[k];
    }
  }

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC9pbmRleC5qcyIsInNvdXJjZXMiOlsiY29udGV4dC9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBOztBQUFBO0VBQUEsS0FBQSxxQ0FBQTs7SUFJSSxDQUFBLEdBQUksT0FBQSxDQUFRLElBQUEsR0FBTyxJQUFmO0lBQ0osT0FBUSxDQUFBLElBQUEsQ0FBUixHQUFnQjtJQUNoQixLQUFBLE1BQUE7O01BQ0UsT0FBUSxDQUFBLENBQUEsQ0FBUixHQUFhLENBQUUsQ0FBQSxDQUFBO0lBRGpCO0VBTko7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImZvciBuYW1lIGluIFtcbiAgICAnY29udGV4dCcsXG4gICAgJ3lhbWxjb250ZXh0J1xuICBdXG4gICAgbSA9IHJlcXVpcmUoJy4vJyArIG5hbWUpXG4gICAgZXhwb3J0c1tuYW1lXSA9IG1cbiAgICBmb3IgaywgdiBvZiBtXG4gICAgICBleHBvcnRzW2tdID0gbVtrXVxuIl19
