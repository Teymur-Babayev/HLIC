"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.equirectangularRaw = equirectangularRaw;
var _index = _interopRequireDefault(require("./index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function _default() {
  return (0, _index.default)(equirectangularRaw).scale(152.63);
}