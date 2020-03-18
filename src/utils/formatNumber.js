import BigNumber from 'bignumber.js';
import { endsWith, trimEnd } from 'lodash-es';

// See BigNumber.js rounding modes
// https://mikemcl.github.io/bignumber.js/#constructor-properties

/**
 * @param {BigNumber|number} value
 * @returns {string}
 */
export function formatNumber(value, decimalPlaces = 0, roundingMode = BigNumber.ROUND_DOWN) {
  const bigValue = new BigNumber(value);
  if (bigValue.isInteger()) return bigValue.toFormat(null);

  const minimumValue = new BigNumber(`0.${'0'.repeat(decimalPlaces)}1`);
  if (bigValue.absoluteValue().isLessThan(minimumValue)) return '0';

  const formatted = bigValue.toFormat(decimalPlaces, roundingMode);
  if (decimalPlaces === 0) return formatted;

  const trimmed = trimEnd(formatted, '0');
  return `${trimmed}${endsWith(trimmed, '.') ? '0' : ''}`;
}

/**
 * @param {number} value
 * @returns {string}
 */
export function formatLargeNumber(value) {
  const bigValue = new BigNumber(value);
  const absoluteValue = bigValue.absoluteValue();

  if (absoluteValue.isGreaterThan(500000000)) {
    return formatNumber(bigValue.shiftedBy(-9), 1) + 'B';
  }
  if (absoluteValue.isGreaterThan(500000)) {
    return formatNumber(bigValue.shiftedBy(-6), 1) + 'M';
  }
  if (absoluteValue.isGreaterThan(500)) {
    return formatNumber(bigValue.shiftedBy(-3), 1) + 'K';
  }

  return formatNumber(bigValue);
}
