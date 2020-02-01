fs = require('fs')
stream = require('stream')
path = require('path')
{compile} = require './index'
run = ->
  fileName = process.argv[2]
  ext = path.extname fileName
  if ext == ''
    fileName += '.mia'

  console.log("Compiling " + fileName)

  fs.readFile fileName, 'utf8', (err, data) ->
    if (err)
      console.log("ERROR: ", err)
      return false
    #
    code = compile data, {filename: fileName}
    #
    outFileName = fileName.substr(0, fileName.lastIndexOf(".")) + ".js"
    out = fs.createWriteStream(outFileName)
    out.write code
    out.end()

exports.run = run
