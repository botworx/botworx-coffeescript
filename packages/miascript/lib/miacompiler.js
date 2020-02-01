(function() {
  var Analyzer, AstVisitor, CompilerBase, MiaCompiler, _Assert, _Attempt, _Propose, _terms, _types;

  AstVisitor = require('./astvisitor').AstVisitor;

  Analyzer = require('./analyzer').Analyzer;

  ({_terms, _types, _Propose, _Attempt, _Assert} = require('./yy'));

  CompilerBase = class CompilerBase extends AstVisitor {
    constructor() {
      super();
      this.delegator_({
        Array: this.visitArray,
        Literal: this.visitLiteral,
        Variable: this.visitVariable,
        Property: this.visitProperty,
        Properties: this.visitProperties,
        Term: this.visitTerm,
        Type: this.visitType,
        Block: this.visitBlock,
        Module: this.visitModule,
        CallStmt: this.visitCallStmt,
        ImportStmt: this.visitImport,
        Def: this.visitDef,
        DefG: this.visitDefG,
        BinaryExpr: this.visitBinaryExpr,
        UnaryExpr: this.visitUnaryExpr,
        Clause: this.visitClause,
        Trigger: this.visitTrigger,
        Query: this.visitQuery,
        QClause: this.visitQClause,
        QNegClause: this.visitQNegClause,
        QFilter: this.visitQFilter,
        "-->": this.visitSuccess,
        Snippet: this.visitSnippet,
        Message: this.visitMessage,
        "=": this.visitBinaryExpr,
        "!=": this.visitBinaryExpr
      });
    }

    visitArray(n) {
      var arr, c, i, len, ref;
      arr = [];
      ref = n.nodes;
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        arr.push(this.visit(c));
      }
      return ['[', arr.join(), ']'].join('');
    }

    visitSnippet(n) {
      return this.writeLn(`console.log(${n.text})`);
    }

    visitLiteral(n) {
      return n.value;
    }

    visitVariable(n) {
      return '$' + n.name;
    }

    visitTerm(n) {
      return '_' + n.name;
    }

    visitType(n) {
      return n.name;
    }

    visitProperties(n) {
      var arr, c, i, len, ref;
      arr = [];
      ref = n.nodes;
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        arr.push(this.visit(c));
      }
      return ['{', arr, '}'].join('');
    }

    visitProperty(n) {
      return [n.name, ': ', this.visit(n.value)].join('');
    }

    visitQuery(node) {
      var k, ref, v;
      if (node.scope) {
        ref = node.scope.vars;
        for (k in ref) {
          v = ref[k];
          if (v.type) {
            this.writeLn(`_$${k} = new Variable('$${k}', (v) -> v instanceof ${v.type.name})`);
          } else {
            this.writeLn(`_$${k} = new Variable('$${k}')`);
          }
        }
      }
      this.delegator_({
        Variable: function(n) {
          v = this.scope.find(n.name);
          if (v.qvar) {
            return `_.$${n.name}`;
          } else {
            return visitVariable(n);
          }
        }
      });
      return this.visitNode(node);
    }

    visitBlock(node) {
      var k, ref, v;
      if (node.scope) {
        ref = node.scope.vars;
        for (k in ref) {
          v = ref[k];
          this.writeLn(['$', k, ' = ', v.value].join(''));
        }
      }
      return this.visitNode(node);
    }

    visitModule(n) {
      var k, v;
      this.write("miajs = require('miajs')\n{Context, Term, Goal, Believe, Achieve, Assert, Retract, Attempt} = miajs\n{__, $_, _$, module_, Message, Rule, Trigger, Variable, runner_} = miajs");
      this.writeLn('');
      for (k in _types) {
        v = _types[k];
        if (!v.builtin) {
          this.writeLn(['class ', k, ' extends Term'].join(''));
        }
      }
      for (k in _terms) {
        v = _terms[k];
        if (v.type) {
          this.writeLn(['_', k, " = $_('", k, `', ${v.type.name})`].join(''));
        } else {
          this.writeLn(['_', k, " = $_('", k, "')"].join(''));
        }
      }
      this.writeLn("module.exports = module_ ->");
      this.indent();
      this.visitBlock(n);
      this.dedent();
      if (!this.options.filename) { //were running in a sandbox
        return this.writeLn("runner_().run(module.exports)");
      } else {
        return this.writeLn("if require.main == module then runner_().run(module.exports)");
      }
    }

    visitImport(n) {
      return this.writeLn(['require(', n.expr.value, ').action.call(this)'].join(''));
    }

    visitDef(n) {
      this.writeLn(['@def ', this.visit(n.trigger), ', ->'].join(''));
      this.indent();
      this.visit(n.body);
      return this.dedent();
    }

    visitDefG(n) {
      this.writeLn(['@defg ', this.visit(n.trigger), ', ->'].join(''));
      this.indent();
      this.visit(n.body);
      return this.dedent();
    }

    visitTrigger(node) {
      this.save();
      this.delegator_({
        Variable: function(n) {
          return '__';
        }
      });
      return ['new Trigger(', [this.visit(node.flavor), this.visit(node.type), this.visit(node.subj) || '__', this.visit(node.verb) || '__', this.visit(node.obj) || '__', this.visit(node.xtra) || '__'].join(), ')'].join('');
    }

    visitMessage(n) {
      var c, i, len, list, results;
      if (Array.isArray(n.arg)) {
        list = n.arg;
      } else {
        list = [n.arg];
      }
      results = [];
      for (i = 0, len = list.length; i < len; i++) {
        c = list[i];
        switch (n.type) {
          case _Assert:
            results.push(this.writeLn(["@assert(", this.visit(c), ")"].join('')));
            break;
          case _Attempt:
            results.push(this.visitCallStmt(n));
            break;
          case _Propose:
            results.push(this.writeLn(["@propose(", this.visit(c), ")"].join('')));
            break;
          default:
            results.push(void 0);
        }
      }
      return results;
    }

    visitCallStmt(n) {
      return this.writeLn(['yield @call(', [this.visit(n.arg.subj), this.visit(n.arg.verb), this.visit(n.arg.obj)].join(), ')'].join(''));
    }

    visitClause(n) {
      return [
        'new ',
        this.visit(n.type),
        '(',
        [this.visit(n.subj),
        this.visit(n.verb),
        this.visit(n.obj),
        this.visit(n.xtra)].filter(function(x) {
          if (x) {
            return x;
          }
        }).join(),
        ')'
      ].join('');
    }

    visitQClause(node) {
      var c, header;
      this.delegator_({
        Variable: function(n) {
          if (n.info.qvar) {
            return '_$' + n.name;
          } else {
            return '$' + n.name;
          }
        }
      });
      c = node.expr;
      header = node.first ? "@rnr.ctx.query(" : ".and(";
      return this.writeLn([header, [this.visit(c.type), this.visit(c.subj), this.visit(c.verb), this.visit(c.obj)].join(), ")"].join(''));
    }

    visitQNegClause(node) {
      var c, header;
      this.delegator_({
        Variable: function(n) {
          if (n.info.qvar) {
            return '_$' + n.name;
          } else {
            return '$' + n.name;
          }
        }
      });
      c = node.expr;
      header = node.first ? "@rnr.ctx.query(" : ".not(";
      return this.writeLn([header, [this.visit(c.type), this.visit(c.subj), this.visit(c.verb), this.visit(c.obj)].join(), ")"].join(''));
    }

    visitQFilter(node) {
      return this.writeLn([".filter((_) -> ", this.visit(node.expr), ")"].join(''));
    }

    visitSuccess(node) {
      this.writeLn(".exec (_) =>");
      this.indent();
      this.visit(node.body);
      return this.dedent();
    }

    visitUnaryExpr(n) {
      return [`${n.kind} `, this.visit(n.arg)].join('');
    }

    visitBinaryExpr(n) {
      return [this.visit(n.left), ` ${n.kind} `, this.visit(n.right)].join('');
    }

  };

  MiaCompiler = class MiaCompiler extends CompilerBase {
    constructor(out) {
      super();
      this.out = out;
      this.indentlevel = 0;
      this.indentation = '';
      this.analyzer = new Analyzer();
    }

    compile(ast, options) {
      this.options = options || {};
      this.analyzer.analyze(ast, options);
      return this.visit(ast);
    }

    write(s) {
      //console.log(s)
      if (this.out === void 0) {
        return;
      }
      return this.out.write(s);
    }

    writeLn(s) {
      //console.log(@indentation + s)
      if (this.out === void 0) {
        return;
      }
      return this.out.write(this.indentation + s + '\n');
    }

    indent(s) {
      this.indentlevel += 1;
      return this.indentation = (new Array(this.indentlevel + 1)).join('  ');
    }

    dedent(s) {
      this.indentlevel -= 1;
      return this.indentation = (new Array(this.indentlevel + 1)).join('  ');
    }

  };

  exports.MiaCompiler = MiaCompiler;

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlhY29tcGlsZXIuanMiLCJzb3VyY2VzIjpbIm1pYWNvbXBpbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxZQUFBLEVBQUEsV0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQTs7RUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGNBQVIsQ0FBdUIsQ0FBQzs7RUFDckMsUUFBQSxHQUFXLE9BQUEsQ0FBUSxZQUFSLENBQXFCLENBQUM7O0VBQ2pDLENBQUEsQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixRQUFqQixFQUEyQixRQUEzQixFQUFxQyxPQUFyQyxDQUFBLEdBQWdELE9BQUEsQ0FBUSxNQUFSLENBQWhEOztFQUVNLGVBQU4sTUFBQSxhQUFBLFFBQTJCLFdBQTNCO0lBQ0UsV0FBYSxDQUFBLENBQUE7V0FDWCxDQUFBO01BQ0EsSUFBQyxDQUFBLFVBQUQsQ0FDRTtRQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsVUFBUjtRQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsWUFEVjtRQUVBLFFBQUEsRUFBVSxJQUFDLENBQUEsYUFGWDtRQUdBLFFBQUEsRUFBVSxJQUFDLENBQUEsYUFIWDtRQUlBLFVBQUEsRUFBWSxJQUFDLENBQUEsZUFKYjtRQUtBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FMUDtRQU1BLElBQUEsRUFBTSxJQUFDLENBQUEsU0FOUDtRQU9BLEtBQUEsRUFBTyxJQUFDLENBQUEsVUFQUjtRQVFBLE1BQUEsRUFBUSxJQUFDLENBQUEsV0FSVDtRQVNBLFFBQUEsRUFBVSxJQUFDLENBQUEsYUFUWDtRQVVBLFVBQUEsRUFBWSxJQUFDLENBQUEsV0FWYjtRQVdBLEdBQUEsRUFBSyxJQUFDLENBQUEsUUFYTjtRQVlBLElBQUEsRUFBTSxJQUFDLENBQUEsU0FaUDtRQWFBLFVBQUEsRUFBWSxJQUFDLENBQUEsZUFiYjtRQWNBLFNBQUEsRUFBVyxJQUFD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VCxNQUFRLENBQUMsQ0FBRCxDQUFBO01BQ04sSUFBQyxDQUFBLFdBQUQsSUFBZ0I7YUFDaEIsSUFBQyxDQUFBLFdBQUQsR0FBZSxDQUFDLElBQUksS0FBSixDQUFVLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0FBekIsQ0FBRCxDQUE2QixDQUFDLElBQTlCLENBQW1DLElBQW5DO0lBRlQ7O0lBSVIsTUFBUSxDQUFDLENBQUQsQ0FBQTtNQUNOLElBQUMsQ0FBQSxXQUFELElBQWdCO2FBQ2hCLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0FBQyxJQUFJLEtBQUosQ0FBVSxJQUFDLENBQUEsV0FBRCxHQUFlLENBQXpCLENBQUQsQ0FBNkIsQ0FBQyxJQUE5QixDQUFtQyxJQUFuQztJQUZUOztFQTVCVjs7RUFnQ0EsT0FBTyxDQUFDLFdBQVIsR0FBc0I7QUFoU3RCIiwic291cmNlc0NvbnRlbnQiOlsiQXN0VmlzaXRvciA9IHJlcXVpcmUoJy4vYXN0dmlzaXRvcicpLkFzdFZpc2l0b3JcbkFuYWx5emVyID0gcmVxdWlyZSgnLi9hbmFseXplcicpLkFuYWx5emVyXG57X3Rlcm1zLCBfdHlwZXMsIF9Qcm9wb3NlLCBfQXR0ZW1wdCwgX0Fzc2VydH0gPSByZXF1aXJlICcuL3l5J1xuXG5jbGFzcyBDb21waWxlckJhc2UgZXh0ZW5kcyBBc3RWaXNpdG9yXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyKClcbiAgICBAZGVsZWdhdG9yX1xuICAgICAgQXJyYXk6IEB2aXNpdEFycmF5XG4gICAgICBMaXRlcmFsOiBAdmlzaXRMaXRlcmFsXG4gICAgICBWYXJpYWJsZTogQHZpc2l0VmFyaWFibGVcbiAgICAgIFByb3BlcnR5OiBAdmlzaXRQcm9wZXJ0eVxuICAgICAgUHJvcGVydGllczogQHZpc2l0UHJvcGVydGllc1xuICAgICAgVGVybTogQHZpc2l0VGVybVxuICAgICAgVHlwZTogQHZpc2l0VHlwZVxuICAgICAgQmxvY2s6IEB2aXNpdEJsb2NrXG4gICAgICBNb2R1bGU6IEB2aXNpdE1vZHVsZVxuICAgICAgQ2FsbFN0bXQ6IEB2aXNpdENhbGxTdG10XG4gICAgICBJbXBvcnRTdG10OiBAdmlzaXRJbXBvcnRcbiAgICAgIERlZjogQHZpc2l0RGVmXG4gICAgICBEZWZHOiBAdmlzaXREZWZHXG4gICAgICBCaW5hcnlFeHByOiBAdmlzaXRCaW5hcnlFeHByXG4gICAgICBVbmFyeUV4cHI6IEB2aXNpdFVuYXJ5RXhwclxuICAgICAgQ2xhdXNlOiBAdmlzaXRDbGF1c2VcbiAgICAgIFRyaWdnZXI6IEB2aXNpdFRyaWdnZXJcbiAgICAgIFF1ZXJ5OiBAdmlzaXRRdWVyeVxuICAgICAgUUNsYXVzZTogQHZpc2l0UUNsYXVzZVxuICAgICAgUU5lZ0NsYXVzZTogQHZpc2l0UU5lZ0NsYXVzZVxuICAgICAgUUZpbHRlcjogQHZpc2l0UUZpbHRlclxuICAgICAgXCItLT5cIjogQHZpc2l0U3VjY2Vzc1xuICAgICAgU25pcHBldDogQHZpc2l0U25pcHBldFxuICAgICAgTWVzc2FnZTogQHZpc2l0TWVzc2FnZVxuICAgICAgXCI9XCI6IEB2aXNpdEJpbmFyeUV4cHJcbiAgICAgIFwiIT1cIjogQHZpc2l0QmluYXJ5RXhwclxuXG4gIHZpc2l0QXJyYXk6IChuKSAtPlxuICAgIGFyciA9IFtdXG4gICAgZm9yIGMgaW4gbi5ub2Rlc1xuICAgICAgYXJyLnB1c2goQHZpc2l0KGMpKVxuICAgIFtcbiAgICAgICdbJyxcbiAgICAgIGFyci5qb2luKCksXG4gICAgICAnXSdcbiAgICBdLmpvaW4oJycpXG5cbiAgdmlzaXRTbmlwcGV0OiAobikgLT5cbiAgICBAd3JpdGVMbihcImNvbnNvbGUubG9nKCN7bi50ZXh0fSlcIilcblxuICB2aXNpdExpdGVyYWw6IChuKSAtPlxuICAgIG4udmFsdWVcblxuICB2aXNpdFZhcmlhYmxlOiAobikgLT5cbiAgICAnJCcgKyBuLm5hbWVcblxuICB2aXNpdFRlcm06IChuKSAtPlxuICAgICdfJyArIG4ubmFtZVxuXG4gIHZpc2l0VHlwZTogKG4pIC0+XG4gICAgbi5uYW1lXG5cbiAgdmlzaXRQcm9wZXJ0aWVzOiAobikgLT5cbiAgICBhcnIgPSBbXVxuICAgIGZvciBjIGluIG4ubm9kZXNcbiAgICAgIGFyci5wdXNoKEB2aXNpdChjKSlcbiAgICBbXG4gICAgICAneycsXG4gICAgICBhcnIsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJycpXG5cbiAgdmlzaXRQcm9wZXJ0eTogKG4pIC0+XG4gICAgW1xuICAgICAgbi5uYW1lLCAnOiAnLFxuICAgICAgQHZpc2l0KG4udmFsdWUpXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0UXVlcnk6IChub2RlKSAtPlxuICAgIGlmIG5vZGUuc2NvcGVcbiAgICAgIGZvciBrLCB2IG9mIG5vZGUuc2NvcGUudmFyc1xuICAgICAgICBpZiB2LnR5cGVcbiAgICAgICAgICBAd3JpdGVMbiBcIl8kI3trfSA9IG5ldyBWYXJpYWJsZSgnJCN7a30nLCAodikgLT4gdiBpbnN0YW5jZW9mICN7di50eXBlLm5hbWV9KVwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBAd3JpdGVMbiBcIl8kI3trfSA9IG5ldyBWYXJpYWJsZSgnJCN7a30nKVwiXG4gICAgQGRlbGVnYXRvcl9cbiAgICAgIFZhcmlhYmxlOiAobikgLT5cbiAgICAgICAgdiA9IEBzY29wZS5maW5kIG4ubmFtZVxuICAgICAgICBpZiB2LnF2YXIgdGhlbiByZXR1cm4gXCJfLiQje24ubmFtZX1cIiBlbHNlIHJldHVybiB2aXNpdFZhcmlhYmxlIG5cbiAgICBAdmlzaXROb2RlKG5vZGUpXG5cbiAgdmlzaXRCbG9jazogKG5vZGUpIC0+XG4gICAgaWYgbm9kZS5zY29wZVxuICAgICAgZm9yIGssIHYgb2Ygbm9kZS5zY29wZS52YXJzXG4gICAgICAgIEB3cml0ZUxuIFsnJCcsIGssICcgPSAnLCB2LnZhbHVlXS5qb2luKCcnKVxuICAgIEB2aXNpdE5vZGUobm9kZSlcblxuICB2aXNpdE1vZHVsZTogKG4pIC0+XG4gICAgQHdyaXRlIFwiXCJcIlxuICAgIG1pYWpzID0gcmVxdWlyZSgnbWlhanMnKVxuICAgIHtDb250ZXh0LCBUZXJtLCBHb2FsLCBCZWxpZXZlLCBBY2hpZXZlLCBBc3NlcnQsIFJldHJhY3QsIEF0dGVtcHR9ID0gbWlhanNcbiAgICB7X18sICRfLCBfJCwgbW9kdWxlXywgTWVzc2FnZSwgUnVsZSwgVHJpZ2dlciwgVmFyaWFibGUsIHJ1bm5lcl99ID0gbWlhanNcbiAgICBcIlwiXCJcbiAgICBAd3JpdGVMbiAnJ1xuXG4gICAgZm9yIGssIHYgb2YgX3R5cGVzXG4gICAgICBpZiAhdi5idWlsdGluXG4gICAgICAgIEB3cml0ZUxuIFsnY2xhc3MgJywgaywgJyBleHRlbmRzIFRlcm0nXS5qb2luKCcnKVxuXG4gICAgZm9yIGssIHYgb2YgX3Rlcm1zXG4gICAgICBpZiB2LnR5cGVcbiAgICAgICAgQHdyaXRlTG4gWydfJywgaywgXCIgPSAkXygnXCIsIGssIFwiJywgI3t2LnR5cGUubmFtZX0pXCJdLmpvaW4oJycpXG4gICAgICBlbHNlXG4gICAgICAgIEB3cml0ZUxuIFsnXycsIGssIFwiID0gJF8oJ1wiLCBrLCBcIicpXCJdLmpvaW4oJycpXG5cbiAgICBAd3JpdGVMbihcIm1vZHVsZS5leHBvcnRzID0gbW9kdWxlXyAtPlwiKVxuICAgIEBpbmRlbnQoKVxuICAgIEB2aXNpdEJsb2NrKG4pXG4gICAgQGRlZGVudCgpXG4gICAgaWYgIUBvcHRpb25zLmZpbGVuYW1lICN3ZXJlIHJ1bm5pbmcgaW4gYSBzYW5kYm94XG4gICAgICBAd3JpdGVMbiBcInJ1bm5lcl8oKS5ydW4obW9kdWxlLmV4cG9ydHMpXCJcbiAgICBlbHNlXG4gICAgICBAd3JpdGVMbiBcImlmIHJlcXVpcmUubWFpbiA9PSBtb2R1bGUgdGhlbiBydW5uZXJfKCkucnVuKG1vZHVsZS5leHBvcnRzKVwiXG5cbiAgdmlzaXRJbXBvcnQ6IChuKSAtPlxuICAgIEB3cml0ZUxuIFsncmVxdWlyZSgnLCBuLmV4cHIudmFsdWUsICcpLmFjdGlvbi5jYWxsKHRoaXMpJ10uam9pbignJylcblxuICB2aXNpdERlZjogKG4pIC0+XG4gICAgQHdyaXRlTG4oWydAZGVmICcsIEB2aXNpdChuLnRyaWdnZXIpLCAnLCAtPiddLmpvaW4oJycpKVxuICAgIEBpbmRlbnQoKVxuICAgIEB2aXNpdChuLmJvZHkpXG4gICAgQGRlZGVudCgpXG5cbiAgdmlzaXREZWZHOiAobikgLT5cbiAgICBAd3JpdGVMbihbJ0BkZWZnICcsIEB2aXNpdChuLnRyaWdnZXIpLCAnLCAtPiddLmpvaW4oJycpKVxuICAgIEBpbmRlbnQoKVxuICAgIEB2aXNpdChuLmJvZHkpXG4gICAgQGRlZGVudCgpXG5cbiAgdmlzaXRUcmlnZ2VyOiAobm9kZSkgLT5cbiAgICBAc2F2ZSgpXG4gICAgQGRlbGVnYXRvcl9cbiAgICAgIFZhcmlhYmxlOiAobikgLT5cbiAgICAgICAgcmV0dXJuICdfXydcbiAgICBbXG4gICAgICAnbmV3IFRyaWdnZXIoJyxcbiAgICAgIFtcbiAgICAgICAgQHZpc2l0IG5vZGUuZmxhdm9yXG4gICAgICAgIEB2aXNpdCBub2RlLnR5cGVcbiAgICAgICAgQHZpc2l0KG5vZGUuc3ViaikgfHwgJ19fJ1xuICAgICAgICBAdmlzaXQobm9kZS52ZXJiKSB8fCAnX18nXG4gICAgICAgIEB2aXNpdChub2RlLm9iaikgfHwgJ19fJ1xuICAgICAgICBAdmlzaXQobm9kZS54dHJhKSB8fCAnX18nXG4gICAgICBdLmpvaW4oKVxuICAgICAgJyknXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0TWVzc2FnZTogKG4pIC0+XG4gICAgaWYgQXJyYXkuaXNBcnJheSBuLmFyZyB0aGVuIGxpc3QgPSBuLmFyZyBlbHNlIGxpc3QgPSBbbi5hcmddXG4gICAgZm9yIGMgaW4gbGlzdFxuICAgICAgc3dpdGNoIG4udHlwZVxuICAgICAgICB3aGVuIF9Bc3NlcnRcbiAgICAgICAgICBAd3JpdGVMbihbXCJAYXNzZXJ0KFwiLCBAdmlzaXQoYyksIFwiKVwiXS5qb2luKCcnKSlcbiAgICAgICAgd2hlbiBfQXR0ZW1wdFxuICAgICAgICAgIEB2aXNpdENhbGxTdG10IG5cbiAgICAgICAgd2hlbiBfUHJvcG9zZVxuICAgICAgICAgIEB3cml0ZUxuKFtcIkBwcm9wb3NlKFwiLCBAdmlzaXQoYyksIFwiKVwiXS5qb2luKCcnKSlcbiAgdmlzaXRDYWxsU3RtdDogKG4pIC0+XG4gICAgQHdyaXRlTG4oW1xuICAgICAgJ3lpZWxkIEBjYWxsKCcsXG4gICAgICBbXG4gICAgICAgIEB2aXNpdChuLmFyZy5zdWJqKSxcbiAgICAgICAgQHZpc2l0KG4uYXJnLnZlcmIpLFxuICAgICAgICBAdmlzaXQobi5hcmcub2JqKSxcbiAgICAgIF0uam9pbigpXG4gICAgICAnKSdcbiAgICBdLmpvaW4oJycpKVxuXG4gIHZpc2l0Q2xhdXNlOiAobikgLT5cbiAgICBbXG4gICAgICAnbmV3ICcsXG4gICAgICBAdmlzaXQobi50eXBlKSxcbiAgICAgICcoJyxcbiAgICAgIFtcbiAgICAgICAgQHZpc2l0IG4uc3VialxuICAgICAgICBAdmlzaXQgbi52ZXJiXG4gICAgICAgIEB2aXNpdCBuLm9ialxuICAgICAgICBAdmlzaXQgbi54dHJhXG4gICAgICBdLmZpbHRlcigoeCktPiB4IGlmIHgpLmpvaW4oKVxuICAgICAgJyknXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0UUNsYXVzZTogKG5vZGUpIC0+XG4gICAgQGRlbGVnYXRvcl9cbiAgICAgIFZhcmlhYmxlOiAobikgLT5cbiAgICAgICAgaWYgbi5pbmZvLnF2YXJcbiAgICAgICAgICAnXyQnICsgbi5uYW1lXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAnJCcgKyBuLm5hbWVcbiAgICBjID0gbm9kZS5leHByXG4gICAgaGVhZGVyID0gaWYgbm9kZS5maXJzdCB0aGVuIFwiQHJuci5jdHgucXVlcnkoXCIgZWxzZSBcIi5hbmQoXCJcbiAgICBAd3JpdGVMbiBbXG4gICAgICBoZWFkZXJcbiAgICAgIFtcbiAgICAgICAgQHZpc2l0KGMudHlwZSlcbiAgICAgICAgQHZpc2l0KGMuc3ViailcbiAgICAgICAgQHZpc2l0KGMudmVyYilcbiAgICAgICAgQHZpc2l0KGMub2JqKVxuICAgICAgXS5qb2luKClcbiAgICAgIFwiKVwiXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0UU5lZ0NsYXVzZTogKG5vZGUpIC0+XG4gICAgQGRlbGVnYXRvcl9cbiAgICAgIFZhcmlhYmxlOiAobikgLT5cbiAgICAgICAgaWYgbi5pbmZvLnF2YXJcbiAgICAgICAgICAnXyQnICsgbi5uYW1lXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAnJCcgKyBuLm5hbWVcbiAgICBjID0gbm9kZS5leHByXG4gICAgaGVhZGVyID0gaWYgbm9kZS5maXJzdCB0aGVuIFwiQHJuci5jdHgucXVlcnkoXCIgZWxzZSBcIi5ub3QoXCJcbiAgICBAd3JpdGVMbiBbXG4gICAgICBoZWFkZXJcbiAgICAgIFtcbiAgICAgICAgQHZpc2l0KGMudHlwZSlcbiAgICAgICAgQHZpc2l0KGMuc3ViailcbiAgICAgICAgQHZpc2l0KGMudmVyYilcbiAgICAgICAgQHZpc2l0KGMub2JqKVxuICAgICAgXS5qb2luKClcbiAgICAgIFwiKVwiXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0UUZpbHRlcjogKG5vZGUpIC0+XG4gICAgQHdyaXRlTG4gW1xuICAgICAgXCIuZmlsdGVyKChfKSAtPiBcIlxuICAgICAgQHZpc2l0KG5vZGUuZXhwcilcbiAgICAgIFwiKVwiXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0U3VjY2VzczogKG5vZGUpIC0+XG4gICAgQHdyaXRlTG4gXCIuZXhlYyAoXykgPT5cIlxuICAgIEBpbmRlbnQoKVxuICAgIEB2aXNpdChub2RlLmJvZHkpXG4gICAgQGRlZGVudCgpXG5cbiAgdmlzaXRVbmFyeUV4cHI6IChuKSAtPlxuICAgIFtcbiAgICAgIFwiI3tuLmtpbmR9IFwiXG4gICAgICBAdmlzaXQobi5hcmcpXG4gICAgXS5qb2luKCcnKVxuXG4gIHZpc2l0QmluYXJ5RXhwcjogKG4pIC0+XG4gICAgW1xuICAgICAgQHZpc2l0KG4ubGVmdClcbiAgICAgIFwiICN7bi5raW5kfSBcIlxuICAgICAgQHZpc2l0KG4ucmlnaHQpXG4gICAgXS5qb2luKCcnKVxuXG5jbGFzcyBNaWFDb21waWxlciBleHRlbmRzIENvbXBpbGVyQmFzZVxuICBjb25zdHJ1Y3RvcjogKEBvdXQpIC0+XG4gICAgc3VwZXIoKVxuICAgIEBpbmRlbnRsZXZlbCA9IDBcbiAgICBAaW5kZW50YXRpb24gPSAnJ1xuICAgIEBhbmFseXplciA9IG5ldyBBbmFseXplcigpXG5cbiAgY29tcGlsZTogKGFzdCwgb3B0aW9ucykgLT5cbiAgICBAb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBAYW5hbHl6ZXIuYW5hbHl6ZShhc3QsIG9wdGlvbnMpXG4gICAgQHZpc2l0KGFzdClcblxuICB3cml0ZTogKHMpIC0+XG4gICAgI2NvbnNvbGUubG9nKHMpXG4gICAgaWYoQG91dCA9PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm5cbiAgICBAb3V0LndyaXRlKHMpXG5cbiAgd3JpdGVMbjogKHMpIC0+XG4gICAgI2NvbnNvbGUubG9nKEBpbmRlbnRhdGlvbiArIHMpXG4gICAgaWYoQG91dCA9PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm5cbiAgICBAb3V0LndyaXRlKEBpbmRlbnRhdGlvbiArIHMgKyAnXFxuJylcblxuICBpbmRlbnQ6IChzKSAtPlxuICAgIEBpbmRlbnRsZXZlbCArPSAxXG4gICAgQGluZGVudGF0aW9uID0gKG5ldyBBcnJheShAaW5kZW50bGV2ZWwgKyAxKSkuam9pbignICAnKVxuXG4gIGRlZGVudDogKHMpIC0+XG4gICAgQGluZGVudGxldmVsIC09IDFcbiAgICBAaW5kZW50YXRpb24gPSAobmV3IEFycmF5KEBpbmRlbnRsZXZlbCArIDEpKS5qb2luKCcgICcpXG5cbmV4cG9ydHMuTWlhQ29tcGlsZXIgPSBNaWFDb21waWxlclxuIl19
