for name in [
    'unit',
    'package',
    'testunit'
  ]
    m = require('./' + name)
    exports[name] = m
    Object.assign exports, m
