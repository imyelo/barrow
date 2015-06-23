var moment = require('moment');

var addons = {
  // 转数字
  number: function (val) {
    return +val;
  },
  // 转布尔
  bool: function (val) {
    return !!val;
  },
  // 转字符串
  string: function (val) {
    return val + '';
  },
  // 转时间戳
  timestamp: function (val) {
    if (typeof val === 'undefined') {
      return 0;
    }
    if (+val + '' === val) {
      return +val;
    }
    return +moment(val).format('x') || 0;
  },
  // 分转元
  yuan: function (val) {
    return +(val / 100).toFixed(2);
  },
  // 元转分
  fen: function (val) {
    return +(val * 100).toFixed(0);
  }
};

module.exports = addons;
