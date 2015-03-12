var _ = require('underscore');

var Types = require('./types');
var addons = require('./addons');

var map = function (source, mapping, container) {
  var result = container || {};
  _.each(mapping, function (ref, key) {
    result[key] = dig(source, ref);
  });
  return result;
};

var dig = function (source, ref) {
  if (ref instanceof Types.Repeat) {
    return _.map(resolve(source, ref.node), function (subSource) {
      return dig(subSource, ref.mapping);
    });
  }
  if (ref instanceof Types.CustomFunction) {
    return ref.func(source);
  }
  if (ref instanceof Types.Constant) {
    return ref.value;
  }
  if (typeof ref === 'function') {
    return ref(source);
  }
  if (ref instanceof Array) {
    return map(source, ref, []);
  }
  if (typeof ref === 'object') {
    return map(source, ref);
  }
  if (typeof ref === 'string') {
    return tunnel(ref)(_.partial(resolve, source));
  }
}

var resolve = function (source, path) {
  var result = source;
  var pathes = path.split('.');
  _.each(pathes, function (path) {
    if (typeof result === 'object') {
      result = result[path];
    }
  });
  return result;
};

var tunnel = function (str) {
  var strs = str.split('|');
  var functions = strs.slice(1).map(function (str) {
    return addons[str] || function (str) {
      return str;
    };
  });
  return function (resolver) {
    var val = resolver(strs[0]);
    functions.forEach(function (func) {
      val = func(val);
    });
    return val;
  };
};

module.exports = map;
