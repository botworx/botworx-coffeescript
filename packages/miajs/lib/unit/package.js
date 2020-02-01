(function() {
  var Package, Unit, glob, package_, path, stringify, unit_, winston;

  path = require('path');

  glob = require('glob');

  winston = require('winston');

  stringify = require('json-stringify-safe');

  
  ({unit_, Unit} = require('./unit'));

  /*
  This has a lot of commonality with Project.  Merge?
  */
  Package = class Package extends Unit {
    constructor(parent) {
      super(parent);
    }

    inject(k, v) {
      switch (k) {
        case 'blah':
          return this.log('blah');
        default:
          return super.inject(k, v);
      }
    }

  };

  exports.Package = Package;

  exports.package_ = package_ = function(cfg, parent) {
    return new Package(parent).config(cfg);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC9wYWNrYWdlLmpzIiwic291cmNlcyI6WyJ1bml0L3BhY2thZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUE7O0VBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVI7O0VBQ1YsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUjs7O0VBRVosQ0FBQSxDQUFDLEtBQUQsRUFBUSxJQUFSLENBQUEsR0FBZ0IsT0FBQSxDQUFRLFFBQVIsQ0FBaEIsRUFMQTs7Ozs7RUFTTSxVQUFOLE1BQUEsUUFBQSxRQUFzQixLQUF0QjtJQUNFLFdBQWEsQ0FBQyxNQUFELENBQUE7V0FDWCxDQUFNLE1BQU47SUFEVzs7SUFFYixNQUFRLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBQTtBQUNOLGNBQU8sQ0FBUDtBQUFBLGFBQ08sTUFEUDtpQkFFSSxJQUFDLENBQUEsR0FBRCxDQUFLLE1BQUw7QUFGSjtzQkFERixDQUFBLE1BS00sQ0FBTSxDQUFOLEVBQVMsQ0FBVDtBQUpKO0lBRE07O0VBSFY7O0VBVUEsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0VBQ2xCLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQUEsR0FBVyxRQUFBLENBQUMsR0FBRCxFQUFNLE1BQU4sQ0FBQTtBQUFpQixXQUFPLElBQUksT0FBSixDQUFZLE1BQVosQ0FBbUIsQ0FBQyxNQUFwQixDQUEyQixHQUEzQjtFQUF4QjtBQXBCOUIiLCJzb3VyY2VzQ29udGVudCI6WyJwYXRoID0gcmVxdWlyZSAncGF0aCdcbmdsb2IgPSByZXF1aXJlICdnbG9iJ1xud2luc3RvbiA9IHJlcXVpcmUgJ3dpbnN0b24nXG5zdHJpbmdpZnkgPSByZXF1aXJlICdqc29uLXN0cmluZ2lmeS1zYWZlJ1xuI1xue3VuaXRfLCBVbml0fSA9IHJlcXVpcmUgJy4vdW5pdCdcbiMjI1xuVGhpcyBoYXMgYSBsb3Qgb2YgY29tbW9uYWxpdHkgd2l0aCBQcm9qZWN0LiAgTWVyZ2U/XG4jIyNcbmNsYXNzIFBhY2thZ2UgZXh0ZW5kcyBVbml0XG4gIGNvbnN0cnVjdG9yOiAocGFyZW50KS0+XG4gICAgc3VwZXIocGFyZW50KVxuICBpbmplY3Q6IChrLCB2KSAtPlxuICAgIHN3aXRjaCBrXG4gICAgICB3aGVuICdibGFoJ1xuICAgICAgICBAbG9nICdibGFoJ1xuICAgICAgZWxzZVxuICAgICAgICBzdXBlcihrLCB2KVxuXG5leHBvcnRzLlBhY2thZ2UgPSBQYWNrYWdlXG5leHBvcnRzLnBhY2thZ2VfID0gcGFja2FnZV8gPSAoY2ZnLCBwYXJlbnQpIC0+IHJldHVybiBuZXcgUGFja2FnZShwYXJlbnQpLmNvbmZpZyhjZmcpXG4iXX0=
