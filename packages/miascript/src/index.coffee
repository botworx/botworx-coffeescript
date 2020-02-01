exports.miajs = miajs = require 'miajs'
Object.assign exports, miajs
for name in [
    'transformer',
    'analyzer',
    'yy',
    'grammar',
    'miacompiler',
    'mialexer',
    'miaparser',
    'visitor',
    'miascript'
  ]
    m = require('./' + name)
    exports[name] = m
    Object.assign exports, m
