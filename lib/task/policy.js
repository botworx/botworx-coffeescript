(function() {
  var Policy;

  Policy = class Policy {
    constructor() {
      this.parent = null;
      this.rules = [];
    }

    add(r) {
      return this.rules.push(r);
    }

    find(msg) {
      var i, len, policy, r, ref, result, rules;
      result = [];
      ref = this.rules;
      for (i = 0, len = ref.length; i < len; i++) {
        r = ref[i];
        if (r.match(msg)) {
          result.push(r);
        }
      }
      policy = this.parent;
      while (policy) {
        rules = policy.find(msg);
        result = result.concat(rules);
        policy = policy.parent;
      }
      return result;
    }

    * match(msg) {
      var i, len, m, policy, r, ref, results;
      ref = this.rules;
      for (i = 0, len = ref.length; i < len; i++) {
        r = ref[i];
        if (m = r.match(msg)) {
          yield m;
        }
      }
      policy = this.parent;
      results = [];
      while (policy) {
        yield* policy.match(msg);
        results.push(policy = policy.parent);
      }
      return results;
    }

  };

  exports.Policy = Policy;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay9wb2xpY3kuanMiLCJzb3VyY2VzIjpbInRhc2svcG9saWN5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQU0sU0FBTixNQUFBLE9BQUE7SUFDRSxXQUFhLENBQUEsQ0FBQTtNQUNYLElBQUMsQ0FBQSxNQUFELEdBQVU7TUFDVixJQUFDLENBQUEsS0FBRCxHQUFTO0lBRkU7O0lBSWIsR0FBSyxDQUFDLENBQUQsQ0FBQTthQUNILElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFZLENBQVo7SUFERzs7SUFHTCxJQUFNLENBQUMsR0FBRCxDQUFBO0FBQ0osVUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BQUEsRUFBQTtNQUFBLE1BQUEsR0FBUztBQUNUO01BQUEsS0FBQSxxQ0FBQTs7UUFDRSxJQUFHLENBQUMsQ0FBQyxLQUFGLENBQVEsR0FBUixDQUFIO1VBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFaLEVBREY7O01BREY7TUFHQSxNQUFBLEdBQVMsSUFBQyxDQUFBO0FBQ1YsYUFBTSxNQUFOO1FBQ0UsS0FBQSxHQUFRLE1BQU0sQ0FBQyxJQUFQLENBQVksR0FBWjtRQUNSLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFBUCxDQUFjLEtBQWQ7UUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDO01BSGxCO0FBSUEsYUFBTztJQVZIOztJQVlDLEVBQVAsS0FBTyxDQUFDLEdBQUQsQ0FBQTtBQUNMLFVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQTtNQUFBLEtBQUEscUNBQUE7O1FBQ0UsSUFBRyxDQUFBLEdBQUksQ0FBQyxDQUFDLEtBQUYsQ0FBUSxHQUFSLENBQVA7VUFDRSxNQUFNLEVBRFI7O01BREY7TUFHQSxNQUFBLEdBQVMsSUFBQyxDQUFBO0FBQ1Y7YUFBTSxNQUFOO1FBQ0UsT0FBVyxNQUFNLENBQUMsS0FBUCxDQUFhLEdBQWI7cUJBQ1gsTUFBQSxHQUFTLE1BQU0sQ0FBQztNQUZsQixDQUFBOztJQUxLOztFQXBCVDs7RUE2QkEsT0FBTyxDQUFDLE1BQVIsR0FBaUI7QUE3QmpCIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUG9saWN5XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBwYXJlbnQgPSBudWxsXG4gICAgQHJ1bGVzID0gW11cblxuICBhZGQ6IChyKSAtPlxuICAgIEBydWxlcy5wdXNoKHIpXG5cbiAgZmluZDogKG1zZykgLT5cbiAgICByZXN1bHQgPSBbXVxuICAgIGZvciByIGluIEBydWxlc1xuICAgICAgaWYgci5tYXRjaChtc2cpXG4gICAgICAgIHJlc3VsdC5wdXNoKHIpXG4gICAgcG9saWN5ID0gQHBhcmVudFxuICAgIHdoaWxlIHBvbGljeVxuICAgICAgcnVsZXMgPSBwb2xpY3kuZmluZChtc2cpXG4gICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHJ1bGVzKVxuICAgICAgcG9saWN5ID0gcG9saWN5LnBhcmVudFxuICAgIHJldHVybiByZXN1bHRcblxuICBtYXRjaDogKG1zZykgLT5cbiAgICBmb3IgciBpbiBAcnVsZXNcbiAgICAgIGlmIG0gPSByLm1hdGNoKG1zZylcbiAgICAgICAgeWllbGQgbVxuICAgIHBvbGljeSA9IEBwYXJlbnRcbiAgICB3aGlsZSBwb2xpY3lcbiAgICAgIHlpZWxkIGZyb20gcG9saWN5Lm1hdGNoKG1zZylcbiAgICAgIHBvbGljeSA9IHBvbGljeS5wYXJlbnRcblxuZXhwb3J0cy5Qb2xpY3kgPSBQb2xpY3lcbiJdfQ==
