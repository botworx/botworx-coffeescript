assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{runner_, module_, _$} = runtime

describe 'Task', ->
  describe '@import', ->
    it 'should work', ->
      runner_().run module_ ->
        @import(require, './cleavers')
        $$.$ "All Clauses"
        $$._ _$ @rnr.ctx.clauses
