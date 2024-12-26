"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azimuthalEquidistantRaw = void 0;
exports.default = _default;
var _math = require("../math.js");
var _azimuthal = require("./azimuthal.js");
var _index = _interopRequireDefault(require("./index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var azimuthalEquidistantRaw = (0, _azimuthal.azimuthalRaw)(function (c) {
  return (c = (0, _math.acos)(c)) && c / (0, _math.sin)(c);
});
exports.azimuthalEquidistantRaw = azimuthalEquidistantRaw;
azimuthalEquidistantRaw.invert = (0, _azimuthal.azimuthalInvert)(function (z) {
  return z;
});
function _default() {
  return (0, _index.default)(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}