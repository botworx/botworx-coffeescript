(function() {

  /*
  Add context to the test object so it can
  be displayed in the mochawesome report

  @param {Object} test object
  @param {String|Object} context to add
       If context is an object, it must have the shape:
       {
         title: string that is used as context title in the report
         value: the context that is to be added
       }

  Usage:

  it('should test something', function () {
  someFunctionThatTestsCode()
  addContext(this, 'some context to add')
  addContext(this, {
    title: 'Expected number of something'
    value: 42
  })
  assert('something')
  })
  */
  /*
  HELPER FUNCTIONS
  */
  var ERRORS, _isValidContext, addContext, chalk, errorPrefix, isEmpty, isObject, log, stringify;

  isObject = require('lodash/isObject');

  isEmpty = require('lodash/isEmpty');

  chalk = require('chalk');

  stringify = require('json-stringify-safe');

  errorPrefix = 'Error adding context:';

  ERRORS = {
    INVALID_ARGS: `${errorPrefix} Invalid arguments.`,
    INVALID_TEST: `${errorPrefix} Invalid test object.`,
    INVALID_CONTEXT: ctx(() => {
      var expected;
      expected = "Expected a string or an object of shape { title: string, value: any } but saw:";
      return `\${errorPrefix} ${expected}\n${stringify(ctx, (function(key, val) {
        return val = val === void 0 ? 'undefined' : val;
      }), 2)}`;
    })
  };

  log = function(msg, level) {
    var logMethod, out;
    logMethod = console[level] || console.log;
    out = msg;
    if (typeof msg === 'object') {
      out = stringify(msg, null, 2);
    }
    return logMethod(`[${chalk.gray('mochawesome')}] \${out}\n`);
  };

  _isValidContext = function(ctx) {
    if (!ctx) {
      return false;
    }
    return ((typeof ctx === 'string') && !isEmpty(ctx)) || (Object.hasOwnProperty.call(ctx, 'title') && !isEmpty(ctx.title) && Object.hasOwnProperty.call(ctx, 'value'));
  };

  addContext = function(...args) {
    /*
    Context is valid, now get the test object
    If `addContext` is called from inside a `beforeEach` or `afterEach`
    the test object will be `.currentTest`, otherwise just `.test`
    */
    var ctx, test;
    // Check args to see if we should bother continuing
    if ((args.length !== 2) || !isObject(args[0])) {
      log(ERRORS.INVALID_ARGS, 'error');
      return;
    }
    ctx = args[1];
    if (!_isValidContext(ctx)) {
      log(ERRORS.INVALID_CONTEXT(ctx), 'error');
      return;
    }
    test = args[0].currentTest || args[0].test;
    if (!test) {
      log(ERRORS.INVALID_TEST, 'error');
      return;
    }
    /*
    If context is an object, and value is `undefined`
    change it to 'undefined' so it can be displayed
    correctly in the report
    */
    if (ctx.title && ctx.value === void 0) {
      ctx.value = 'undefined';
    }
    if (!test.context) {
      return test.context = ctx;
    } else if (Array.isArray(test.context)) {
      // Test has context and context is an array -> push new context
      return test.context.push(ctx);
    } else {
      /*
       Test has context and it is not an array -> make it an array,
        then push new context
      */
      test.context = [test.context];
      return test.context.push(ctx);
    }
  };

  module.exports = addContext;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC90ZXN0LmpzIiwic291cmNlcyI6WyJ1bml0L3Rlc3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBQSxNQUFBLEVBQUEsZUFBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsV0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBOztFQUFBLFFBQUEsR0FBVyxPQUFBLENBQVEsaUJBQVI7O0VBQ1gsT0FBQSxHQUFVLE9BQUEsQ0FBUSxnQkFBUjs7RUFDVixLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0VBQ1IsU0FBQSxHQUFZLE9BQUEsQ0FBUSxxQkFBUjs7RUFFWixXQUFBLEdBQWM7O0VBQ2QsTUFBQSxHQUNFO0lBQUEsWUFBQSxFQUFjLENBQUEsQ0FBQSxDQUFHLFdBQUgsQ0FBZSxtQkFBZixDQUFkO0lBQ0EsWUFBQSxFQUFjLENBQUEsQ0FBQSxDQUFHLFdBQUgsQ0FBZSxxQkFBZixDQURkO0lBRUEsZUFBQSxFQUFpQixHQUFBLENBQUksQ0FBQSxDQUFBLEdBQUE7QUFDbkIsVUFBQTtNQUFBLFFBQUEsR0FDRTtBQUNGLGFBQU8sQ0FBQSxnQkFBQSxDQUFBLENBQ1UsUUFEVixDQUNtQixFQURuQixDQUFBLENBRUwsU0FBQSxDQUFVLEdBQVYsRUFBZSxDQUFDLFFBQUEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFBO2VBQWMsR0FBQSxHQUFTLEdBQUEsS0FBTyxNQUFWLEdBQXlCLFdBQXpCLEdBQTBDO01BQTlELENBQUQsQ0FBZixFQUFvRixDQUFwRixDQUZLLENBQUE7SUFIWSxDQUFKO0VBRmpCOztFQWNGLEdBQUEsR0FBTSxRQUFBLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FBQTtBQUNKLFFBQUEsU0FBQSxFQUFBO0lBQUEsU0FBQSxHQUFZLE9BQVEsQ0FBQSxLQUFBLENBQVIsSUFBa0IsT0FBTyxDQUFDO0lBQ3RDLEdBQUEsR0FBTTtJQUNOLElBQUcsT0FBTyxHQUFQLEtBQWMsUUFBakI7TUFDRSxHQUFBLEdBQU0sU0FBQSxDQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCLENBQXJCLEVBRFI7O1dBRUEsU0FBQSxDQUFVLENBQUEsQ0FBQSxDQUFBLENBQUksS0FBSyxDQUFDLElBQU4sQ0FBVyxhQUFYLENBQUosQ0FBOEIsV0FBOUIsQ0FBVjtFQUxJOztFQU9OLGVBQUEsR0FBa0IsUUFBQSxDQUFDLEdBQUQsQ0FBQTtJQU1oQixJQUFJLENBQUMsR0FBTDtBQUFlLGFBQU8sTUFBdEI7O0FBQ0EsV0FBTyxDQUFDLENBQUMsT0FBTyxHQUFQLEtBQWMsUUFBZixDQUFBLElBQTRCLENBQUMsT0FBQSxDQUFRLEdBQVIsQ0FBOUIsQ0FBQSxJQUNMLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUF0QixDQUEyQixHQUEzQixFQUFnQyxPQUFoQyxDQUFBLElBQTRDLENBQUMsT0FBQSxDQUFRLEdBQUcsQ0FBQyxLQUFaLENBQTdDLElBQW1FLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBdEIsQ0FBMkIsR0FBM0IsRUFBZ0MsT0FBaEMsQ0FBcEU7RUFSYzs7RUFtQ2xCLFVBQUEsR0FBYSxRQUFBLENBQUEsR0FBQyxJQUFELENBQUEsRUFBQTs7Ozs7O0FBRVgsUUFBQSxHQUFBLEVBQUEsSUFBQTs7SUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUwsS0FBZSxDQUFoQixDQUFBLElBQXNCLENBQUMsUUFBQSxDQUFTLElBQUssQ0FBQSxDQUFBLENBQWQsQ0FBM0I7TUFDRSxHQUFBLENBQUksTUFBTSxDQUFDLFlBQVgsRUFBeUIsT0FBekI7QUFDQSxhQUZGOztJQUlBLEdBQUEsR0FBTSxJQUFLLENBQUEsQ0FBQTtJQUdYLElBQUksQ0FBQyxlQUFBLENBQWdCLEdBQWhCLENBQUw7TUFDRSxHQUFBLENBQUksTUFBTSxDQUFDLGVBQVAsQ0FBdUIsR0FBdkIsQ0FBSixFQUFpQyxPQUFqQztBQUNBLGFBRkY7O0lBUUEsSUFBQSxHQUFPLElBQUssQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUFSLElBQXVCLElBQUssQ0FBQSxDQUFBLENBQUUsQ0FBQztJQUV0QyxJQUFJLENBQUMsSUFBTDtNQUNFLEdBQUEsQ0FBSSxNQUFNLENBQUMsWUFBWCxFQUF5QixPQUF6QjtBQUNBLGFBRkY7S0FqQkE7Ozs7OztJQXlCQSxJQUFJLEdBQUcsQ0FBQyxLQUFKLElBQWEsR0FBRyxDQUFDLEtBQUosS0FBYSxNQUE5QjtNQUNFLEdBQUcsQ0FBQyxLQUFKLEdBQVksWUFEZDs7SUFJQSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVY7YUFDRSxJQUFJLENBQUMsT0FBTCxHQUFlLElBRGpCO0tBQUEsTUFFSyxJQUFJLEtBQUssQ0FBQyxPQUFOLENBQWMsSUFBSSxDQUFDLE9BQW5CLENBQUo7O2FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFiLENBQWtCLEdBQWxCLEVBRkc7S0FBQSxNQUFBOzs7OztNQVFILElBQUksQ0FBQyxPQUFMLEdBQWUsQ0FBRSxJQUFJLENBQUMsT0FBUDthQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixDQUFrQixHQUFsQixFQVRHOztFQWpDTTs7RUE0Q2IsTUFBTSxDQUFDLE9BQVAsR0FBaUI7QUEzR2pCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pc09iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc09iamVjdCcpXG5pc0VtcHR5ID0gcmVxdWlyZSgnbG9kYXNoL2lzRW1wdHknKVxuY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXG5zdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJylcblxuZXJyb3JQcmVmaXggPSAnRXJyb3IgYWRkaW5nIGNvbnRleHQ6J1xuRVJST1JTID1cbiAgSU5WQUxJRF9BUkdTOiBcIiN7ZXJyb3JQcmVmaXh9IEludmFsaWQgYXJndW1lbnRzLlwiXG4gIElOVkFMSURfVEVTVDogXCIje2Vycm9yUHJlZml4fSBJbnZhbGlkIHRlc3Qgb2JqZWN0LlwiXG4gIElOVkFMSURfQ09OVEVYVDogY3R4ID0+XG4gICAgZXhwZWN0ZWQgPVxuICAgICAgXCJFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBvYmplY3Qgb2Ygc2hhcGUgeyB0aXRsZTogc3RyaW5nLCB2YWx1ZTogYW55IH0gYnV0IHNhdzpcIlxuICAgIHJldHVybiBcIlwiXCJcbiAgICAke2Vycm9yUHJlZml4fSAje2V4cGVjdGVkfVxuICAgICN7c3RyaW5naWZ5KGN0eCwgKChrZXksIHZhbCkgLT4gdmFsID0gaWYgdmFsID09IHVuZGVmaW5lZCB0aGVuICd1bmRlZmluZWQnIGVsc2UgdmFsKSwgMil9XG4gICAgXCJcIlwiXG5cbiMjI1xuSEVMUEVSIEZVTkNUSU9OU1xuIyMjXG5cbmxvZyA9IChtc2csIGxldmVsKSAtPlxuICBsb2dNZXRob2QgPSBjb25zb2xlW2xldmVsXSB8fCBjb25zb2xlLmxvZ1xuICBvdXQgPSBtc2dcbiAgaWYgdHlwZW9mIG1zZyA9PSAnb2JqZWN0J1xuICAgIG91dCA9IHN0cmluZ2lmeShtc2csIG51bGwsIDIpXG4gIGxvZ01ldGhvZCBcIlsje2NoYWxrLmdyYXkoJ21vY2hhd2Vzb21lJyl9XSAke291dH1cXG5cIlxuXG5faXNWYWxpZENvbnRleHQgPSAoY3R4KSAtPlxuICAjIyNcbiAgQ29udGV4dCBpcyB2YWxpZCBpZiBhbnkgb2YgdGhlIGZvbGxvd2luZyBhcmUgdHJ1ZTpcbiAgMS4gVHlwZSBpcyBzdHJpbmcgYW5kIGl0IGlzIG5vdCBlbXB0eVxuICAyLiBUeXBlIGlzIG9iamVjdCBhbmQgaXQgaGFzIHByb3BlcnRpZXMgYHRpdGxlYCBhbmQgYHZhbHVlYCBhbmQgYHRpdGxlYCBpcyBub3QgZW1wdHlcbiAgIyMjXG4gIGlmICghY3R4KSB0aGVuIHJldHVybiBmYWxzZVxuICByZXR1cm4gKCh0eXBlb2YgY3R4ID09ICdzdHJpbmcnKSAmJiAhaXNFbXB0eShjdHgpKSB8fFxuICAgIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChjdHgsICd0aXRsZScpICYmICFpc0VtcHR5KGN0eC50aXRsZSkgJiYgT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwoY3R4LCAndmFsdWUnKSlcblxuIyMjXG5BZGQgY29udGV4dCB0byB0aGUgdGVzdCBvYmplY3Qgc28gaXQgY2FuXG5iZSBkaXNwbGF5ZWQgaW4gdGhlIG1vY2hhd2Vzb21lIHJlcG9ydFxuXG5AcGFyYW0ge09iamVjdH0gdGVzdCBvYmplY3RcbkBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29udGV4dCB0byBhZGRcbiAgICAgICBJZiBjb250ZXh0IGlzIGFuIG9iamVjdCwgaXQgbXVzdCBoYXZlIHRoZSBzaGFwZTpcbiAgICAgICB7XG4gICAgICAgICB0aXRsZTogc3RyaW5nIHRoYXQgaXMgdXNlZCBhcyBjb250ZXh0IHRpdGxlIGluIHRoZSByZXBvcnRcbiAgICAgICAgIHZhbHVlOiB0aGUgY29udGV4dCB0aGF0IGlzIHRvIGJlIGFkZGVkXG4gICAgICAgfVxuXG5Vc2FnZTpcblxuaXQoJ3Nob3VsZCB0ZXN0IHNvbWV0aGluZycsIGZ1bmN0aW9uICgpIHtcbiAgc29tZUZ1bmN0aW9uVGhhdFRlc3RzQ29kZSgpXG4gIGFkZENvbnRleHQodGhpcywgJ3NvbWUgY29udGV4dCB0byBhZGQnKVxuICBhZGRDb250ZXh0KHRoaXMsIHtcbiAgICB0aXRsZTogJ0V4cGVjdGVkIG51bWJlciBvZiBzb21ldGhpbmcnXG4gICAgdmFsdWU6IDQyXG4gIH0pXG4gIGFzc2VydCgnc29tZXRoaW5nJylcbn0pXG4jIyNcblxuYWRkQ29udGV4dCA9IChhcmdzIC4uLikgLT5cbiAgIyBDaGVjayBhcmdzIHRvIHNlZSBpZiB3ZSBzaG91bGQgYm90aGVyIGNvbnRpbnVpbmdcbiAgaWYgKChhcmdzLmxlbmd0aCAhPSAyKSB8fCAhaXNPYmplY3QoYXJnc1swXSkpXG4gICAgbG9nKEVSUk9SUy5JTlZBTElEX0FSR1MsICdlcnJvcicpXG4gICAgcmV0dXJuXG5cbiAgY3R4ID0gYXJnc1sxXVxuXG4gICMgRW5zdXJlIHRoYXQgY29udGV4dCBtZWV0cyB0aGUgcmVxdWlyZW1lbnRzXG4gIGlmICghX2lzVmFsaWRDb250ZXh0KGN0eCkpXG4gICAgbG9nKEVSUk9SUy5JTlZBTElEX0NPTlRFWFQoY3R4KSwgJ2Vycm9yJylcbiAgICByZXR1cm5cbiAgIyMjXG4gIENvbnRleHQgaXMgdmFsaWQsIG5vdyBnZXQgdGhlIHRlc3Qgb2JqZWN0XG4gIElmIGBhZGRDb250ZXh0YCBpcyBjYWxsZWQgZnJvbSBpbnNpZGUgYSBgYmVmb3JlRWFjaGAgb3IgYGFmdGVyRWFjaGBcbiAgdGhlIHRlc3Qgb2JqZWN0IHdpbGwgYmUgYC5jdXJyZW50VGVzdGAsIG90aGVyd2lzZSBqdXN0IGAudGVzdGBcbiAgIyMjXG4gIHRlc3QgPSBhcmdzWzBdLmN1cnJlbnRUZXN0IHx8IGFyZ3NbMF0udGVzdFxuXG4gIGlmICghdGVzdClcbiAgICBsb2coRVJST1JTLklOVkFMSURfVEVTVCwgJ2Vycm9yJylcbiAgICByZXR1cm5cbiAgIyMjXG4gIElmIGNvbnRleHQgaXMgYW4gb2JqZWN0LCBhbmQgdmFsdWUgaXMgYHVuZGVmaW5lZGBcbiAgY2hhbmdlIGl0IHRvICd1bmRlZmluZWQnIHNvIGl0IGNhbiBiZSBkaXNwbGF5ZWRcbiAgY29ycmVjdGx5IGluIHRoZSByZXBvcnRcbiAgIyMjXG4gIGlmIChjdHgudGl0bGUgJiYgY3R4LnZhbHVlID09IHVuZGVmaW5lZClcbiAgICBjdHgudmFsdWUgPSAndW5kZWZpbmVkJ1xuXG4gICMgVGVzdCBkb2Vzbid0IGFscmVhZHkgaGF2ZSBjb250ZXh0IC0+IHNldCBpdFxuICBpZiAoIXRlc3QuY29udGV4dClcbiAgICB0ZXN0LmNvbnRleHQgPSBjdHhcbiAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0ZXN0LmNvbnRleHQpKVxuICAgICMgVGVzdCBoYXMgY29udGV4dCBhbmQgY29udGV4dCBpcyBhbiBhcnJheSAtPiBwdXNoIG5ldyBjb250ZXh0XG4gICAgdGVzdC5jb250ZXh0LnB1c2goY3R4KVxuICBlbHNlXG4gICAgIyMjXG4gICAgIFRlc3QgaGFzIGNvbnRleHQgYW5kIGl0IGlzIG5vdCBhbiBhcnJheSAtPiBtYWtlIGl0IGFuIGFycmF5LFxuICAgICAgdGhlbiBwdXNoIG5ldyBjb250ZXh0XG4gICAgIyMjXG4gICAgdGVzdC5jb250ZXh0ID0gWyB0ZXN0LmNvbnRleHQgXVxuICAgIHRlc3QuY29udGV4dC5wdXNoKGN0eClcblxubW9kdWxlLmV4cG9ydHMgPSBhZGRDb250ZXh0XG4iXX0=
