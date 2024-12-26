import { scaleTime } from '@visx/vendor/d3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateTimeScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round');
export default function createTimeScale(config) {
  return updateTimeScale(scaleTime(), config);
}