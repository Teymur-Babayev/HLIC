"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abs = void 0;
exports.acos = acos;
exports.asin = asin;
exports.halfPi = exports.floor = exports.exp = exports.epsilon2 = exports.epsilon = exports.degrees = exports.cos = exports.ceil = exports.atan2 = exports.atan = void 0;
exports.haversin = haversin;
exports.tau = exports.tan = exports.sqrt = exports.sin = exports.sign = exports.radians = exports.quarterPi = exports.pow = exports.pi = exports.log = exports.hypot = void 0;
var epsilon = 1e-6;
exports.epsilon = epsilon;
var epsilon2 = 1e-12;
exports.epsilon2 = epsilon2;
var pi = Math.PI;
exports.pi = pi;
var halfPi = pi / 2;
exports.halfPi = halfPi;
var quarterPi = pi / 4;
exports.quarterPi = quarterPi;
var tau = pi * 2;
exports.tau = tau;
var degrees = 180 / pi;
exports.degrees = degrees;
var radians = pi / 180;
exports.radians = radians;
var abs = Math.abs;
exports.abs = abs;
var atan = Math.atan;
exports.atan = atan;
var atan2 = Math.atan2;
exports.atan2 = atan2;
var cos = Math.cos;
exports.cos = cos;
var ceil = Math.ceil;
exports.ceil = ceil;
var exp = Math.exp;
exports.exp = exp;
var floor = Math.floor;
exports.floor = floor;
var hypot = Math.hypot;
exports.hypot = hypot;
var log = Math.log;
exports.log = log;
var pow = Math.pow;
exports.pow = pow;
var sin = Math.sin;
exports.sin = sin;
var sign = Math.sign || function (x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
};
exports.sign = sign;
var sqrt = Math.sqrt;
exports.sqrt = sqrt;
var tan = Math.tan;
exports.tan = tan;
function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}
function haversin(x) {
  return (x = sin(x / 2)) * x;
}