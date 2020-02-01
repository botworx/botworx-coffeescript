for name in [
    'context',
    'yamlcontext'
  ]
    m = require('./' + name)
    exports[name] = m
    for k, v of m
      exports[k] = m[k]
