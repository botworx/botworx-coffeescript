(function() {

  /*
  This has a lot of commonality with Project.  Merge?
  */
  var Module, Unit, glob, path, unit_, winston;

  path = require('path');

  glob = require('glob');

  winston = require('winston');

  ({Module} = require('module'));

  Unit = (function() {
    class Unit {
      constructor(parent1) {
        this.parent = parent1;
        this.exports = null;
        this.units = [];
        this.logger = console;
        this.loggers = [];
      }

      /*
      @logger = new winston.Logger
        level: 'silly',
        transports: [
          new winston.transports.Console()
        ]
      */
      toJSON() {
        return {
          filename: this.filename
        };
      }

      inject(k, v) {
        switch (k) {
          case 'module':
            this.module = v;
            this.filename = this.module.filename;
            this.dirname = path.dirname(this.filename);
            return this.basename = path.basename(this.filename);
          default:
            return this[k] = v;
        }
      }

      config(cfg) {
        var k, v;
        if (cfg instanceof Module) {
          cfg = {
            module: cfg
          };
        }
        for (k in cfg) {
          v = cfg[k];
          this.inject(k, v);
        }
        return this;
      }

      add(child) {
        return this.units.push(child);
      }

      pushLogger(logger) {
        this.loggers.push(this.logger);
        return this.logger = logger;
      }

      popLogger() {
        return this.logger = this.loggers.pop();
      }

      log(txt) {
        return this.logInfo(txt);
      }

      _(txt) {
        return this.logInfo(txt);
      }

      logInfo(txt) {
        return this.logger.info(txt);
      }

      $(text) {
        return this.debug(text);
      }

    };

    
    Unit.prototype.stringify = require('json-stringify-safe');

    Unit.prototype.debug = require('debug')('miajs');

    return Unit;

  }).call(this);

  exports.Unit = Unit;

  exports.unit_ = unit_ = function(cfg, parent) {
    return new Unit(parent).config(cfg);
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC91bml0LmpzIiwic291cmNlcyI6WyJ1bml0L3VuaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7Ozs7TUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBOztFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ1AsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztFQUNWLENBQUEsQ0FBQyxNQUFELENBQUEsR0FBVyxPQUFBLENBQVEsUUFBUixDQUFYOztFQUlNO0lBQU4sTUFBQSxLQUFBO01BQ0UsV0FBYSxRQUFBLENBQUE7UUFBQyxJQUFDLENBQUE7UUFDYixJQUFDLENBQUEsT0FBRCxHQUFXO1FBQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUztRQUNULElBQUMsQ0FBQSxNQUFELEdBQVU7UUFDVixJQUFDLENBQUEsT0FBRCxHQUFXO01BSkEsQ0FBYjs7Ozs7Ozs7O01BWUEsTUFBUSxDQUFBLENBQUE7ZUFDTjtVQUFBLFFBQUEsRUFBVSxJQUFDLENBQUE7UUFBWDtNQURNOztNQUVSLE1BQVEsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFBO0FBQ04sZ0JBQU8sQ0FBUDtBQUFBLGVBQ08sUUFEUDtZQUVJLElBQUMsQ0FBQSxNQUFELEdBQVU7WUFDVixJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxNQUFNLENBQUM7WUFDcEIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUMsQ0FBQSxRQUFkO21CQUNYLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBSSxDQUFDLFFBQUwsQ0FBYyxJQUFDLENBQUEsUUFBZjtBQUxoQjttQkFPSSxJQUFLLENBQUEsQ0FBQSxDQUFMLEdBQVU7QUFQZDtNQURNOztNQVNSLE1BQVEsQ0FBQyxHQUFELENBQUE7QUFDTixZQUFBLENBQUEsRUFBQTtRQUFBLElBQUcsR0FBQSxZQUFlLE1BQWxCO1VBQThCLEdBQUEsR0FBTTtZQUFDLE1BQUEsRUFBUTtVQUFULEVBQXBDOztRQUNBLEtBQUEsUUFBQTs7VUFDRSxJQUFDLENBQUEsTUFBRCxDQUFRLENBQVIsRUFBVyxDQUFYO1FBREY7QUFFQSxlQUFPO01BSkQ7O01BS1IsR0FBSyxDQUFDLEtBQUQsQ0FBQTtlQUNILElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLEtBQVo7TUFERzs7TUFFTCxVQUFZLENBQUMsTUFBRCxDQUFBO1FBQ1YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBQyxDQUFBLE1BQWY7ZUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVO01BRkE7O01BR1osU0FBVyxDQUFBLENBQUE7ZUFDVCxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsR0FBVCxDQUFBO01BREQ7O01BRVgsR0FBSyxDQUFDLEdBQUQsQ0FBQTtlQUNILElBQUMsQ0FBQSxPQUFELENBQVMsR0FBVDtNQURHOztNQUVMLENBQUcsQ0FBQyxHQUFELENBQUE7ZUFDRCxJQUFDLENBQUEsT0FBRCxDQUFTLEdBQVQ7TUFEQzs7TUFFSCxPQUFTLENBQUMsR0FBRCxDQUFBO2VBQ1AsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWEsR0FBYjtNQURPOztNQUtULENBQUcsQ0FBQyxJQUFELENBQUE7ZUFBVSxJQUFDLENBQUEsS0FBRCxDQUFPLElBQVA7TUFBVjs7SUE3Q0w7OzttQkEyQ0UsU0FBQSxHQUFXLE9BQUEsQ0FBUSxxQkFBUjs7bUJBQ1gsS0FBQSxHQUFPLE9BQUEsQ0FBUSxPQUFSLENBQUEsQ0FBaUIsT0FBakI7Ozs7OztFQUdULE9BQU8sQ0FBQyxJQUFSLEdBQWU7O0VBQ2YsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsS0FBQSxHQUFRLFFBQUEsQ0FBQyxHQUFELEVBQU0sTUFBTixDQUFBO0FBQWlCLFdBQU8sSUFBSSxJQUFKLENBQVMsTUFBVCxDQUFnQixDQUFDLE1BQWpCLENBQXdCLEdBQXhCO0VBQXhCO0FBdkR4QiIsInNvdXJjZXNDb250ZW50IjpbInBhdGggPSByZXF1aXJlICdwYXRoJ1xuZ2xvYiA9IHJlcXVpcmUgJ2dsb2InXG53aW5zdG9uID0gcmVxdWlyZSAnd2luc3RvbidcbntNb2R1bGV9ID0gcmVxdWlyZSAnbW9kdWxlJ1xuIyMjXG5UaGlzIGhhcyBhIGxvdCBvZiBjb21tb25hbGl0eSB3aXRoIFByb2plY3QuICBNZXJnZT9cbiMjI1xuY2xhc3MgVW5pdFxuICBjb25zdHJ1Y3RvcjogKEBwYXJlbnQpIC0+XG4gICAgQGV4cG9ydHMgPSBudWxsXG4gICAgQHVuaXRzID0gW11cbiAgICBAbG9nZ2VyID0gY29uc29sZVxuICAgIEBsb2dnZXJzID0gW11cbiAgICAjIyNcbiAgICBAbG9nZ2VyID0gbmV3IHdpbnN0b24uTG9nZ2VyXG4gICAgICBsZXZlbDogJ3NpbGx5JyxcbiAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKClcbiAgICAgIF1cbiAgICAjIyNcbiAgdG9KU09OOiAtPlxuICAgIGZpbGVuYW1lOiBAZmlsZW5hbWVcbiAgaW5qZWN0OiAoaywgdikgLT5cbiAgICBzd2l0Y2gga1xuICAgICAgd2hlbiAnbW9kdWxlJ1xuICAgICAgICBAbW9kdWxlID0gdlxuICAgICAgICBAZmlsZW5hbWUgPSBAbW9kdWxlLmZpbGVuYW1lXG4gICAgICAgIEBkaXJuYW1lID0gcGF0aC5kaXJuYW1lKEBmaWxlbmFtZSlcbiAgICAgICAgQGJhc2VuYW1lID0gcGF0aC5iYXNlbmFtZShAZmlsZW5hbWUpXG4gICAgICBlbHNlXG4gICAgICAgIHRoaXNba10gPSB2XG4gIGNvbmZpZzogKGNmZykgLT5cbiAgICBpZiBjZmcgaW5zdGFuY2VvZiBNb2R1bGUgdGhlbiBjZmcgPSB7bW9kdWxlOiBjZmd9XG4gICAgZm9yIGssIHYgb2YgY2ZnXG4gICAgICBAaW5qZWN0IGssIHZcbiAgICByZXR1cm4gdGhpc1xuICBhZGQ6IChjaGlsZCkgLT5cbiAgICBAdW5pdHMucHVzaCBjaGlsZFxuICBwdXNoTG9nZ2VyOiAobG9nZ2VyKSAtPlxuICAgIEBsb2dnZXJzLnB1c2ggQGxvZ2dlclxuICAgIEBsb2dnZXIgPSBsb2dnZXJcbiAgcG9wTG9nZ2VyOiAtPlxuICAgIEBsb2dnZXIgPSBAbG9nZ2Vycy5wb3AoKVxuICBsb2c6ICh0eHQpIC0+XG4gICAgQGxvZ0luZm8odHh0KVxuICBfOiAodHh0KSAtPlxuICAgIEBsb2dJbmZvKHR4dClcbiAgbG9nSW5mbzogKHR4dCkgLT5cbiAgICBAbG9nZ2VyLmluZm8gdHh0XG4gICNcbiAgc3RyaW5naWZ5OiByZXF1aXJlICdqc29uLXN0cmluZ2lmeS1zYWZlJ1xuICBkZWJ1ZzogcmVxdWlyZSgnZGVidWcnKSgnbWlhanMnKVxuICAkOiAodGV4dCkgLT4gQGRlYnVnIHRleHRcblxuZXhwb3J0cy5Vbml0ID0gVW5pdFxuZXhwb3J0cy51bml0XyA9IHVuaXRfID0gKGNmZywgcGFyZW50KSAtPiByZXR1cm4gbmV3IFVuaXQocGFyZW50KS5jb25maWcoY2ZnKVxuIl19
