assert = require 'assert'
{unit_, grammar, MiaLexer} = require('./common')
$$ = unit_ module

describe 'MiaLexer', ->
  describe '@lex', ->
    it 'should work', ->
      terminals = grammar.parser.terminals_
      lexer = new MiaLexer()
      data =
      """
      def (hello)

        def (say $t)
          | $$._($t);

        say "Hello World"
        say "Goodbye World"

      hello
      """
      $$.h2 'Data'
      $$._ data
      $$.h2 'Tokens'
      lexer.setInput(data)
      while (tok = lexer.lex()) != lexer.EOF
        $$._ terminals[tok]
