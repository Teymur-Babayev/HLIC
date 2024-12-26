"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcWednesdays = exports.utcWednesday = exports.utcTuesdays = exports.utcTuesday = exports.utcThursdays = exports.utcThursday = exports.utcSundays = exports.utcSunday = exports.utcSaturdays = exports.utcSaturday = exports.utcMondays = exports.utcMonday = exports.utcFridays = exports.utcFriday = exports.timeWednesdays = exports.timeWednesday = exports.timeTuesdays = exports.timeTuesday = exports.timeThursdays = exports.timeThursday = exports.timeSundays = exports.timeSunday = exports.timeSaturdays = exports.timeSaturday = exports.timeMondays = exports.timeMonday = exports.timeFridays = exports.timeFriday = void 0;
var _interval = require("./interval.js");
var _duration = require("./duration.js");
function timeWeekday(i) {
  return (0, _interval.timeInterval)(date => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationWeek;
  });
}
const timeSunday = timeWeekday(0);
exports.timeSunday = timeSunday;
const timeMonday = timeWeekday(1);
exports.timeMonday = timeMonday;
const timeTuesday = timeWeekday(2);
exports.timeTuesday = timeTuesday;
const timeWednesday = timeWeekday(3);
exports.timeWednesday = timeWednesday;
const timeThursday = timeWeekday(4);
exports.timeThursday = timeThursday;
const timeFriday = timeWeekday(5);
exports.timeFriday = timeFriday;
const timeSaturday = timeWeekday(6);
exports.timeSaturday = timeSaturday;
const timeSundays = timeSunday.range;
exports.timeSundays = timeSundays;
const timeMondays = timeMonday.range;
exports.timeMondays = timeMondays;
const timeTuesdays = timeTuesday.range;
exports.timeTuesdays = timeTuesdays;
const timeWednesdays = timeWednesday.range;
exports.timeWednesdays = timeWednesdays;
const timeThursdays = timeThursday.range;
exports.timeThursdays = timeThursdays;
const timeFridays = timeFriday.range;
exports.timeFridays = timeFridays;
const timeSaturdays = timeSaturday.range;
exports.timeSaturdays = timeSaturdays;
function utcWeekday(i) {
  return (0, _interval.timeInterval)(date => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / _duration.durationWeek;
  });
}
const utcSunday = utcWeekday(0);
exports.utcSunday = utcSunday;
const utcMonday = utcWeekday(1);
exports.utcMonday = utcMonday;
const utcTuesday = utcWeekday(2);
exports.utcTuesday = utcTuesday;
const utcWednesday = utcWeekday(3);
exports.utcWednesday = utcWednesday;
const utcThursday = utcWeekday(4);
exports.utcThursday = utcThursday;
const utcFriday = utcWeekday(5);
exports.utcFriday = utcFriday;
const utcSaturday = utcWeekday(6);
exports.utcSaturday = utcSaturday;
const utcSundays = utcSunday.range;
exports.utcSundays = utcSundays;
const utcMondays = utcMonday.range;
exports.utcMondays = utcMondays;
const utcTuesdays = utcTuesday.range;
exports.utcTuesdays = utcTuesdays;
const utcWednesdays = utcWednesday.range;
exports.utcWednesdays = utcWednesdays;
const utcThursdays = utcThursday.range;
exports.utcThursdays = utcThursdays;
const utcFridays = utcFriday.range;
exports.utcFridays = utcFridays;
const utcSaturdays = utcSaturday.range;
exports.utcSaturdays = utcSaturdays;