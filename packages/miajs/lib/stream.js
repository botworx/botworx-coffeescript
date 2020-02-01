(function() {
  var Stringer, stream;

  stream = require('stream');

  Stringer = class Stringer extends stream.Writable {
    constructor() {
      super();
      this.chunks = [];
    }

    toString() {
      return this.chunks.join('');
    }

    _write(chunk, encoding, done) {
      this.chunks.push(chunk);
      return done();
    }

  };

  exports.Stringer = Stringer;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLmpzIiwic291cmNlcyI6WyJzdHJlYW0uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxRQUFBLEVBQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztFQUVILFdBQU4sTUFBQSxTQUFBLFFBQXVCLE1BQU0sQ0FBQyxTQUE5QjtJQUNFLFdBQWEsQ0FBQSxDQUFBO1dBQ1gsQ0FBQTtNQUNBLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFGQzs7SUFHYixRQUFVLENBQUEsQ0FBQTtBQUNSLGFBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsRUFBYjtJQURDOztJQUVWLE1BQVEsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixJQUFsQixDQUFBO01BQ04sSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsS0FBYjthQUNBLElBQUEsQ0FBQTtJQUZNOztFQU5WOztFQVVBLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0FBWm5CIiwic291cmNlc0NvbnRlbnQiOlsic3RyZWFtID0gcmVxdWlyZSAnc3RyZWFtJ1xuXG5jbGFzcyBTdHJpbmdlciBleHRlbmRzIHN0cmVhbS5Xcml0YWJsZVxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlcigpXG4gICAgQGNodW5rcyA9IFtdXG4gIHRvU3RyaW5nOiAtPlxuICAgIHJldHVybiBAY2h1bmtzLmpvaW4oJycpXG4gIF93cml0ZTogKGNodW5rLCBlbmNvZGluZywgZG9uZSkgLT5cbiAgICBAY2h1bmtzLnB1c2ggY2h1bmtcbiAgICBkb25lKClcblxuZXhwb3J0cy5TdHJpbmdlciA9IFN0cmluZ2VyXG4iXX0=
