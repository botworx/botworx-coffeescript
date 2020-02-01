Function::TNode = ->
  proto =
    _TNode:
      nodeCount: 0

    add: (child) ->
      #child.parent = @
      @nodes.push(child)

    remove: (child) ->
      index = @nodes.indexOf(child)
      if index > -1 then @nodes.splice(index, 1)

    walk: (fn) ->
      fn.apply(this)
      for child in @nodes
        child.walk(fn)

  proto[Symbol.iterator] = ->
    for node from @nodes
      yield node

  Object.assign @prototype, proto

Function::node = (name) ->
  index = @prototype._TNode.nodeCount++
  getter = ->
    @nodes[index]
  setter = (val) ->
    @nodes[index] = val
  desc =
    get: getter
    set: setter
  Object.defineProperty @prototype, name, desc
