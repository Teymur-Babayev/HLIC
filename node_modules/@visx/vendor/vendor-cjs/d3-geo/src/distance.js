"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _length = _interopRequireDefault(require("./length.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var coordinates = [null, null],
  object = {
    type: "LineString",
    coordinates: coordinates
  };
function _default(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return (0, _length.default)(object);
}