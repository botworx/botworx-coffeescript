/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require('fs');
const {Task} = require('./task');

class Streamer extends Task {
  constructor(action) {
    super(action);
  }
}

class Source extends Streamer {
  constructor(action) {
    super(action);
  }
}

class File extends Source {
  constructor(path, action) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.match(/return (?:_assertThisInitialized\()*(\w+)\)*;/)[1];
      eval(`${thisName} = this;`);
    }
    this.path = path;
    super(action);
  }
}

class ReadFile extends File {
  constructor(path, action) {
    super(path, action);
  }
  init() {
    return this.stream = fs.createReadStream(this.path);
  }
}

exports.ReadFile = ReadFile;

class Writer extends Streamer {
  constructor() {
    super();
  }
}

class ConsoleWriter extends Writer {
  constructor() {
    super();
  }
  init() {
    return this.src.stream.pipe(process.stdout);
  }
}

exports.ConsoleWriter = ConsoleWriter;
