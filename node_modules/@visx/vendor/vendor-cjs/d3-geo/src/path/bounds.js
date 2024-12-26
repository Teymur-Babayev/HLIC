"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop = _interopRequireDefault(require("../noop.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var x0 = Infinity,
  y0 = x0,
  x1 = -x0,
  y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: _noop.default,
  lineEnd: _noop.default,
  polygonStart: _noop.default,
  polygonEnd: _noop.default,
  result: function () {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};
function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}
var _default = boundsStream;
exports.default = _default;