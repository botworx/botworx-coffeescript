assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{method_, runner_} = runtime

describe 'Loop', ->
  describe '@action', ->
    it 'should work', ->
      t1 = method_ ->
        @loop ->
          @task ->
            $$._ "Hello"
            @count = 10
            @main = ->
              $$._ @count--
              if(@count <= 0)
                $$._('Inner')
                @fail()
          .task ->
            $$._("Loop")

      runner_().run t1
