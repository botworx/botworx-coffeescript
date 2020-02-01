assert = require 'assert'
{unit_, grammar, yy, compiler, MiaLexer, MiaParser} = require('./common')
$$ = unit_ module

describe 'DefParser', ->
  describe '@parse', ->
    it 'should work', ->
      $$.h2 'Data'
      data = "say $t"
      $$._ data

      $$.h2 'Lex'
      terminals = grammar.parser.terminals_
      lexer = new MiaLexer()
      lexer.setInput data
      while (tok = lexer.lex()) != lexer.EOF
        $$._ terminals[tok]

      $$.h2('Parse')
      parser = new MiaParser(lexer, yy)
      try
        ast = parser.parse(data)
      catch err
        $$._ err.message
        $$._ err.hash

      $$.h2('AST')
      $$._(JSON.stringify(ast, null, 2))
