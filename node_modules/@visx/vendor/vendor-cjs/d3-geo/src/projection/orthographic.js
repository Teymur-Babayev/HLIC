"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.orthographicRaw = orthographicRaw;
var _math = require("../math.js");
var _azimuthal = require("./azimuthal.js");
var _index = _interopRequireDefault(require("./index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function orthographicRaw(x, y) {
  return [(0, _math.cos)(y) * (0, _math.sin)(x), (0, _math.sin)(y)];
}
orthographicRaw.invert = (0, _azimuthal.azimuthalInvert)(_math.asin);
function _default() {
  return (0, _index.default)(orthographicRaw).scale(249.5).clipAngle(90 + _math.epsilon);
}