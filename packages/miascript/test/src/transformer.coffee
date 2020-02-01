minimatch = require("minimatch")
{Minimatch} = minimatch

{unit_, lex, parse, analyze, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

mm = (pattern, options) ->
  minimatch.makeRe(pattern, options)

$$._ mm 'Block/Clause'
$$._ mm '**/Clause'
r1 = mm '**/Clause'
r2 = mm 'Clause'
r3 = new RegExp r1 + '|' + r2
$$._ r1.exec 'Block/Clause'
$$._ r1.exec 'Clause'
$$._ r1.exec 'Module/Block/Clause'

$$._ r3
$$._ r3.exec 'Module/Block/Clause'
