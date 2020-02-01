(function() {
  var $_, Achieve, Assert, Attempt, Believe, Context, Message, Retract, Rule, Trigger, _$, __, _hello, _say, miajs, module_, runner_;

  miajs = require('miajs');

  ({Context, Believe, Achieve, Assert, Retract, Attempt} = miajs);

  ({__, $_, _$, module_, Message, Rule, Trigger, runner_} = miajs);

  _hello = $_('hello');

  _say = $_('say');

  module.exports = module_(function*() {
    this.def(new Trigger(Attempt, null, _hello, null, Achieve), function*() {
      this.def(new Trigger(Attempt, null, _say, __, Achieve), function() {
        var $t;
        $t = this.msg.clause.obj;
        return console.log($t);
      });
      yield this.call(null, _say, "Hello World");
      return (yield this.call(null, _say, "Goodbye World"));
    });
    return (yield this.call(null, _hello, null));
  });

  if (require.main === module) {
    runner_().run(module.exports);
  }

}).call(this);
