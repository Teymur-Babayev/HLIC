"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcHours = exports.utcHour = exports.timeHours = exports.timeHour = void 0;
var _interval = require("./interval.js");
var _duration = require("./duration.js");
const timeHour = (0, _interval.timeInterval)(date => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond - date.getMinutes() * _duration.durationMinute);
}, (date, step) => {
  date.setTime(+date + step * _duration.durationHour);
}, (start, end) => {
  return (end - start) / _duration.durationHour;
}, date => {
  return date.getHours();
});
exports.timeHour = timeHour;
const timeHours = timeHour.range;
exports.timeHours = timeHours;
const utcHour = (0, _interval.timeInterval)(date => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * _duration.durationHour);
}, (start, end) => {
  return (end - start) / _duration.durationHour;
}, date => {
  return date.getUTCHours();
});
exports.utcHour = utcHour;
const utcHours = utcHour.range;
exports.utcHours = utcHours;