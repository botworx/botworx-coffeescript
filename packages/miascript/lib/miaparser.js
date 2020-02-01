(function() {
  var MiaParser, grammar;

  grammar = require('./grammar');

  MiaParser = class MiaParser extends grammar.Parser {
    constructor(lexer, yy) {
      super();
      this.lexer = lexer;
      this.yy = yy;
    }

    parse(code, options) {
      return super.parse(code);
    }

    parseError(str, hash) {
      console.log(str);
      console.log(hash);
      throw new Error('Parse Error');
    }

  };

  exports.MiaParser = MiaParser;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlhcGFyc2VyLmpzIiwic291cmNlcyI6WyJtaWFwYXJzZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxTQUFBLEVBQUE7O0VBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSOztFQUVKLFlBQU4sTUFBQSxVQUFBLFFBQXdCLE9BQU8sQ0FBQyxPQUFoQztJQUNFLFdBQWEsTUFBQSxJQUFBLENBQUE7O01BQUMsSUFBQyxDQUFBO01BQU8sSUFBQyxDQUFBO0lBQVY7O0lBRWIsS0FBTyxDQUFDLElBQUQsRUFBTyxPQUFQLENBQUE7a0JBQVAsQ0FBQSxLQUNFLENBQU0sSUFBTjtJQURLOztJQUVQLFVBQVksQ0FBQyxHQUFELEVBQU0sSUFBTixDQUFBO01BQ1YsT0FBTyxDQUFDLEdBQVIsQ0FBWSxHQUFaO01BQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO01BQ0EsTUFBTSxJQUFJLEtBQUosQ0FBVSxhQUFWO0lBSEk7O0VBTGQ7O0VBVUEsT0FBTyxDQUFDLFNBQVIsR0FBb0I7QUFacEIiLCJzb3VyY2VzQ29udGVudCI6WyJncmFtbWFyID0gcmVxdWlyZSgnLi9ncmFtbWFyJylcblxuY2xhc3MgTWlhUGFyc2VyIGV4dGVuZHMgZ3JhbW1hci5QYXJzZXJcbiAgY29uc3RydWN0b3I6IChAbGV4ZXIsIEB5eSkgLT5cbiAgICBzdXBlcigpXG4gIHBhcnNlOiAoY29kZSwgb3B0aW9ucykgLT5cbiAgICBzdXBlcihjb2RlKVxuICBwYXJzZUVycm9yOiAoc3RyLCBoYXNoKSAtPlxuICAgIGNvbnNvbGUubG9nIHN0clxuICAgIGNvbnNvbGUubG9nIGhhc2hcbiAgICB0aHJvdyBuZXcgRXJyb3IgJ1BhcnNlIEVycm9yJ1xuXG5leHBvcnRzLk1pYVBhcnNlciA9IE1pYVBhcnNlclxuIl19
