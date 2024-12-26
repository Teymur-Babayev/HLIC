"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PathContext;
var _math = require("../math.js");
var _noop = _interopRequireDefault(require("../noop.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function (_) {
    return this._radius = _, this;
  },
  polygonStart: function () {
    this._line = 0;
  },
  polygonEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function (x, y) {
    switch (this._point) {
      case 0:
        {
          this._context.moveTo(x, y);
          this._point = 1;
          break;
        }
      case 1:
        {
          this._context.lineTo(x, y);
          break;
        }
      default:
        {
          this._context.moveTo(x + this._radius, y);
          this._context.arc(x, y, this._radius, 0, _math.tau);
          break;
        }
    }
  },
  result: _noop.default
};