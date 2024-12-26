import _pt from "prop-types";
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Bar } from '@visx/shape';
export default function BrushOverlay(props) {
  return /*#__PURE__*/React.createElement(Bar, _extends({
    className: "visx-brush-overlay",
    fill: "transparent",
    x: 0,
    y: 0
  }, props));
}
BrushOverlay.propTypes = {
  width: _pt.number.isRequired,
  height: _pt.number.isRequired,
  onClick: _pt.func,
  onDoubleClick: _pt.func,
  onPointerDown: _pt.func,
  onPointerLeave: _pt.func,
  onPointerMove: _pt.func,
  onPointerUp: _pt.func
};