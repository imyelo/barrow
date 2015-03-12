var Repeat = function (node, mapping) {
  if (!(this instanceof Repeat)) {
    return new Repeat(node, mapping);
  }
  this.node = node;
  this.mapping = mapping;
  return this;
};

var Constant = function (value) {
  if (!(this instanceof Constant)) {
    return new Constant(value);
  }
  this.value = value;
  return this;
};

var CustomFunction = function (func) {
  if (!(this instanceof CustomFunction)) {
    return new CustomFunction(func);
  }
  this.func = func;
  return this;
};

exports.repeat = exports.Repeat = Repeat;
exports.val = exports.Constant = Constant;
exports.func = exports.CustomFunction = CustomFunction;
