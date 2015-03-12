var mapper = require('./mapper');
var Types = require('./mapper/types');

var Barrow = function (mapping) {
  if (!(this instanceof Barrow)) {
    return new Barrow(mapping);
  }
  this._mapping = mapping;
  return this;
};

Barrow.prototype.transfer = function (source) {
  return mapper(source, this._mapping);
};

Barrow.Types = Types;

module.exports = Barrow;
