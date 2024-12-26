"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.equalEarthRaw = equalEarthRaw;
var _index = _interopRequireDefault(require("./index.js"));
var _math = require("../math.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var A1 = 1.340264,
  A2 = -0.081106,
  A3 = 0.000893,
  A4 = 0.003796,
  M = (0, _math.sqrt)(3) / 2,
  iterations = 12;
function equalEarthRaw(lambda, phi) {
  var l = (0, _math.asin)(M * (0, _math.sin)(phi)),
    l2 = l * l,
    l6 = l2 * l2 * l2;
  return [lambda * (0, _math.cos)(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))];
}
equalEarthRaw.invert = function (x, y) {
  var l = y,
    l2 = l * l,
    l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if ((0, _math.abs)(delta) < _math.epsilon2) break;
  }
  return [M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / (0, _math.cos)(l), (0, _math.asin)((0, _math.sin)(l) / M)];
};
function _default() {
  return (0, _index.default)(equalEarthRaw).scale(177.158);
}