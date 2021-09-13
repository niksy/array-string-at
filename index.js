/* eslint-disable no-undefined */

import { loose as isTypedArray } from 'is-typedarray';

/**
 * @param {string|Array} item
 * @param {number} _index
 *
 * @returns {*}
 * @throws {TypeError}
 */
export default function ponyfill(item, _index) {
	if (
		typeof item !== 'string' &&
		!Array.isArray(item) &&
		!isTypedArray(item)
	) {
		throw new TypeError('Expected a string or array-like item.');
	}

	let index = Math.trunc(_index) || 0;
	if (index < 0) {
		index += item.length;
	}
	if (index < 0 || index >= item.length) {
		return undefined;
	}
	return item[index];
}

export const preferNative = (item, index) => {
	if (
		(typeof item === 'string' &&
			typeof String.prototype.at !== 'undefined') ||
		(Array.isArray(item) && Array.prototype.at !== 'undefined') ||
		(isTypedArray(item) && item.at !== 'undefined')
	) {
		return item.at(index);
	}
	/* istanbul ignore next */
	return ponyfill(item, index);
};
