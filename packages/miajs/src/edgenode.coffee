Function::TEdgeNode = ->
  proto =
    _TEdgeNode:
      edgeCount: 0
    add: (child) ->
      @edges.push {label: 'child', target: child}
    remove: (child) ->
      for i in [0...@edges.length -1]
        if @edges[i].target = child then break
      if i > -1 then @nodes.splice(i, 1)
    walk: (fn) ->
      fn.apply(this)
      for child from this
        child.walk(fn)
  proto[Symbol.iterator] = ->
    for edge from @edges
      yield edge.target
  Object.assign @prototype, proto

Function::edge = (name) ->
  index = @prototype._TEdgeNode.edgeCount++
  getter = ->
    @edges[index].target
  setter = (val) ->
    @edges[index] = {label: name, target: val}
  desc =
    get: getter
    set: setter
  Object.defineProperty @prototype, name, desc
