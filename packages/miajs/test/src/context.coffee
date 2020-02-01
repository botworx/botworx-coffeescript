assert = require('chai').assert
{unit_, runtime} = require('./common')
$$ = unit_ module
{context_, Believe, believe_} = runtime
{__, _$, module_} = runtime
{_Bob, _Joe, _likes, _Fish, _Peas, _get} = require('./common')

ctx = context_()
c1 = believe_ _Bob, _likes, _Fish
ctx.add(c1)
c2 = believe_ _Joe, _likes, _Peas
ctx.add(c2)

$$.$ "All Clauses"
for c in ctx.clauses
  $$._ c.toString()

describe 'Context', ->
  describe '@find', ->
    it 'should work', ->
      r = ctx.find Believe, _Bob, _likes, _Fish
      $$.$ "Bob, likes, Fish"
      $$._ r.toString()

      r = ctx.find Believe, __, _likes, _Fish
      $$.$ "_, likes, Fish"
      $$._ r.toString()

      r = ctx.find Believe, __, _likes, __
      $$.$ "_, likes, _"
      $$._ r.toString()

  describe '@match', ->
    it 'should work', ->
      matches = ctx.match Believe, _Bob, _likes, _Fish
      $$.$ "Bob, likes, Fish"
      for r from matches
        $$._ r.toString()
    it 'should work', ->
      matches = ctx.match Believe, __, _likes, __
      $$.$ "ctx.match(__, _likes, __)"
      for r from matches
        $$._ r.toString()

  describe '@iterator', ->
    it 'should work', ->
      #ctx.forEach (c) -> $$._ c
      for c from ctx
        $$._ c
