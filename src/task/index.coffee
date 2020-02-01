for name in [
    'policy',
    'task',
    'runner',
    'streamer',
    'project'
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
