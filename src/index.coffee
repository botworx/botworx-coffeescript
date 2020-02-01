exports.id = module.id
for name in [
    'miajs',
    'task',
    'main',
    'context',
    'query',
    'stream',
    'unit'
  ]
    m = require('./' + name)
    exports[name] = m
    ###
    console.log "module: #{name}"
    console.log JSON.stringify(m)
    ###
    for k, v of m
      #console.log "key: #{k}, val: #{v}"
      exports[k] = m[k]
