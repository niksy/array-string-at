/* globals unknown */
/* eslint-disable no-undefined */

import { loose as isTypedArray } from 'is-typedarray';

/**
 * @typedef {Int8Array | Int16Array | Int32Array | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Float32Array | Float64Array} TypedArray
 */

/**
 * Returns value at specified index. Supports relative indexing from the end when passed a negative index. Uses native implementation if available.
 *
 * @param {string|Array<unknown>|TypedArray} item
 * @param {number}                           [index]
 */
function ponyfill(item, index) {
	if (
		typeof item !== 'string' &&
		!Array.isArray(item) &&
		!isTypedArray(item)
	) {
		throw new TypeError('Expected a string or array-like item.');
	}

	index = Math.trunc(index ?? 0) || 0;
	if (index < 0) {
		index += item.length;
	}
	if (index < 0 || index >= item.length) {
		return undefined;
	}
	return item[index];
}

/**
 * Returns value at specified index. Supports relative indexing from the end when passed a negative index. Uses native implementation if available.
 *
 * @param {string|Array<unknown>|TypedArray} item    Item to search.
 * @param {number}                           [index] Relative index.
 */
function preferNative(item, index) {
	return item?.at?.(index ?? 0) ?? ponyfill(item, index);
}

export default ponyfill;

export { preferNative };
