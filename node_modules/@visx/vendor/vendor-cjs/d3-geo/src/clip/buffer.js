"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _noop = _interopRequireDefault(require("../noop.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  var lines = [],
    line;
  return {
    point: function (x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function () {
      lines.push(line = []);
    },
    lineEnd: _noop.default,
    rejoin: function () {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function () {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}