expect = require('chai').expect
minimatch = require("minimatch")
{Minimatch} = minimatch

{unit_, runtime} = require('./common')
$$ = unit_ module
{Variable, Term, Context, Assert, assert_, Retract, Believe, believe_, attempt_, Achieve} = runtime
{$_, __, $, module_,  Message, Policy, Rule, Trigger, onAssert, onRetract, onAttempt, Runner, Method} = runtime
{match} = runtime
{_Bob, _Joe, _likes, _Fish, _Tuna, _Peas, _get} = require('./common')

_make = $_ 'make'

pattern = '*.js'
options = {}

mm = (pattern, options) ->
  minimatch.makeRe(pattern, options)
re  = mm('*.js')
#$$.$ 'Minimatch to RegExp'
#$$._ re

describe 'Matching', ->

  describe 'Values', ->
    it 'match __, null', ->
      expect(match __, null).to.be.true
    it 'match null, null', ->
      expect(match null, null).to.be.true
    it "match null, 'hello'", ->
      expect(match null, 'hello').to.be.false
    it "match 'hello', 'hello'", ->
      expect(match 'hello', 'hello').to.be.true
    it "match 'hello', 'goodbye'", ->
      expect(match 'hello', 'goodbye').to.be.false
    it "match ((x) -> x == 10), 10", ->
      expect(match ((x) -> x == 10), 10).to.be.true
    it "match ((x) -> x == 10), 20", ->
      expect(match ((x) -> x == 10), 20).to.be.false
    it "match ((x) -> x > 10), 20", ->
      expect(match ((x) -> x > 10), 20).to.be.true

  describe 'Regular Expressions', ->
    it "match(re, 'test.js')", ->
      expect(match(re, 'test.js')).to.be.true
    it "match(re, 'test.txt')", ->
      expect(match(re, 'test.txt')).to.be.false

  describe 'Variable Binding', ->
    it "match($('x'), 10)", ->
      #$$._ match($('x'), 10)
      expect(match($('x'), 10)).to.have.property('$x', 10)

  describe 'Clauses', ->
    it "believe_(_Bob, _likes, _Fish).match Believe, __, _likes, __", ->
      expect(believe_(_Bob, _likes, _Fish).match Believe, __, _likes, __).to.be.true
    it "believe_(_Bob, _likes, _Fish).match Believe, $('x'), _likes, $('y')", ->
      result = believe_(_Bob, _likes, _Fish).match Believe, $('x'), _likes, $('y')
      expect(result).to.have.property('$x', _Bob)
      expect(result).to.have.property('$y', _Fish)

  describe 'Messages', ->
    it "assert_(Believe, _Bob, _likes, _Fish).match Assert, Believe, $('x'), _likes, $('y')", ->
      result = assert_(Believe, _Bob, _likes, _Fish).match Assert, Believe, $('x'), _likes, $('y')
      expect(result).to.have.property('$x', _Bob)
      expect(result).to.have.property('$y', _Fish)

  describe 'Triggers', ->
    it "onAssert(Believe, $('x'), _likes, $('y')).match assert_(Believe, _Bob, _likes, _Fish)", ->
      result = onAssert(Believe, $('x'), _likes, $('y')).match assert_(Believe, _Bob, _likes, _Fish)
      expect(result).to.have.property('$x', _Bob)
      expect(result).to.have.property('$y', _Fish)
    it "onAssert(Believe, $('x'), _likes, $('y')).match attempt_(Believe, _Bob, _likes, _Fish)", ->
      result = onAssert(Believe, $('x'), _likes, $('y')).match attempt_(Believe, _Bob, _likes, _Fish)
      expect(result).to.be.false

  describe 'Triggers with Xtras', ->
    it "onAssert(Believe, $('x'), _likes, $('y')).match assert_(Believe, _Bob, _likes, _Fish)", ->
      result = onAssert(Believe, $('x'), _likes, $('y')).match assert_(Believe, _Bob, _likes, _Fish)
      expect(result).to.have.property('$x', _Bob)
      expect(result).to.have.property('$y', _Fish)
