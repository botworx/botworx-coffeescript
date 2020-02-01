class Policy
  constructor: ->
    @parent = null
    @rules = []

  add: (r) ->
    @rules.push(r)

  find: (msg) ->
    result = []
    for r in @rules
      if r.match(msg)
        result.push(r)
    policy = @parent
    while policy
      rules = policy.find(msg)
      result = result.concat(rules)
      policy = policy.parent
    return result

  match: (msg) ->
    for r in @rules
      if m = r.match(msg)
        yield m
    policy = @parent
    while policy
      yield from policy.match(msg)
      policy = policy.parent

exports.Policy = Policy
