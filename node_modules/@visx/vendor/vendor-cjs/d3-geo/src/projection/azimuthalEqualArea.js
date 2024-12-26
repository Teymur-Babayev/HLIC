"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azimuthalEqualAreaRaw = void 0;
exports.default = _default;
var _math = require("../math.js");
var _azimuthal = require("./azimuthal.js");
var _index = _interopRequireDefault(require("./index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var azimuthalEqualAreaRaw = (0, _azimuthal.azimuthalRaw)(function (cxcy) {
  return (0, _math.sqrt)(2 / (1 + cxcy));
});
exports.azimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
azimuthalEqualAreaRaw.invert = (0, _azimuthal.azimuthalInvert)(function (z) {
  return 2 * (0, _math.asin)(z / 2);
});
function _default() {
  return (0, _index.default)(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}