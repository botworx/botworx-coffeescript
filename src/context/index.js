for (let name of [
    'context',
    'yamlcontext'
  ]) {
  const m = require(`./${name}`);
  exports[name] = m;
  for (let k in m) {
    const v = m[k];
    exports[k] = m[k];
  }
}
