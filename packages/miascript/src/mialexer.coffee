{unit_} = require('./common')
$$ = unit_ module

grammar = require("./grammar")
symbols = grammar.parser.symbols_
terminals = grammar.parser.terminals_

{EOF, COMMENT, NEWLINE, SEMICOLON, TERMINATOR, INDENT, OUTDENT} = symbols
{LONGARROW, NOTARROW, LONGFATARROW, NOTFATARROW} = symbols

supressor =
  LONGARROW: true
  NOTARROW: true
  LONGFATARROW: true
  NOTFATARROW: true
  
Lexer = ->
Lexer.prototype = grammar.parser.lexer

class MiaLexer extends Lexer
  constructor: ->
    super()
    @prevToken = TERMINATOR
    @indentstack = [0]
    @queue = []

  lex: ->
    tok = nextTok = null
    indent = 0
    if @queue.length != 0
      tok = @queue.shift()
      @prevToken = tok
      return tok

    tok = super()
    switch tok
      when SEMICOLON
        @queue.push TERMINATOR

      when EOF
        while @indentstack[@indentstack.length-1] > 0
          @indentstack.pop()
          @queue.push OUTDENT
        @queue.push tok

      when NEWLINE
        nextTok = super()
        nextTok = super() while nextTok == NEWLINE
        #console.log "Lookahead: #{terminals[nextTok]}"
        indent = @yylloc.first_column
        if indent > @indentstack[@indentstack.length-1]
          @indentstack.push indent
          @queue.push INDENT

        else if indent < @indentstack[@indentstack.length-1]
          while indent < @indentstack[@indentstack.length-1]
            @indentstack.pop()
            @queue.push(OUTDENT)
            #console.log('OUTDENT')
          if !supressor[terminals[nextTok]]
            @queue.push(TERMINATOR)

        else
          if @prevToken != TERMINATOR
            @queue.push TERMINATOR
        @queue.push nextTok

      else
        @queue.push tok

    tok = @queue.shift()
    @prevToken = tok
    return tok

exports.MiaLexer = MiaLexer
