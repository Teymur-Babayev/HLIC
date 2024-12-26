"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _identity = _interopRequireDefault(require("../identity.js"));
var _stream = _interopRequireDefault(require("../stream.js"));
var _area = _interopRequireDefault(require("./area.js"));
var _bounds = _interopRequireDefault(require("./bounds.js"));
var _centroid = _interopRequireDefault(require("./centroid.js"));
var _context = _interopRequireDefault(require("./context.js"));
var _measure = _interopRequireDefault(require("./measure.js"));
var _string = _interopRequireDefault(require("./string.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(projection, context) {
  let digits = 3,
    pointRadius = 4.5,
    projectionStream,
    contextStream;
  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      (0, _stream.default)(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path.area = function (object) {
    (0, _stream.default)(object, projectionStream(_area.default));
    return _area.default.result();
  };
  path.measure = function (object) {
    (0, _stream.default)(object, projectionStream(_measure.default));
    return _measure.default.result();
  };
  path.bounds = function (object) {
    (0, _stream.default)(object, projectionStream(_bounds.default));
    return _bounds.default.result();
  };
  path.centroid = function (object) {
    (0, _stream.default)(object, projectionStream(_centroid.default));
    return _centroid.default.result();
  };
  path.projection = function (_) {
    if (!arguments.length) return projection;
    projectionStream = _ == null ? (projection = null, _identity.default) : (projection = _).stream;
    return path;
  };
  path.context = function (_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new _string.default(digits)) : new _context.default(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };
  path.pointRadius = function (_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };
  path.digits = function (_) {
    if (!arguments.length) return digits;
    if (_ == null) digits = null;else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    if (context === null) contextStream = new _string.default(digits);
    return path;
  };
  return path.projection(projection).digits(digits).context(context);
}