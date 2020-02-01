(function() {
  var $$, $_, Context, YamlLoader, _$, assert, unit_;

  assert = require('chai').assert;

  ({$$, unit_, $_, _$, Context, YamlLoader} = require('./common'));

  $$ = unit_(module, $$);

  describe('YamlLoader', function() {
    return it('should work', function() {
      var c, ctx, i, len, ref, results;
      ctx = new Context();
      ctx.load(new YamlLoader($$.dataPath('cleavers.yml')));
      ref = ctx.clauses;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        results.push($$._(_$(c)));
      }
      return results;
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFtbGxvYWRlci5qcyIsInNvdXJjZXMiOlsieWFtbGxvYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUM7O0VBRXpCLENBQUEsQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsT0FBcEIsRUFBNkIsVUFBN0IsQ0FBQSxHQUEyQyxPQUFBLENBQVEsVUFBUixDQUEzQzs7RUFDQSxFQUFBLEdBQUssS0FBQSxDQUFNLE1BQU4sRUFBYyxFQUFkOztFQUVMLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFFBQUEsQ0FBQSxDQUFBO1dBQ3JCLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFFBQUEsQ0FBQSxDQUFBO0FBQ2hCLFVBQUE7TUFBQSxHQUFBLEdBQU0sSUFBSSxPQUFKLENBQUE7TUFDTixHQUFHLENBQUMsSUFBSixDQUFTLElBQUksVUFBSixDQUFlLEVBQUUsQ0FBQyxRQUFILENBQVksY0FBWixDQUFmLENBQVQ7QUFFQTtBQUFBO1dBQUEscUNBQUE7O3FCQUNFLEVBQUUsQ0FBQyxDQUFILENBQUssRUFBQSxDQUFHLENBQUgsQ0FBTDtBQURGOztJQUpnQixDQUFsQjtFQURxQixDQUF2QjtBQUxBIiwic291cmNlc0NvbnRlbnQiOlsiYXNzZXJ0ID0gcmVxdWlyZSgnY2hhaScpLmFzc2VydFxuXG57JCQsIHVuaXRfLCAkXywgXyQsIENvbnRleHQsIFlhbWxMb2FkZXJ9ID0gcmVxdWlyZSgnLi9jb21tb24nKVxuJCQgPSB1bml0XyBtb2R1bGUsICQkXG5cbmRlc2NyaWJlICdZYW1sTG9hZGVyJywgLT5cbiAgaXQgJ3Nob3VsZCB3b3JrJywgLT5cbiAgICBjdHggPSBuZXcgQ29udGV4dCgpXG4gICAgY3R4LmxvYWQgbmV3IFlhbWxMb2FkZXIoJCQuZGF0YVBhdGgoJ2NsZWF2ZXJzLnltbCcpKVxuICAgICMkJC5fIGN0eFxuICAgIGZvciBjIGluIGN0eC5jbGF1c2VzXG4gICAgICAkJC5fIF8kIGNcbiJdfQ==
