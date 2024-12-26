"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _rectangle = _interopRequireDefault(require("./rectangle.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  var x0 = 0,
    y0 = 0,
    x1 = 960,
    y1 = 500,
    cache,
    cacheStream,
    clip;
  return clip = {
    stream: function (stream) {
      return cache && cacheStream === stream ? cache : cache = (0, _rectangle.default)(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function (_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
}