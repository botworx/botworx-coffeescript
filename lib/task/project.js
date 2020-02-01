(function() {
  var Project, Runner, Sourcer, TS_FAILURE, Task, Workspace, build, buildProject, buildTasks, buildWorkspace, builders, glob;

  glob = require('glob');

  ({Task, TS_FAILURE} = require('./task'));

  ({Runner} = require('./runner'));

  Project = class Project extends Runner {
    constructor(action) {
      super(action);
    }

    add(child) {
      return super.add(child);
    }

    //child.project = this
    config(cfg) {
      var i, j, k, len, len1, r, t, v;
      for (k in cfg) {
        v = cfg[k];
        switch (k) {
          case 'tasks':
            for (i = 0, len = v.length; i < len; i++) {
              t = v[i];
              this.add(t);
            }
            break;
          case 'rules':
            for (j = 0, len1 = v.length; j < len1; j++) {
              r = v[j];
              this.addRule(r);
            }
            break;
          default:
            this[k] = v;
        }
      }
      return this;
    }

    init() {
      var child, i, len, ref;
      super.init();
      ref = this.tasks;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        this.schedule(child);
      }
      return this.status;
    }

    strategy(child) {
      this.remove(child);
      if (child.status === TS_FAILURE) {
        return this.fail();
      }
      //else
      return this.resume();
    }

  };

  exports.project_ = function(cfg, action) {
    return new Project(action).config(cfg);
  };

  Workspace = class Workspace extends Project {
    constructor(action) {
      super(action);
    }

    add(child) {
      return super.add(child);
    }

  };

  //child.workspace = this
  exports.workspace_ = function(cfg, action) {
    return new Workspace(action).config(cfg);
  };

  Sourcer = class Sourcer extends Task {
    constructor(fn1) {
      super();
      this.fn = fn1;
    }

    init() {
      var options, pattern;
      options = {};
      pattern = this.rnr.files;
      return glob(pattern, options, (er, sources) => {
        var i, len, results, src;
        results = [];
        for (i = 0, len = sources.length; i < len; i++) {
          src = sources[i];
          results.push(this.fn(src));
        }
        return results;
      });
    }

  };

  exports.sourcer_ = function(fn) {
    return new Sourcer(fn);
  };

  buildWorkspace = function(builders, cfg) {
    var k, product, v;
    product = new Workspace;
    for (k in cfg) {
      v = cfg[k];
      product[k] = build(builders, v);
    }
    return product;
  };

  buildProject = function(builders, cfg) {
    var k, product, v;
    product = new Project;
    for (k in cfg) {
      v = cfg[k];
      product[k] = build(builders, v);
    }
    return product;
  };

  buildTasks = function(builders, arr) {
    var i, len, product, v;
    product = [];
    for (i = 0, len = arr.length; i < len; i++) {
      v = arr[i];
      if (v instanceof Task) {
        product.push(v);
      } else {
        product.push(build(builders, v));
      }
    }
    return product;
  };

  builders = {
    workspace: buildWorkspace,
    project: buildProject,
    tasks: buildTasks
  };

  build = function(builders, cfg) {
    var builder, k, product, v;
    product = {};
    for (k in cfg) {
      v = cfg[k];
      builder = builders[k];
      if (builder) {
        product[k] = builder(builders, v);
      } else {
        product[k] = v;
      }
    }
    return product;
  };

  exports.build = build;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay9wcm9qZWN0LmpzIiwic291cmNlcyI6WyJ0YXNrL3Byb2plY3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUEsWUFBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsUUFBQSxFQUFBOztFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFFUCxDQUFBLENBQUMsSUFBRCxFQUFPLFVBQVAsQ0FBQSxHQUFxQixPQUFBLENBQVEsUUFBUixDQUFyQjs7RUFDQSxDQUFBLENBQUMsTUFBRCxDQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVIsQ0FBWDs7RUFFTSxVQUFOLE1BQUEsUUFBQSxRQUFzQixPQUF0QjtJQUNFLFdBQWEsQ0FBQyxNQUFELENBQUE7V0FDWCxDQUFNLE1BQU47SUFEVzs7SUFFYixHQUFLLENBQUMsS0FBRCxDQUFBO2tCQUFMLENBQUEsR0FDRSxDQUFNLEtBQU47SUFERyxDQUZMOzs7SUFNQSxNQUFRLENBQUMsR0FBRCxDQUFBO0FBQ04sVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7TUFBQSxLQUFBLFFBQUE7O0FBQ0UsZ0JBQU8sQ0FBUDtBQUFBLGVBQ08sT0FEUDtZQUVJLEtBQUEsbUNBQUE7O2NBQ0UsSUFBQyxDQUFBLEdBQUQsQ0FBSyxDQUFMO1lBREY7QUFERztBQURQLGVBSU8sT0FKUDtZQUtJLEtBQUEscUNBQUE7O2NBQ0UsSUFBQyxDQUFBLE9BQUQsQ0FBUyxDQUFUO1lBREY7QUFERztBQUpQO1lBUUksSUFBSyxDQUFBLENBQUEsQ0FBTCxHQUFVO0FBUmQ7TUFERjtBQVVBLGFBQU87SUFYRDs7SUFhUixJQUFNLENBQUEsQ0FBQTtBQUNKLFVBQUEsS0FBQSxFQUFBLENBQUEsRUFBQSxH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QUEsRUFBVyxjQUFYO0lBQ0EsT0FBQSxFQUFTLFlBRFQ7SUFFQSxLQUFBLEVBQU87RUFGUDs7RUFJRixLQUFBLEdBQVEsUUFBQSxDQUFDLFFBQUQsRUFBVyxHQUFYLENBQUE7QUFDTixRQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsT0FBQSxFQUFBO0lBQUEsT0FBQSxHQUFVLENBQUE7SUFDVixLQUFBLFFBQUE7O01BQ0UsT0FBQSxHQUFVLFFBQVMsQ0FBQSxDQUFBO01BQ25CLElBQUcsT0FBSDtRQUNFLE9BQVEsQ0FBQSxDQUFBLENBQVIsR0FBYSxPQUFBLENBQVEsUUFBUixFQUFrQixDQUFsQixFQURmO09BQUEsTUFBQTtRQUdFLE9BQVEsQ0FBQSxDQUFBLENBQVIsR0FBYSxFQUhmOztJQUZGO0FBTUEsV0FBTztFQVJEOztFQVVSLE9BQU8sQ0FBQyxLQUFSLEdBQWdCO0FBakdoQiIsInNvdXJjZXNDb250ZW50IjpbImdsb2IgPSByZXF1aXJlICdnbG9iJ1xuXG57VGFzaywgVFNfRkFJTFVSRX0gPSByZXF1aXJlICcuL3Rhc2snXG57UnVubmVyfSA9IHJlcXVpcmUgJy4vcnVubmVyJ1xuXG5jbGFzcyBQcm9qZWN0IGV4dGVuZHMgUnVubmVyXG4gIGNvbnN0cnVjdG9yOiAoYWN0aW9uKSAtPlxuICAgIHN1cGVyKGFjdGlvbilcbiAgYWRkOiAoY2hpbGQpIC0+XG4gICAgc3VwZXIoY2hpbGQpXG4gICAgI2NoaWxkLnByb2plY3QgPSB0aGlzXG5cbiAgY29uZmlnOiAoY2ZnKSAtPlxuICAgIGZvciBrLCB2IG9mIGNmZ1xuICAgICAgc3dpdGNoIGtcbiAgICAgICAgd2hlbiAndGFza3MnXG4gICAgICAgICAgZm9yIHQgaW4gdlxuICAgICAgICAgICAgQGFkZCB0XG4gICAgICAgIHdoZW4gJ3J1bGVzJ1xuICAgICAgICAgIGZvciByIGluIHZcbiAgICAgICAgICAgIEBhZGRSdWxlIHJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXNba10gPSB2XG4gICAgcmV0dXJuIHRoaXNcblxuICBpbml0OiAtPlxuICAgIHN1cGVyKClcbiAgICBmb3IgY2hpbGQgaW4gQHRhc2tzXG4gICAgICBAc2NoZWR1bGUoY2hpbGQpXG4gICAgcmV0dXJuIEBzdGF0dXNcblxuICBzdHJhdGVneTogKGNoaWxkKSAtPlxuICAgIEByZW1vdmUgY2hpbGRcbiAgICBpZihjaGlsZC5zdGF0dXMgPT0gVFNfRkFJTFVSRSlcbiAgICAgIHJldHVybiBAZmFpbCgpXG4gICAgI2Vsc2VcbiAgICBAcmVzdW1lKClcblxuZXhwb3J0cy5wcm9qZWN0XyA9IChjZmcsIGFjdGlvbikgLT4gcmV0dXJuIG5ldyBQcm9qZWN0KGFjdGlvbikuY29uZmlnKGNmZylcblxuY2xhc3MgV29ya3NwYWNlIGV4dGVuZHMgUHJvamVjdFxuICBjb25zdHJ1Y3RvcjogKGFjdGlvbikgLT5cbiAgICBzdXBlcihhY3Rpb24pXG4gIGFkZDogKGNoaWxkKSAtPlxuICAgIHN1cGVyKGNoaWxkKVxuICAgICNjaGlsZC53b3Jrc3BhY2UgPSB0aGlzXG5cbmV4cG9ydHMud29ya3NwYWNlXyA9IChjZmcsIGFjdGlvbikgLT4gcmV0dXJuIG5ldyBXb3Jrc3BhY2UoYWN0aW9uKS5jb25maWcoY2ZnKVxuXG5jbGFzcyBTb3VyY2VyIGV4dGVuZHMgVGFza1xuICBjb25zdHJ1Y3RvcjogKEBmbikgLT5cbiAgICBzdXBlcigpXG4gIGluaXQ6IC0+XG4gICAgb3B0aW9ucyA9IHt9XG4gICAgcGF0dGVybiA9IEBybnIuZmlsZXNcbiAgICBnbG9iIHBhdHRlcm4sIG9wdGlvbnMsIChlciwgc291cmNlcykgPT5cbiAgICAgIGZvciBzcmMgaW4gc291cmNlc1xuICAgICAgICBAZm4oc3JjKVxuXG5leHBvcnRzLnNvdXJjZXJfID0gKGZuKSAtPiByZXR1cm4gbmV3IFNvdXJjZXIgZm5cblxuYnVpbGRXb3Jrc3BhY2UgPSAoYnVpbGRlcnMsIGNmZykgLT5cbiAgcHJvZHVjdCA9IG5ldyBXb3Jrc3BhY2VcbiAgZm9yIGssIHYgb2YgY2ZnXG4gICAgcHJvZHVjdFtrXSA9IGJ1aWxkKGJ1aWxkZXJzLCB2KVxuICByZXR1cm4gcHJvZHVjdFxuXG5idWlsZFByb2plY3QgPSAoYnVpbGRlcnMsIGNmZykgLT5cbiAgcHJvZHVjdCA9IG5ldyBQcm9qZWN0XG4gIGZvciBrLCB2IG9mIGNmZ1xuICAgIHByb2R1Y3Rba10gPSBidWlsZChidWlsZGVycywgdilcbiAgcmV0dXJuIHByb2R1Y3RcblxuYnVpbGRUYXNrcyA9IChidWlsZGVycywgYXJyKSAtPlxuICBwcm9kdWN0ID0gW11cbiAgZm9yIHYgaW4gYXJyXG4gICAgaWYgdiBpbnN0YW5jZW9mIFRhc2tcbiAgICAgIHByb2R1Y3QucHVzaCB2XG4gICAgZWxzZVxuICAgICAgcHJvZHVjdC5wdXNoKGJ1aWxkKGJ1aWxkZXJzLCB2KSlcbiAgcmV0dXJuIHByb2R1Y3RcblxuYnVpbGRlcnMgPVxuICB3b3Jrc3BhY2U6IGJ1aWxkV29ya3NwYWNlXG4gIHByb2plY3Q6IGJ1aWxkUHJvamVjdFxuICB0YXNrczogYnVpbGRUYXNrc1xuXG5idWlsZCA9IChidWlsZGVycywgY2ZnKSAtPlxuICBwcm9kdWN0ID0ge31cbiAgZm9yIGssIHYgb2YgY2ZnXG4gICAgYnVpbGRlciA9IGJ1aWxkZXJzW2tdXG4gICAgaWYgYnVpbGRlclxuICAgICAgcHJvZHVjdFtrXSA9IGJ1aWxkZXIoYnVpbGRlcnMsIHYpXG4gICAgZWxzZVxuICAgICAgcHJvZHVjdFtrXSA9IHZcbiAgcmV0dXJuIHByb2R1Y3RcblxuZXhwb3J0cy5idWlsZCA9IGJ1aWxkXG4iXX0=
