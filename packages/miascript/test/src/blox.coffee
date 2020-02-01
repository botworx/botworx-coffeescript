{unit_, lex, parse, transform, analyze, transpile, compile, evaluate} = require('./common')
$$ = unit_ module

data =
'''
Table1 :Table
  isClear true

Block1 :Block
  onTop Table1

Block2 :Block
  onTop Block1

Block3 :Block
  onTop Block2
  isClear true

+ Achieve: stack Block1 on: Block2
+ Achieve: stack Block2 on: Block3

defg (impasse)
  | 'Impassed'
  where
    ($g :Goal) status Active
  -->
    /* $g
  !=>
    halt

def (+ $g :Goal)
  + $g status Active

def (- $g :Goal)
  - $g status Active

def (stack $x on: $y -> $g)
  where
    ! $x isClear true
  -->
    /clear $x
  ==>
    return
  #else
  where
    ! $y isClear true
  -->
    /clear $y
  ==>
    return
  #else
  where
    $x onTop $z
  -->
    - $x onTop $z

  + $x onTop $y

  - $g

def (goodbye)
  | String(@rnr.ctx)

goodbye
'''

describe 'Blox', ->
  it 'should work', ->
    #$$._ lex data
    #$$._ JSON.stringify (parse data), null, 2
    #$$._ JSON.stringify (transform data), null, 2
    #$$._ JSON.stringify (analyze data), null, 2
    $$._ transpile data
    #$$._ compile data
    evaluate data
