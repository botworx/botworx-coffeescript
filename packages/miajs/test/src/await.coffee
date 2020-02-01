assert = require('chai').assert
{$$, unit_, runtime} = require('./common')
$$ = unit_ module
{Term, Context, Assert, Retract, Believe, Attempt, Achieve} = runtime
{$_, __, runner_, module_, Message, Policy, Rule, Trigger, OnAssert, OnRetract, OnAttempt, Runner, Method} = runtime

{ _hello, _say } = $_ [ 'hello', 'say' ]

foo = ->
  new Promise (resolve, reject) ->
    resolve true

class MyPromise
  constructor:  ->
  then: (@resolve, @reject) ->
    console.log arguments
    console.log 'Then'
    console.log this
    @resolve 'Howdy'

foo2 = ->
  new MyPromise()

describe 'Await', ->
  $$.tap()

  it 'should work', ->
    bar = ->
      console.log await foo()
    bar()

  it 'should work', ->
    bar = ->
      console.log await foo2()
    bar()
