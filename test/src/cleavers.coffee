{unit_, runtime} = require('./common')
$$ = unit_ module
{$_, module_, context_, yamlcontext_} = runtime

module.exports = module_ ->
  @rnr.ctx = yamlcontext_().load $$.dataPath('cleavers.yml')
