coffeescript = require 'coffeescript'
miascript = require('./index')
{unit_, MiaLexer, MiaParser, Transformer, Analyzer, MiaCompiler, grammar, yy, Stringer} = miascript

$$ = unit_ module

exports.lex = lex = (code, options) ->
  terminals = grammar.parser.terminals_
  lexer = new MiaLexer()
  lexer.setInput(code)
  tokens = []
  while (token = lexer.lex()) != lexer.EOF
    tokens.push terminals[token]
    #$$._ terminals[token]
  tokens

exports.parse = parse = (code, options) ->
  lexer = new MiaLexer()
  parser = new MiaParser(lexer, yy)
  #
  ###
  try
    ast = parser.parse(code)
  catch err
    console.log err
  ###
  parser.parse(code)
  #$$.$ $$.stringify ast, null, 2
  ###
  console.log('-----------------')
  console.log(JSON.stringify(ast, null, 2))
  console.log('-----------------')
  ###

exports.transform = transform = (code, options) ->
  ast = parse code, options
  transformer = new Transformer()
  ast = transformer.transform(ast, options)
  return ast

exports.analyze = analyze = (code, options) ->
  ast = transform code, options
  analyzer = new Analyzer()
  ast = analyzer.analyze(ast, options)
  return ast

exports.transpile = transpile  = (code, options) ->
  ast = analyze code, options
  stringer = new Stringer()
  compiler = new MiaCompiler(stringer)
  compiler.compile(ast, options)
  coffeecode = stringer.toString()
  return coffeecode

exports.compile = compile = (code, options) ->
  coffeecode = transpile code, options
  js = coffeescript.compile coffeecode, options
  return js

exports.evaluate = evaluate = (code, options) ->
  coffeecode = transpile code, options
  result = coffeescript.eval coffeecode, options
  return result
