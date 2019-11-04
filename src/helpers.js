function objectMap(object, mapFn) {
  return Object.keys(object).reduce((acc, key) => {
    const result = acc;
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

function groupBy(xs, key) {
  return xs.reduce((acc, x) => {
    const rv = acc;
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export { objectMap, groupBy };
