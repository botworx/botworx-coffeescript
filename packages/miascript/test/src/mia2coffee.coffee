assert = require 'assert'
process = require 'process'
stream = require('stream')
CoffeeScript = require 'coffeescript'
{unit_, Stringer, grammar, yy, compiler, MiaLexer, MiaParser, MiaCompiler} = require('./common')
$$ = unit_ module

describe 'MiaCompiler', ->
  describe 'to coffeescript', ->
    it 'should work', ->
      $$.h2 'Data'
      data =
      """
      def (hello)

        def (say $t)
          | $t

        say "Hello World"
        say "Goodbye World"

      hello
      """
      $$._ data

      $$.h2 'Lex'
      terminals = grammar.parser.terminals_
      lexer = new MiaLexer()
      lexer.setInput(data)
      while (tok = lexer.lex()) != lexer.EOF
        $$._ terminals[tok]

      $$.h2 'Parse'
      parser = new MiaParser(lexer, yy)
      try
        ast = parser.parse(data)
      catch err
        $$._ err.message
        $$._ err.hash

      $$.h2 'AST'
      $$._(JSON.stringify(ast, null, 2))

      $$.h2 'Transpile'
      stringer = new Stringer()
      compiler = new MiaCompiler(stringer)
      compiler.compile(ast)
      code = stringer.toString()
      $$._ code

      $$.h2 'Compile'
      js = CoffeeScript.compile code
      $$._ js
      #out.end()
