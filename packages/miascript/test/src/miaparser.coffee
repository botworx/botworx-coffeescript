assert = require 'assert'
{unit_, grammar, yy, compiler, MiaLexer, MiaParser} = require('./common')
$$ = unit_ module

describe 'MiaParser', ->
  describe '@parse', ->
    it 'should work', ->
      terminals = grammar.parser.terminals_
      lexer = new MiaLexer()
      $$.h2('Data')
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
      $$.h2('Lex')
      lexer.setInput(data)
      while (tok = lexer.lex()) != lexer.EOF
        $$._ terminals[tok]
      ###
      Parser
      ###
      parser = new MiaParser(lexer, yy)

      $$.h2('Parse')
      try
        ast = parser.parse(data)
      catch err
        $$._ err.message
        $$._ err.hash

      $$.h2('AST')
      $$._(JSON.stringify(ast, null, 2))
