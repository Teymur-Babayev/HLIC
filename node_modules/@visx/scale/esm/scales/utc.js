import { scaleUtc } from '@visx/vendor/d3-scale';
import scaleOperator from '../operators/scaleOperator';
export var updateUtcScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round');
export default function createUtcScale(config) {
  return updateUtcScale(scaleUtc(), config);
}