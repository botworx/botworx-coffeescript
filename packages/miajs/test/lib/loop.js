(function() {
  var $$, assert, method_, runner_, runtime, unit_;

  assert = require('chai').assert;

  ({unit_, runtime} = require('./common'));

  $$ = unit_(module);

  ({method_, runner_} = runtime);

  describe('Loop', function() {
    return describe('@action', function() {
      return it('should work', function() {
        var t1;
        t1 = method_(function() {
          return this.loop(function() {
            return this.task(function() {
              $$._("Hello");
              this.count = 10;
              return this.main = function() {
                $$._(this.count--);
                if (this.count <= 0) {
                  $$._('Inner');
                  return this.fail();
                }
              };
            }).task(function() {
              return $$._("Loop");
            });
          });
        });
        return runner_().run(t1);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcC5qcyIsInNvdXJjZXMiOlsibG9vcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEVBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUE7O0VBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQzs7RUFDekIsQ0FBQSxDQUFDLEtBQUQsRUFBUSxPQUFSLENBQUEsR0FBbUIsT0FBQSxDQUFRLFVBQVIsQ0FBbkI7O0VBQ0EsRUFBQSxHQUFLLEtBQUEsQ0FBTSxNQUFOOztFQUNMLENBQUEsQ0FBQyxPQUFELEVBQVUsT0FBVixDQUFBLEdBQXFCLE9BQXJCOztFQUVBLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFFBQUEsQ0FBQSxDQUFBO1dBQ2YsUUFBQSxDQUFTLFNBQVQsRUFBb0IsUUFBQSxDQUFBLENBQUE7YUFDbEIsRUFBQSxDQUFHLGFBQUgsRUFBa0IsUUFBQSxDQUFBLENBQUE7QUFDaEIsWUFBQTtRQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsUUFBQSxDQUFBLENBQUE7aUJBQ1gsSUFBQyxDQUFBLElBQUQsQ0FBTSxRQUFBLENBQUEsQ0FBQTttQkFDSixJQUFDLENBQUEsSUFBRCxDQUFNLFFBQUEsQ0FBQSxDQUFBO2NBQ0osRUFBRSxDQUFDLENBQUgsQ0FBSyxPQUFMO2NBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztxQkFDVCxJQUFDLENBQUEsSUFBRCxHQUFRLFFBQUEsQ0FBQSxDQUFBO2dCQUNOLEVBQUUsQ0FBQyxDQUFILENBQUssSUFBQyxDQUFBLEtBQUQsRUFBTDtnQkFDQSxJQUFHLElBQUMsQ0FBQSxLQUFELElBQVUsQ0FBYjtrQkFDRSxFQUFFLENBQUMsQ0FBSCxDQUFLLE9BQUw7eUJBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQUZGOztjQUZNO1lBSEosQ0FBTixDQVFBLENBQUMsSUFSRCxDQVFNLFFBQUEsQ0FBQSxDQUFBO3FCQUNKLEVBQUUsQ0FBQyxDQUFILENBQUssTUFBTDtZQURJLENBUk47VUFESSxDQUFOO1FBRFcsQ0FBUjtlQWFMLE9BQUEsQ0FBQSxDQUFTLENBQUMsR0FBVixDQUFjLEVBQWQ7TUFkZ0IsQ0FBbEI7SUFEa0IsQ0FBcEI7RUFEZSxDQUFqQjtBQUxBIiwic291cmNlc0NvbnRlbnQiOlsiYXNzZXJ0ID0gcmVxdWlyZSgnY2hhaScpLmFzc2VydFxue3VuaXRfLCBydW50aW1lfSA9IHJlcXVpcmUoJy4vY29tbW9uJylcbiQkID0gdW5pdF8gbW9kdWxlXG57bWV0aG9kXywgcnVubmVyX30gPSBydW50aW1lXG5cbmRlc2NyaWJlICdMb29wJywgLT5cbiAgZGVzY3JpYmUgJ0BhY3Rpb24nLCAtPlxuICAgIGl0ICdzaG91bGQgd29yaycsIC0+XG4gICAgICB0MSA9IG1ldGhvZF8gLT5cbiAgICAgICAgQGxvb3AgLT5cbiAgICAgICAgICBAdGFzayAtPlxuICAgICAgICAgICAgJCQuXyBcIkhlbGxvXCJcbiAgICAgICAgICAgIEBjb3VudCA9IDEwXG4gICAgICAgICAgICBAbWFpbiA9IC0+XG4gICAgICAgICAgICAgICQkLl8gQGNvdW50LS1cbiAgICAgICAgICAgICAgaWYoQGNvdW50IDw9IDApXG4gICAgICAgICAgICAgICAgJCQuXygnSW5uZXInKVxuICAgICAgICAgICAgICAgIEBmYWlsKClcbiAgICAgICAgICAudGFzayAtPlxuICAgICAgICAgICAgJCQuXyhcIkxvb3BcIilcblxuICAgICAgcnVubmVyXygpLnJ1biB0MVxuIl19