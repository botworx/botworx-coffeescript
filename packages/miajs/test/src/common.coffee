exports.runtime = runtime = require('../../lib')
{$_, TestUnit} = runtime
Object.assign exports, runtime

defs = $_ [
  'Bob'
  'Joe'
  'Fish'
  'Chips'
  'Tuna'
  'Cheese'
  'Peas'

  'exists'
  'on'
  'age'
  'likes'
  'get'
  'catch'
  'buy'
  'eat'

  'dad'
  'mom'
  'brother'
  'wife'
]
for k, v of defs
  exports[k] = v

exports.$$ = $$ = runtime.package_ module
exports.unit_ = unit_ = (cfg, parent = $$) -> return new TestUnit(parent).config(cfg)
