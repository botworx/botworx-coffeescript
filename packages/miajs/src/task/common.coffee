{$_, Unit} = common = require('../common')
Object.assign exports, common

exports.$$ = $$ = common.package_ module
exports.unit_ = unit_ = (cfg, parent = $$) -> return new Unit(parent).config(cfg)
