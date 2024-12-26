"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcDays = exports.utcDay = exports.unixDays = exports.unixDay = exports.timeDays = exports.timeDay = void 0;
var _interval = require("./interval.js");
var _duration = require("./duration.js");
const timeDay = (0, _interval.timeInterval)(date => date.setHours(0, 0, 0, 0), (date, step) => date.setDate(date.getDate() + step), (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationDay, date => date.getDate() - 1);
exports.timeDay = timeDay;
const timeDays = timeDay.range;
exports.timeDays = timeDays;
const utcDay = (0, _interval.timeInterval)(date => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / _duration.durationDay;
}, date => {
  return date.getUTCDate() - 1;
});
exports.utcDay = utcDay;
const utcDays = utcDay.range;
exports.utcDays = utcDays;
const unixDay = (0, _interval.timeInterval)(date => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / _duration.durationDay;
}, date => {
  return Math.floor(date / _duration.durationDay);
});
exports.unixDay = unixDay;
const unixDays = unixDay.range;
exports.unixDays = unixDays;