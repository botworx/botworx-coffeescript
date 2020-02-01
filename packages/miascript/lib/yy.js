(function() {
  var Action, Array, Assert, Attempt, BinaryExpr, Block, CallStmt, Clause, Condition, Contextualize, Def, DefG, ExprList, ImportStmt, Lhs, Literal, Message, Module, Node, Paragraph, PostfixExpr, PrefixExpr, Properties, Property, Propose, QClause, QFilter, QNegClause, Query, Retract, Return, Rhs, Sentence, Snippet, Statement, Term, Trigger, Type, UnaryExpr, Variable, _Achieve, _Assert, _Attempt, _Believe, _Goal, _Propose, _Retract, _null, _terms, _types, builtin_, term_, type_;

  exports._terms = _terms = [];

  exports._types = _types = [];

  Node = (function() {
    class Node {
      constructor(kind) {
        this.kind = kind || this.constructor.name;
        this.nodes = [];
      }

    };

    Node.TNode();

    return Node;

  }).call(this);

  //toJSON: -> return {kind: @kind, nodes: @nodes}
  Array = class Array extends Node {
    constructor(nodes) {
      super('Array');
      this.nodes = nodes;
    }

    toJSON() {
      return {
        kind: this.kind,
        type: this.type,
        nodes: this.nodes
      };
    }

  };

  exports.Array = Array;

  Property = class Property extends Node {
    constructor(name, val) {
      super('Property');
      this.name = name;
      this.value = val;
    }

    toJSON() {
      return {
        kind: this.kind,
        name: this.name,
        value: this.value
      };
    }

  };

  exports.Property = Property;

  Properties = class Properties extends Node {
    constructor(child) {
      super('Properties');
      this.add(child);
    }

  };

  exports.Properties = Properties;

  Variable = class Variable extends Node {
    constructor(name) {
      super('Variable');
      this.name = name;
      this.info = null;
    }

    toJSON() {
      return {
        kind: this.kind,
        name: this.name,
        type: this.type,
        info: this.info
      };
    }

  };

  exports.Variable = Variable;

  
  Term = class Term extends Node {
    constructor(name, kind = 'Term') {
      super(kind);
      this.name = name;
    }

    toJSON() {
      return {
        kind: this.kind,
        name: this.name,
        type: this.type
      };
    }

  };

  exports.term_ = term_ = function(name) {
    var term;
    term = _terms[name];
    if (!term) {
      term = new Term(name);
      _terms[name] = term;
    }
    return term;
  };

  exports.Term = Term;

  exports._exists = term_('exists');

  Type = class Type extends Term {
    constructor(name) {
      super(name, 'Type');
    }

    toJSON() {
      return {
        kind: this.kind,
        name: this.name,
        type: this.type
      };
    }

  };

  exports.type_ = type_ = function(name) {
    var type;
    type = _types[name];
    if (!type) {
      type = new Type(name);
      _types[name] = type;
    }
    return type;
  };

  exports.builtin_ = builtin_ = function(name) {
    var type;
    type = type_(name);
    type.builtin = true;
    return type;
  };

  exports._Goal = _Goal = builtin_('Goal');

  exports._Achieve = _Achieve = builtin_('Achieve');

  exports._Believe = _Believe = builtin_('Believe');

  exports.Type = Type;

  Literal = class Literal extends Node {
    constructor(value) {
      super('Literal');
      this.value = value;
    }

    toJSON() {
      return {
        kind: this.kind,
        value: this.value
      };
    }

  };

  exports.Literal = Literal;

  exports._null = _null = new Literal('null');

  
  ExprList = class ExprList extends Node {
    constructor(child, kind) {
      super(kind || 'ExprList');
      if (child) {
        this.add(child);
      }
    }

  };

  exports.ExprList = ExprList;

  Block = class Block extends ExprList {
    constructor(child, kind) {
      super(child, kind || 'Block');
    }

    toJSON() {
      return {
        kind: this.kind,
        nodes: this.nodes
      };
    }

  };

  exports.Block = Block;

  Module = class Module extends Block {
    constructor(child) {
      super(child, 'Module');
    }

  };

  exports.Module = Module;

  Snippet = class Snippet extends Node {
    constructor(t) {
      super('Snippet');
      t = t.slice(1);
      t = t.trim();
      this.text = t;
    }

    toJSON() {
      return {
        kind: this.kind,
        text: this.text
      };
    }

  };

  exports.Snippet = Snippet;

  Paragraph = (function() {
    class Paragraph extends Node {
      constructor(subj, list) {
        super('Paragraph');
        this.subj = subj;
        this.list = list;
      }

      toJSON() {
        return {
          kind: this.kind,
          type: this.type,
          subj: this.subj,
          list: this.list
        };
      }

    };

    Paragraph.node('subj');

    Paragraph.node('list');

    return Paragraph;

  }).call(this);

  exports.Paragraph = Paragraph;

  Sentence = (function() {
    class Sentence extends Node {
      constructor(clause1, list) {
        super('Sentence');
        this.clause = clause1;
        this.list = list;
      }

      toJSON() {
        return {
          kind: this.kind,
          type: this.type,
          clause: this.clause,
          list: this.list
        };
      }

    };

    Sentence.node('clause');

    Sentence.node('list');

    return Sentence;

  }).call(this);

  exports.Sentence = Sentence;

  Clause = (function() {
    class Clause extends Node {
      constructor(subj, verb, obj, type1 = type_('Believe')) {
        super('Clause');
        this.subj = subj;
        this.verb = verb;
        this.obj = obj;
        this.type = type1;
        this.xtra = void 0;
      }

      toJSON() {
        return {
          kind: this.kind,
          type: this.type,
          subj: this.subj,
          verb: this.verb,
          obj: this.obj,
          xtra: this.xtra
        };
      }

    };

    Clause.node('subj');

    Clause.node('verb');

    Clause.node('obj');

    return Clause;

  }).call(this);

  exports.Clause = Clause;

  Trigger = class Trigger extends Node {
    constructor(arg) {
      var clause, expr, msg;
      super('Trigger');
      if (arg instanceof Clause) {
        clause = arg;
        if (clause.subj === _null) {
          clause.type = type_('Achieve');
          msg = new Attempt(clause);
        } else {
          clause.type = type_('Believe');
          msg = new Assert(clause);
        }
      } else {
        msg = arg;
      }
      this.flavor = msg.type;
      expr = msg.arg;
      this.type = expr.type;
      if (expr instanceof Clause) {
        this.subj = expr.subj;
        this.verb = expr.verb;
        this.obj = expr.obj;
        this.xtra = expr.xtra;
        this.binding = expr.binding;
      } else if (expr instanceof Variable) {
        this.binding = expr;
      }
    }

    toJSON() {
      return {
        kind: this.kind,
        flavor: this.flavor,
        type: this.type,
        subj: this.subj,
        verb: this.verb,
        obj: this.obj,
        xtra: this.xtra,
        binding: this.binding
      };
    }

  };

  exports.Trigger = Trigger;

  UnaryExpr = (function() {
    class UnaryExpr extends Node {
      constructor(arg1, kind = 'UnaryExpr') {
        super(kind);
        this.arg = arg1;
      }

      toJSON() {
        return {
          kind: this.kind,
          arg: this.arg
        };
      }

    };

    UnaryExpr.node('arg');

    return UnaryExpr;

  }).call(this);

  exports.UnaryExpr = UnaryExpr;

  PrefixExpr = class PrefixExpr extends UnaryExpr {
    constructor(arg, kind = 'PrefixExpr') {
      super(arg, kind);
    }

  };

  exports.PrefixExpr = PrefixExpr;

  /*
  Messages
  */
  exports._Propose = _Propose = builtin_('Propose');

  exports._Attempt = _Attempt = builtin_('Attempt');

  exports._Assert = _Assert = builtin_('Assert');

  exports._Retract = _Retract = builtin_('Retract');

  Message = class Message extends PrefixExpr {
    constructor(arg, type1 = _Assert) {
      var clause;
      super(arg, 'Message');
      this.type = type1;
      if (arg instanceof Clause) {
        clause = arg;
        if (clause.subj === _null) {
          clause.type = type_('Achieve');
        }
      }
    }

    toJSON() {
      return {
        kind: this.kind,
        type: this.type,
        arg: this.arg
      };
    }

  };

  exports.Message = Message;

  Propose = class Propose extends Message {
    constructor(arg) {
      super(arg, _Propose);
    }

  };

  exports.Propose = Propose;

  Attempt = class Attempt extends Message {
    constructor(arg) {
      super(arg, _Attempt);
    }

  };

  exports.Attempt = Attempt;

  Assert = class Assert extends Message {
    constructor(arg) {
      super(arg, _Assert);
    }

  };

  exports.Assert = Assert;

  Retract = class Retract extends Message {
    constructor(arg) {
      super(arg, _Retract);
    }

  };

  exports.Retract = Retract;

  PostfixExpr = class PostfixExpr extends UnaryExpr {
    constructor(arg, kind = 'PostfixExpr') {
      super(arg, kind);
    }

  };

  exports.PostfixExpr = PostfixExpr;

  BinaryExpr = (function() {
    class BinaryExpr extends Node {
      constructor(left, right, kind = 'BinaryExpr') {
        super(kind);
        this.left = left;
        this.right = right;
      }

      toJSON() {
        return {
          kind: this.kind,
          op: this.op,
          left: this.left,
          right: this.right
        };
      }

    };

    BinaryExpr.node('left');

    BinaryExpr.node('right');

    return BinaryExpr;

  }).call(this);

  exports.BinaryExpr = BinaryExpr;

  Contextualize = (function() {
    class Contextualize extends Node {
      constructor(left, right) {
        super('Contextualize');
        this.left = left;
        this.right = right;
      }

      toJSON() {
        return {
          kind: this.kind,
          left: this.left,
          right: this.right
        };
      }

    };

    Contextualize.node('left');

    Contextualize.node('right');

    return Contextualize;

  }).call(this);

  exports.Contextualize = Contextualize;

  Statement = class Statement extends Node {
    constructor(kind) {
      super(kind || 'Statement');
    }

    toJSON() {
      return {
        kind: this.kind
      };
    }

  };

  exports.Statement = Statement;

  Def = (function() {
    class Def extends Statement {
      constructor(trigger1, body1, kind = 'Def') {
        super(kind);
        this.trigger = trigger1;
        this.body = body1;
      }

      toJSON() {
        return {
          kind: this.kind,
          name: this.name,
          trigger: this.trigger,
          body: this.body
        };
      }

    };

    Def.node('trigger');

    Def.node('body');

    return Def;

  }).call(this);

  exports.Def = Def;

  DefG = class DefG extends Def {
    constructor(trigger, body) {
      super(trigger, body, 'DefG');
    }

  };

  exports.DefG = DefG;

  ImportStmt = class ImportStmt extends Statement {
    constructor(expr) {
      super('ImportStmt');
      this.expr = expr;
    }

    toJSON() {
      return {
        kind: this.kind,
        expr: this.expr
      };
    }

  };

  exports.ImportStmt = ImportStmt;

  CallStmt = (function() {
    class CallStmt extends Statement {
      constructor(expr1) {
        super('CallStmt');
        this.expr = expr1;
      }

      toJSON() {
        return {
          kind: this.kind,
          expr: this.expr
        };
      }

    };

    CallStmt.node('expr');

    return CallStmt;

  }).call(this);

  exports.CallStmt = CallStmt;

  Query = (function() {
    
    class Query extends Statement {
      constructor(lhs, rhs) {
        super('Query');
        this.lhs = lhs;
        this.rhs = rhs;
      }

      toJSON() {
        return {
          kind: this.kind,
          lhs: this.lhs,
          rhs: this.rhs
        };
      }

    };

    Query.node('lhs');

    Query.node('rhs');

    return Query;

  }).call(this);

  exports.Query = Query;

  Condition = (function() {
    class Condition extends Node {
      constructor(expr1, kind) {
        super(kind || 'Condition');
        this.expr = expr1;
      }

      toJSON() {
        return {
          kind: this.kind,
          expr: this.expr
        };
      }

    };

    Condition.node('expr');

    return Condition;

  }).call(this);

  exports.Condition = Condition;

  QClause = class QClause extends Condition {
    constructor(expr) {
      super(expr, 'QClause');
    }

  };

  exports.QClause = QClause;

  QNegClause = class QNegClause extends Condition {
    constructor(expr) {
      super(expr, 'QNegClause');
    }

  };

  exports.QNegClause = QNegClause;

  QFilter = class QFilter extends Condition {
    constructor(expr) {
      super(expr, 'QFilter');
    }

  };

  exports.QFilter = QFilter;

  Lhs = class Lhs extends ExprList {
    constructor(child, kind) {
      super(child, 'Lhs');
    }

  };

  exports.Lhs = Lhs;

  Rhs = class Rhs extends Block {
    constructor(child, kind) {
      super(child, 'Rhs');
    }

  };

  exports.Rhs = Rhs;

  
  Action = class Action extends Node {
    constructor(body1, kind) {
      super(kind);
      this.body = body1;
    }

    toJSON() {
      return {
        kind: this.kind,
        body: this.body
      };
    }

  };

  exports.Action = Action;

  
  Return = class Return extends Node {
    constructor(expr) {
      super('Return');
      this.expr = expr;
    }

    toJSON() {
      return {
        kind: this.kind,
        expr: this.expr
      };
    }

  };

  exports.Return = Return;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXkuanMiLCJzb3VyY2VzIjpbInl5LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxTQUFBLEVBQUEsYUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxPQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLFNBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxTQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBOztFQUFBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE1BQUEsR0FBUzs7RUFDMUIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsTUFBQSxHQUFTOztFQUVwQjtJQUFOLE1BQUEsS0FBQTtNQUVFLFdBQWEsQ0FBQyxJQUFELENBQUE7UUFDWCxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUEsSUFBUSxJQUFDLENBQUEsV0FBVyxDQUFDO1FBQzdCLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFGRTs7SUFGZjs7SUFDRSxJQUFDLENBQUEsS0FBRCxDQUFBOzs7O2dCQUpGOzs7RUFVTSxRQUFOLE1BQUEsTUFBQSxRQUFvQixLQUFwQjtJQUNFLFdB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Ll90ZXJtcyA9IF90ZXJtcyA9IFtdXG5leHBvcnRzLl90eXBlcyA9IF90eXBlcyA9IFtdXG5cbmNsYXNzIE5vZGVcbiAgQFROb2RlKClcbiAgY29uc3RydWN0b3I6IChraW5kKSAtPlxuICAgIEBraW5kID0ga2luZCB8fCBAY29uc3RydWN0b3IubmFtZVxuICAgIEBub2RlcyA9IFtdXG4gICN0b0pTT046IC0+IHJldHVybiB7a2luZDogQGtpbmQsIG5vZGVzOiBAbm9kZXN9XG5cbmNsYXNzIEFycmF5IGV4dGVuZHMgTm9kZVxuICBjb25zdHJ1Y3RvcjogKEBub2RlcykgLT5cbiAgICBzdXBlciAnQXJyYXknXG4gIHRvSlNPTjogLT5cbiAgICBraW5kOiBAa2luZFxuICAgIHR5cGU6IEB0eXBlXG4gICAgbm9kZXM6IEBub2Rlc1xuXG5leHBvcnRzLkFycmF5ID0gQXJyYXlcblxuY2xhc3MgUHJvcGVydHkgZXh0ZW5kcyBOb2RlXG4gIGNvbnN0cnVjdG9yOiAobmFtZSwgdmFsKSAtPlxuICAgIHN1cGVyKCdQcm9wZXJ0eScpXG4gICAgQG5hbWUgPSBuYW1lXG4gICAgQHZhbHVlID0gdmFsXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIG5hbWU6IEBuYW1lLCB2YWx1ZTogQHZhbHVlfVxuXG5leHBvcnRzLlByb3BlcnR5ID0gUHJvcGVydHlcblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIE5vZGVcbiAgY29uc3RydWN0b3I6IChjaGlsZCkgLT5cbiAgICBzdXBlcignUHJvcGVydGllcycpXG4gICAgQGFkZChjaGlsZClcblxuZXhwb3J0cy5Qcm9wZXJ0aWVzID0gUHJvcGVydGllc1xuXG5jbGFzcyBWYXJpYWJsZSBleHRlbmRzIE5vZGVcbiAgY29uc3RydWN0b3I6IChuYW1lKSAtPlxuICAgIHN1cGVyKCdWYXJpYWJsZScpXG4gICAgQG5hbWUgPSBuYW1lXG4gICAgQGluZm8gPSBudWxsXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIG5hbWU6IEBuYW1lLCB0eXBlOiBAdHlwZSwgaW5mbzogQGluZm99XG5cbmV4cG9ydHMuVmFyaWFibGUgPSBWYXJpYWJsZVxuI1xuY2xhc3MgVGVybSBleHRlbmRzIE5vZGVcbiAgY29uc3RydWN0b3I6IChuYW1lLCBraW5kID0gJ1Rlcm0nKSAtPlxuICAgIHN1cGVyKGtpbmQpXG4gICAgQG5hbWUgPSBuYW1lXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIG5hbWU6IEBuYW1lLCB0eXBlOiBAdHlwZX1cblxuZXhwb3J0cy50ZXJtXyA9IHRlcm1fID0gKG5hbWUpIC0+XG4gIHRlcm0gPSBfdGVybXNbbmFtZV1cbiAgaWYgIXRlcm1cbiAgICB0ZXJtID0gbmV3IFRlcm0gbmFtZVxuICAgIF90ZXJtc1tuYW1lXSA9IHRlcm1cbiAgcmV0dXJuIHRlcm1cblxuZXhwb3J0cy5UZXJtID0gVGVybTtcbmV4cG9ydHMuX2V4aXN0cyA9IHRlcm1fICdleGlzdHMnXG5cbmNsYXNzIFR5cGUgZXh0ZW5kcyBUZXJtXG4gIGNvbnN0cnVjdG9yOiAobmFtZSkgLT5cbiAgICBzdXBlcihuYW1lLCAnVHlwZScpXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIG5hbWU6IEBuYW1lLCB0eXBlOiBAdHlwZX1cblxuZXhwb3J0cy50eXBlXyA9IHR5cGVfID0gKG5hbWUpIC0+XG4gIHR5cGUgPSBfdHlwZXNbbmFtZV1cbiAgaWYgIXR5cGVcbiAgICB0eXBlID0gbmV3IFR5cGUgbmFtZVxuICAgIF90eXBlc1tuYW1lXSA9IHR5cGVcbiAgcmV0dXJuIHR5cGVcblxuZXhwb3J0cy5idWlsdGluXyA9IGJ1aWx0aW5fID0gKG5hbWUpIC0+XG4gIHR5cGUgPSB0eXBlXyBuYW1lXG4gIHR5cGUuYnVpbHRpbiA9IHRydWVcbiAgcmV0dXJuIHR5cGVcblxuZXhwb3J0cy5fR29hbCA9IF9Hb2FsID0gYnVpbHRpbl8gJ0dvYWwnXG5leHBvcnRzLl9BY2hpZXZlID0gX0FjaGlldmUgPSBidWlsdGluXyAnQWNoaWV2ZSdcbmV4cG9ydHMuX0JlbGlldmUgPSBfQmVsaWV2ZSA9IGJ1aWx0aW5fICdCZWxpZXZlJ1xuXG5leHBvcnRzLlR5cGUgPSBUeXBlO1xuXG4jXG5jbGFzcyBMaXRlcmFsIGV4dGVuZHMgTm9kZVxuICBjb25zdHJ1Y3RvcjogKEB2YWx1ZSkgLT5cbiAgICBzdXBlcignTGl0ZXJhbCcpXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIHZhbHVlOiBAdmFsdWV9XG5cbmV4cG9ydHMuTGl0ZXJhbCA9IExpdGVyYWxcbmV4cG9ydHMuX251bGwgPSBfbnVsbCA9IG5ldyBMaXRlcmFsICdudWxsJ1xuI1xuY2xhc3MgRXhwckxpc3QgZXh0ZW5kcyBOb2RlXG4gIGNvbnN0cnVjdG9yOiAoY2hpbGQsIGtpbmQpIC0+XG4gICAgc3VwZXIoa2luZCB8fCAnRXhwckxpc3QnKVxuICAgIGlmKGNoaWxkKVxuICAgICAgQGFkZChjaGlsZClcblxuZXhwb3J0cy5FeHByTGlzdCA9IEV4cHJMaXN0O1xuI1xuY2xhc3MgQmxvY2sgZXh0ZW5kcyBFeHByTGlzdFxuICBjb25zdHJ1Y3RvcjogKGNoaWxkLCBraW5kKSAtPlxuICAgIHN1cGVyKGNoaWxkLCBraW5kIHx8ICdCbG9jaycpXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIG5vZGVzOiBAbm9kZXN9XG5cbmV4cG9ydHMuQmxvY2sgPSBCbG9jaztcbiNcbiNNb2R1bGVcbiNcbmNsYXNzIE1vZHVsZSBleHRlbmRzIEJsb2NrXG4gIGNvbnN0cnVjdG9yOiAoY2hpbGQpIC0+XG4gICAgc3VwZXIoY2hpbGQsICdNb2R1bGUnKVxuXG5leHBvcnRzLk1vZHVsZSA9IE1vZHVsZVxuXG5jbGFzcyBTbmlwcGV0IGV4dGVuZHMgTm9kZVxuICBjb25zdHJ1Y3RvcjogKHQpIC0+XG4gICAgc3VwZXIgJ1NuaXBwZXQnXG4gICAgdCA9IHQuc2xpY2UgMVxuICAgIHQgPSB0LnRyaW0oKVxuICAgIEB0ZXh0ID0gdFxuXG4gIHRvSlNPTjogLT5cbiAgICByZXR1cm4ge2tpbmQ6IEBraW5kLCB0ZXh0OiBAdGV4dH1cblxuZXhwb3J0cy5TbmlwcGV0ID0gU25pcHBldFxuXG5jbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBOb2RlXG4gIEBub2RlICdzdWJqJ1xuICBAbm9kZSAnbGlzdCdcbiAgY29uc3RydWN0b3I6IChAc3ViaiwgQGxpc3QpIC0+XG4gICAgc3VwZXIgJ1BhcmFncmFwaCdcbiAgdG9KU09OOiAtPlxuICAgIGtpbmQ6IEBraW5kXG4gICAgdHlwZTogQHR5cGVcbiAgICBzdWJqOiBAc3VialxuICAgIGxpc3Q6IEBsaXN0XG5cbmV4cG9ydHMuUGFyYWdyYXBoID0gUGFyYWdyYXBoXG5cbmNsYXNzIFNlbnRlbmNlIGV4dGVuZHMgTm9kZVxuICBAbm9kZSAnY2xhdXNlJ1xuICBAbm9kZSAnbGlzdCdcbiAgY29uc3RydWN0b3I6IChAY2xhdXNlLCBAbGlzdCkgLT5cbiAgICBzdXBlciAnU2VudGVuY2UnXG4gIHRvSlNPTjogLT5cbiAgICBraW5kOiBAa2luZFxuICAgIHR5cGU6IEB0eXBlXG4gICAgY2xhdXNlOiBAY2xhdXNlXG4gICAgbGlzdDogQGxpc3RcblxuZXhwb3J0cy5TZW50ZW5jZSA9IFNlbnRlbmNlXG5cbmNsYXNzIENsYXVzZSBleHRlbmRzIE5vZGVcbiAgQG5vZGUgJ3N1YmonXG4gIEBub2RlICd2ZXJiJ1xuICBAbm9kZSAnb2JqJ1xuICBjb25zdHJ1Y3RvcjogKEBzdWJqLCBAdmVyYiwgQG9iaiwgQHR5cGUgPSB0eXBlXyAnQmVsaWV2ZScpIC0+XG4gICAgc3VwZXIoJ0NsYXVzZScpXG4gICAgQHh0cmEgPSB1bmRlZmluZWRcblxuICB0b0pTT046IC0+XG4gICAga2luZDogQGtpbmRcbiAgICB0eXBlOiBAdHlwZVxuICAgIHN1Ymo6IEBzdWJqXG4gICAgdmVyYjogQHZlcmJcbiAgICBvYmo6ICBAb2JqXG4gICAgeHRyYTogQHh0cmFcblxuZXhwb3J0cy5DbGF1c2UgPSBDbGF1c2VcblxuY2xhc3MgVHJpZ2dlciBleHRlbmRzIE5vZGVcbiAgY29uc3RydWN0b3I6IChhcmcpIC0+XG4gICAgc3VwZXIoJ1RyaWdnZXInKVxuICAgIGlmIGFyZyBpbnN0YW5jZW9mIENsYXVzZVxuICAgICAgY2xhdXNlID0gYXJnXG4gICAgICBpZiBjbGF1c2Uuc3ViaiA9PSBfbnVsbFxuICAgICAgICBjbGF1c2UudHlwZSA9IHR5cGVfICdBY2hpZXZlJ1xuICAgICAgICBtc2cgPSBuZXcgQXR0ZW1wdChjbGF1c2UpXG4gICAgICBlbHNlXG4gICAgICAgIGNsYXVzZS50eXBlID0gdHlwZV8gJ0JlbGlldmUnXG4gICAgICAgIG1zZyA9IG5ldyBBc3NlcnQoY2xhdXNlKVxuICAgIGVsc2VcbiAgICAgIG1zZyA9IGFyZ1xuXG4gICAgQGZsYXZvciA9IG1zZy50eXBlXG4gICAgZXhwciA9IG1zZy5hcmdcbiAgICBAdHlwZSA9IGV4cHIudHlwZVxuICAgIGlmIGV4cHIgaW5zdGFuY2VvZiBDbGF1c2VcbiAgICAgIEBzdWJqID0gZXhwci5zdWJqXG4gICAgICBAdmVyYiA9IGV4cHIudmVyYlxuICAgICAgQG9iaiA9IGV4cHIub2JqXG4gICAgICBAeHRyYSA9IGV4cHIueHRyYVxuICAgICAgQGJpbmRpbmcgPSBleHByLmJpbmRpbmdcbiAgICBlbHNlIGlmIGV4cHIgaW5zdGFuY2VvZiBWYXJpYWJsZVxuICAgICAgQGJpbmRpbmcgPSBleHByXG5cbiAgdG9KU09OOiAtPiB7a2luZDogQGtpbmQsIGZsYXZvcjogQGZsYXZvciwgdHlwZTogQHR5cGUsIHN1Ymo6IEBzdWJqLCB2ZXJiOiBAdmVyYiwgb2JqOiBAb2JqLCB4dHJhOiBAeHRyYSwgYmluZGluZzogQGJpbmRpbmd9XG5cbmV4cG9ydHMuVHJpZ2dlciA9IFRyaWdnZXJcblxuY2xhc3MgVW5hcnlFeHByIGV4dGVuZHMgTm9kZVxuICBAbm9kZSAnYXJnJ1xuICBjb25zdHJ1Y3RvcjogKEBhcmcsIGtpbmQgPSAnVW5hcnlFeHByJykgLT5cbiAgICBzdXBlcihraW5kKVxuXG4gIHRvSlNPTjogLT5cbiAgICByZXR1cm4ge2tpbmQ6IEBraW5kLCBhcmc6IEBhcmd9XG5cbmV4cG9ydHMuVW5hcnlFeHByID0gVW5hcnlFeHByXG5cbmNsYXNzIFByZWZpeEV4cHIgZXh0ZW5kcyBVbmFyeUV4cHJcbiAgY29uc3RydWN0b3I6IChhcmcsIGtpbmQgPSAnUHJlZml4RXhwcicpIC0+XG4gICAgc3VwZXIoYXJnLCBraW5kKVxuXG5leHBvcnRzLlByZWZpeEV4cHIgPSBQcmVmaXhFeHByXG5cbiMjI1xuTWVzc2FnZXNcbiMjI1xuZXhwb3J0cy5fUHJvcG9zZSA9IF9Qcm9wb3NlID0gYnVpbHRpbl8gJ1Byb3Bvc2UnXG5leHBvcnRzLl9BdHRlbXB0ID0gX0F0dGVtcHQgPSBidWlsdGluXyAnQXR0ZW1wdCdcbmV4cG9ydHMuX0Fzc2VydCA9IF9Bc3NlcnQgPSBidWlsdGluXyAnQXNzZXJ0J1xuZXhwb3J0cy5fUmV0cmFjdCA9IF9SZXRyYWN0ID0gYnVpbHRpbl8gJ1JldHJhY3QnXG5cbmNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBQcmVmaXhFeHByXG4gIGNvbnN0cnVjdG9yOiAoYXJnLCBAdHlwZSA9IF9Bc3NlcnQpIC0+XG4gICAgc3VwZXIoYXJnLCAnTWVzc2FnZScpXG4gICAgaWYgYXJnIGluc3RhbmNlb2YgQ2xhdXNlXG4gICAgICBjbGF1c2UgPSBhcmdcbiAgICAgIGlmIGNsYXVzZS5zdWJqID09IF9udWxsXG4gICAgICAgIGNsYXVzZS50eXBlID0gdHlwZV8gJ0FjaGlldmUnXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIHR5cGU6IEB0eXBlLCBhcmc6IEBhcmd9XG5cbmV4cG9ydHMuTWVzc2FnZSA9IE1lc3NhZ2VcblxuY2xhc3MgUHJvcG9zZSBleHRlbmRzIE1lc3NhZ2VcbiAgY29uc3RydWN0b3I6IChhcmcpIC0+XG4gICAgc3VwZXIoYXJnLCBfUHJvcG9zZSlcblxuZXhwb3J0cy5Qcm9wb3NlID0gUHJvcG9zZVxuXG5jbGFzcyBBdHRlbXB0IGV4dGVuZHMgTWVzc2FnZVxuICBjb25zdHJ1Y3RvcjogKGFyZykgLT5cbiAgICBzdXBlcihhcmcsIF9BdHRlbXB0KVxuXG5leHBvcnRzLkF0dGVtcHQgPSBBdHRlbXB0XG5cbmNsYXNzIEFzc2VydCBleHRlbmRzIE1lc3NhZ2VcbiAgY29uc3RydWN0b3I6IChhcmcpIC0+XG4gICAgc3VwZXIoYXJnLCBfQXNzZXJ0KVxuXG5leHBvcnRzLkFzc2VydCA9IEFzc2VydFxuXG5jbGFzcyBSZXRyYWN0IGV4dGVuZHMgTWVzc2FnZVxuICBjb25zdHJ1Y3RvcjogKGFyZykgLT5cbiAgICBzdXBlcihhcmcsIF9SZXRyYWN0KVxuXG5leHBvcnRzLlJldHJhY3QgPSBSZXRyYWN0XG5cbmNsYXNzIFBvc3RmaXhFeHByIGV4dGVuZHMgVW5hcnlFeHByXG4gIGNvbnN0cnVjdG9yOiAoYXJnLCBraW5kID0gJ1Bvc3RmaXhFeHByJykgLT5cbiAgICBzdXBlcihhcmcsIGtpbmQpXG5cbmV4cG9ydHMuUG9zdGZpeEV4cHIgPSBQb3N0Zml4RXhwclxuXG5jbGFzcyBCaW5hcnlFeHByIGV4dGVuZHMgTm9kZVxuICBAbm9kZSAnbGVmdCdcbiAgQG5vZGUgJ3JpZ2h0J1xuICBjb25zdHJ1Y3RvcjogKEBsZWZ0LCBAcmlnaHQsIGtpbmQgPSAnQmluYXJ5RXhwcicpIC0+XG4gICAgc3VwZXIoa2luZClcblxuICB0b0pTT046IC0+XG4gICAgcmV0dXJuIHtraW5kOiBAa2luZCwgb3A6IEBvcCwgbGVmdDogQGxlZnQsIHJpZ2h0OiBAcmlnaHR9XG5cbmV4cG9ydHMuQmluYXJ5RXhwciA9IEJpbmFyeUV4cHJcblxuY2xhc3MgQ29udGV4dHVhbGl6ZSBleHRlbmRzIE5vZGVcbiAgQG5vZGUgJ2xlZnQnXG4gIEBub2RlICdyaWdodCdcbiAgY29uc3RydWN0b3I6IChAbGVmdCwgQHJpZ2h0KSAtPlxuICAgIHN1cGVyKCdDb250ZXh0dWFsaXplJylcblxuICB0b0pTT046IC0+XG4gICAgcmV0dXJuIHtraW5kOiBAa2luZCwgbGVmdDogQGxlZnQsIHJpZ2h0OiBAcmlnaHR9XG5cbmV4cG9ydHMuQ29udGV4dHVhbGl6ZSA9IENvbnRleHR1YWxpemVcblxuY2xhc3MgU3RhdGVtZW50IGV4dGVuZHMgTm9kZVxuICBjb25zdHJ1Y3RvcjogKGtpbmQpIC0+XG4gICAgc3VwZXIoa2luZCB8fCAnU3RhdGVtZW50JylcblxuICB0b0pTT046IC0+XG4gICAgcmV0dXJuIHtraW5kOiBAa2luZH1cblxuZXhwb3J0cy5TdGF0ZW1lbnQgPSBTdGF0ZW1lbnRcblxuY2xhc3MgRGVmIGV4dGVuZHMgU3RhdGVtZW50XG4gIEBub2RlICd0cmlnZ2VyJ1xuICBAbm9kZSAnYm9keSdcbiAgY29uc3RydWN0b3I6IChAdHJpZ2dlciwgQGJvZHksIGtpbmQgPSAnRGVmJykgLT5cbiAgICBzdXBlcihraW5kKVxuXG4gIHRvSlNPTjogLT5cbiAgICByZXR1cm4ge2tpbmQ6IEBraW5kLCBuYW1lOiBAbmFtZSwgdHJpZ2dlcjogQHRyaWdnZXIsIGJvZHk6IEBib2R5fVxuXG5leHBvcnRzLkRlZiA9IERlZlxuXG5jbGFzcyBEZWZHIGV4dGVuZHMgRGVmXG4gIGNvbnN0cnVjdG9yOiAodHJpZ2dlciwgYm9keSkgLT5cbiAgICBzdXBlcih0cmlnZ2VyLCBib2R5LCAnRGVmRycpXG5leHBvcnRzLkRlZkcgPSBEZWZHXG5cbmNsYXNzIEltcG9ydFN0bXQgZXh0ZW5kcyBTdGF0ZW1lbnRcbiAgY29uc3RydWN0b3I6IChleHByKSAtPlxuICAgIHN1cGVyKCdJbXBvcnRTdG10JylcbiAgICBAZXhwciA9IGV4cHJcblxuICB0b0pTT046IC0+XG4gICAgcmV0dXJuIHtraW5kOiBAa2luZCwgZXhwcjogQGV4cHJ9XG5cbmV4cG9ydHMuSW1wb3J0U3RtdCA9IEltcG9ydFN0bXRcblxuY2xhc3MgQ2FsbFN0bXQgZXh0ZW5kcyBTdGF0ZW1lbnRcbiAgQG5vZGUgJ2V4cHInXG4gIGNvbnN0cnVjdG9yOiAoQGV4cHIpIC0+XG4gICAgc3VwZXIoJ0NhbGxTdG10JylcblxuICB0b0pTT046IC0+XG4gICAgcmV0dXJuIHtraW5kOiBAa2luZCwgZXhwcjogQGV4cHJ9XG5cbmV4cG9ydHMuQ2FsbFN0bXQgPSBDYWxsU3RtdFxuXG4jXG5jbGFzcyBRdWVyeSBleHRlbmRzIFN0YXRlbWVudFxuICBAbm9kZSAnbGhzJ1xuICBAbm9kZSAncmhzJ1xuICBjb25zdHJ1Y3RvcjogKEBsaHMsIEByaHMpIC0+XG4gICAgc3VwZXIoJ1F1ZXJ5JylcblxuICB0b0pTT046IC0+IHtraW5kOiBAa2luZCwgbGhzOiBAbGhzLCByaHM6IEByaHN9XG5cbmV4cG9ydHMuUXVlcnkgPSBRdWVyeTtcblxuY2xhc3MgQ29uZGl0aW9uIGV4dGVuZHMgTm9kZVxuICBAbm9kZSAnZXhwcidcbiAgY29uc3RydWN0b3I6IChAZXhwciwga2luZCkgLT5cbiAgICBzdXBlcihraW5kIHx8ICdDb25kaXRpb24nKVxuXG4gIHRvSlNPTjogLT5cbiAgICByZXR1cm4ge2tpbmQ6IEBraW5kLCBleHByOiBAZXhwcn1cblxuZXhwb3J0cy5Db25kaXRpb24gPSBDb25kaXRpb25cblxuY2xhc3MgUUNsYXVzZSBleHRlbmRzIENvbmRpdGlvblxuICBjb25zdHJ1Y3RvcjogKGV4cHIpIC0+XG4gICAgc3VwZXIoZXhwciwgJ1FDbGF1c2UnKVxuXG5leHBvcnRzLlFDbGF1c2UgPSBRQ2xhdXNlXG5cbmNsYXNzIFFOZWdDbGF1c2UgZXh0ZW5kcyBDb25kaXRpb25cbiAgY29uc3RydWN0b3I6IChleHByKSAtPlxuICAgIHN1cGVyKGV4cHIsICdRTmVnQ2xhdXNlJylcblxuZXhwb3J0cy5RTmVnQ2xhdXNlID0gUU5lZ0NsYXVzZVxuXG5jbGFzcyBRRmlsdGVyIGV4dGVuZHMgQ29uZGl0aW9uXG4gIGNvbnN0cnVjdG9yOiAoZXhwcikgLT5cbiAgICBzdXBlcihleHByLCAnUUZpbHRlcicpXG5cbmV4cG9ydHMuUUZpbHRlciA9IFFGaWx0ZXJcblxuY2xhc3MgTGhzIGV4dGVuZHMgRXhwckxpc3RcbiAgY29uc3RydWN0b3I6IChjaGlsZCwga2luZCkgLT5cbiAgICBzdXBlcihjaGlsZCwgJ0xocycpXG5cbmV4cG9ydHMuTGhzID0gTGhzXG5cbmNsYXNzIFJocyBleHRlbmRzIEJsb2NrXG4gIGNvbnN0cnVjdG9yOiAoY2hpbGQsIGtpbmQpIC0+XG4gICAgc3VwZXIoY2hpbGQsICdSaHMnKVxuXG5leHBvcnRzLlJocyA9IFJoc1xuI1xuY2xhc3MgQWN0aW9uIGV4dGVuZHMgTm9kZVxuICBjb25zdHJ1Y3RvcjogKEBib2R5LCBraW5kKSAtPlxuICAgIHN1cGVyKGtpbmQpXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIGJvZHk6IEBib2R5fVxuXG5leHBvcnRzLkFjdGlvbiA9IEFjdGlvblxuI1xuY2xhc3MgUmV0dXJuIGV4dGVuZHMgTm9kZVxuICBjb25zdHJ1Y3RvcjogKGV4cHIpIC0+XG4gICAgc3VwZXIoJ1JldHVybicpXG4gICAgQGV4cHIgPSBleHByXG5cbiAgdG9KU09OOiAtPlxuICAgIHJldHVybiB7a2luZDogQGtpbmQsIGV4cHI6IEBleHByfVxuXG5leHBvcnRzLlJldHVybiA9IFJldHVyblxuIl19
