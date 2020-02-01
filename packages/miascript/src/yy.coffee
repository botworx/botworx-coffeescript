exports._terms = _terms = []
exports._types = _types = []

class Node
  @TNode()
  constructor: (kind) ->
    @kind = kind || @constructor.name
    @nodes = []
  #toJSON: -> return {kind: @kind, nodes: @nodes}

class Array extends Node
  constructor: (@nodes) ->
    super 'Array'
  toJSON: ->
    kind: @kind
    type: @type
    nodes: @nodes

exports.Array = Array

class Property extends Node
  constructor: (name, val) ->
    super('Property')
    @name = name
    @value = val

  toJSON: ->
    return {kind: @kind, name: @name, value: @value}

exports.Property = Property

class Properties extends Node
  constructor: (child) ->
    super('Properties')
    @add(child)

exports.Properties = Properties

class Variable extends Node
  constructor: (name) ->
    super('Variable')
    @name = name
    @info = null

  toJSON: ->
    return {kind: @kind, name: @name, type: @type, info: @info}

exports.Variable = Variable
#
class Term extends Node
  constructor: (name, kind = 'Term') ->
    super(kind)
    @name = name

  toJSON: ->
    return {kind: @kind, name: @name, type: @type}

exports.term_ = term_ = (name) ->
  term = _terms[name]
  if !term
    term = new Term name
    _terms[name] = term
  return term

exports.Term = Term;
exports._exists = term_ 'exists'

class Type extends Term
  constructor: (name) ->
    super(name, 'Type')

  toJSON: ->
    return {kind: @kind, name: @name, type: @type}

exports.type_ = type_ = (name) ->
  type = _types[name]
  if !type
    type = new Type name
    _types[name] = type
  return type

exports.builtin_ = builtin_ = (name) ->
  type = type_ name
  type.builtin = true
  return type

exports._Goal = _Goal = builtin_ 'Goal'
exports._Achieve = _Achieve = builtin_ 'Achieve'
exports._Believe = _Believe = builtin_ 'Believe'

exports.Type = Type;

#
class Literal extends Node
  constructor: (@value) ->
    super('Literal')

  toJSON: ->
    return {kind: @kind, value: @value}

exports.Literal = Literal
exports._null = _null = new Literal 'null'
#
class ExprList extends Node
  constructor: (child, kind) ->
    super(kind || 'ExprList')
    if(child)
      @add(child)

exports.ExprList = ExprList;
#
class Block extends ExprList
  constructor: (child, kind) ->
    super(child, kind || 'Block')

  toJSON: ->
    return {kind: @kind, nodes: @nodes}

exports.Block = Block;
#
#Module
#
class Module extends Block
  constructor: (child) ->
    super(child, 'Module')

exports.Module = Module

class Snippet extends Node
  constructor: (t) ->
    super 'Snippet'
    t = t.slice 1
    t = t.trim()
    @text = t

  toJSON: ->
    return {kind: @kind, text: @text}

exports.Snippet = Snippet

class Paragraph extends Node
  @node 'subj'
  @node 'list'
  constructor: (@subj, @list) ->
    super 'Paragraph'
  toJSON: ->
    kind: @kind
    type: @type
    subj: @subj
    list: @list

exports.Paragraph = Paragraph

class Sentence extends Node
  @node 'clause'
  @node 'list'
  constructor: (@clause, @list) ->
    super 'Sentence'
  toJSON: ->
    kind: @kind
    type: @type
    clause: @clause
    list: @list

exports.Sentence = Sentence

class Clause extends Node
  @node 'subj'
  @node 'verb'
  @node 'obj'
  constructor: (@subj, @verb, @obj, @type = type_ 'Believe') ->
    super('Clause')
    @xtra = undefined

  toJSON: ->
    kind: @kind
    type: @type
    subj: @subj
    verb: @verb
    obj:  @obj
    xtra: @xtra

exports.Clause = Clause

class Trigger extends Node
  constructor: (arg) ->
    super('Trigger')
    if arg instanceof Clause
      clause = arg
      if clause.subj == _null
        clause.type = type_ 'Achieve'
        msg = new Attempt(clause)
      else
        clause.type = type_ 'Believe'
        msg = new Assert(clause)
    else
      msg = arg

    @flavor = msg.type
    expr = msg.arg
    @type = expr.type
    if expr instanceof Clause
      @subj = expr.subj
      @verb = expr.verb
      @obj = expr.obj
      @xtra = expr.xtra
      @binding = expr.binding
    else if expr instanceof Variable
      @binding = expr

  toJSON: -> {kind: @kind, flavor: @flavor, type: @type, subj: @subj, verb: @verb, obj: @obj, xtra: @xtra, binding: @binding}

exports.Trigger = Trigger

class UnaryExpr extends Node
  @node 'arg'
  constructor: (@arg, kind = 'UnaryExpr') ->
    super(kind)

  toJSON: ->
    return {kind: @kind, arg: @arg}

exports.UnaryExpr = UnaryExpr

class PrefixExpr extends UnaryExpr
  constructor: (arg, kind = 'PrefixExpr') ->
    super(arg, kind)

exports.PrefixExpr = PrefixExpr

###
Messages
###
exports._Propose = _Propose = builtin_ 'Propose'
exports._Attempt = _Attempt = builtin_ 'Attempt'
exports._Assert = _Assert = builtin_ 'Assert'
exports._Retract = _Retract = builtin_ 'Retract'

class Message extends PrefixExpr
  constructor: (arg, @type = _Assert) ->
    super(arg, 'Message')
    if arg instanceof Clause
      clause = arg
      if clause.subj == _null
        clause.type = type_ 'Achieve'

  toJSON: ->
    return {kind: @kind, type: @type, arg: @arg}

exports.Message = Message

class Propose extends Message
  constructor: (arg) ->
    super(arg, _Propose)

exports.Propose = Propose

class Attempt extends Message
  constructor: (arg) ->
    super(arg, _Attempt)

exports.Attempt = Attempt

class Assert extends Message
  constructor: (arg) ->
    super(arg, _Assert)

exports.Assert = Assert

class Retract extends Message
  constructor: (arg) ->
    super(arg, _Retract)

exports.Retract = Retract

class PostfixExpr extends UnaryExpr
  constructor: (arg, kind = 'PostfixExpr') ->
    super(arg, kind)

exports.PostfixExpr = PostfixExpr

class BinaryExpr extends Node
  @node 'left'
  @node 'right'
  constructor: (@left, @right, kind = 'BinaryExpr') ->
    super(kind)

  toJSON: ->
    return {kind: @kind, op: @op, left: @left, right: @right}

exports.BinaryExpr = BinaryExpr

class Contextualize extends Node
  @node 'left'
  @node 'right'
  constructor: (@left, @right) ->
    super('Contextualize')

  toJSON: ->
    return {kind: @kind, left: @left, right: @right}

exports.Contextualize = Contextualize

class Statement extends Node
  constructor: (kind) ->
    super(kind || 'Statement')

  toJSON: ->
    return {kind: @kind}

exports.Statement = Statement

class Def extends Statement
  @node 'trigger'
  @node 'body'
  constructor: (@trigger, @body, kind = 'Def') ->
    super(kind)

  toJSON: ->
    return {kind: @kind, name: @name, trigger: @trigger, body: @body}

exports.Def = Def

class DefG extends Def
  constructor: (trigger, body) ->
    super(trigger, body, 'DefG')
exports.DefG = DefG

class ImportStmt extends Statement
  constructor: (expr) ->
    super('ImportStmt')
    @expr = expr

  toJSON: ->
    return {kind: @kind, expr: @expr}

exports.ImportStmt = ImportStmt

class CallStmt extends Statement
  @node 'expr'
  constructor: (@expr) ->
    super('CallStmt')

  toJSON: ->
    return {kind: @kind, expr: @expr}

exports.CallStmt = CallStmt

#
class Query extends Statement
  @node 'lhs'
  @node 'rhs'
  constructor: (@lhs, @rhs) ->
    super('Query')

  toJSON: -> {kind: @kind, lhs: @lhs, rhs: @rhs}

exports.Query = Query;

class Condition extends Node
  @node 'expr'
  constructor: (@expr, kind) ->
    super(kind || 'Condition')

  toJSON: ->
    return {kind: @kind, expr: @expr}

exports.Condition = Condition

class QClause extends Condition
  constructor: (expr) ->
    super(expr, 'QClause')

exports.QClause = QClause

class QNegClause extends Condition
  constructor: (expr) ->
    super(expr, 'QNegClause')

exports.QNegClause = QNegClause

class QFilter extends Condition
  constructor: (expr) ->
    super(expr, 'QFilter')

exports.QFilter = QFilter

class Lhs extends ExprList
  constructor: (child, kind) ->
    super(child, 'Lhs')

exports.Lhs = Lhs

class Rhs extends Block
  constructor: (child, kind) ->
    super(child, 'Rhs')

exports.Rhs = Rhs
#
class Action extends Node
  constructor: (@body, kind) ->
    super(kind)

  toJSON: ->
    return {kind: @kind, body: @body}

exports.Action = Action
#
class Return extends Node
  constructor: (expr) ->
    super('Return')
    @expr = expr

  toJSON: ->
    return {kind: @kind, expr: @expr}

exports.Return = Return
