"use strict";

exports.__esModule = true;
exports.default = BrushOverlay;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _shape = require("@visx/shape");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function BrushOverlay(props) {
  return /*#__PURE__*/_react.default.createElement(_shape.Bar, _extends({
    className: "visx-brush-overlay",
    fill: "transparent",
    x: 0,
    y: 0
  }, props));
}
BrushOverlay.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  onClick: _propTypes.default.func,
  onDoubleClick: _propTypes.default.func,
  onPointerDown: _propTypes.default.func,
  onPointerLeave: _propTypes.default.func,
  onPointerMove: _propTypes.default.func,
  onPointerUp: _propTypes.default.func
};