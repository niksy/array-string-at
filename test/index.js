/* eslint-disable no-undefined */

import assert from 'assert';
import at, { preferNative } from '../index';

before(function () {
	window.fixture.load('/test/fixtures/index.html');
});

after(function () {
	window.fixture.cleanup();
});

it('throws for non-string and non-array-like items', function () {
	assert.throws(() => at(42), TypeError);
});

it('works for strings', function () {
	assert.equal(at('abc', 0), 'a');
	assert.equal(at('abc', -3), 'a');

	assert.equal(at('abc', 1), 'b');
	assert.equal(at('abc', -2), 'b');

	assert.equal(at('abc', 2), 'c');
	assert.equal(at('abc', -1), 'c');

	assert.equal(at('abc', 3), undefined);
	assert.equal(at('abc', -4), undefined);
});

it('works for arrays', function () {
	const array = [1, [2], [3, 4]];

	assert.equal(at(array, 0), array[0]);
	assert.equal(at(array, -3), array[0]);

	assert.deepEqual(at(array, 1), array[1]);
	assert.deepEqual(at(array, -2), array[1]);

	assert.deepEqual(at(array, 2), array[2]);
	assert.deepEqual(at(array, -1), array[2]);

	assert.equal(at(array, 3), undefined);
	assert.equal(at(array, -4), undefined);

	assert.equal(at([], 0), undefined);
	assert.equal(at([], -1), undefined);
});

it('works for sparse arrays', function () {
	/* eslint-disable no-sparse-arrays */
	const array = [, [1]];

	assert.equal(at(array, 0), undefined);
	assert.equal(at(array, -2), undefined);

	assert.deepEqual(at(array, 1), [1]);
	assert.deepEqual(at(array, -1), [1]);
});

it('uses native implementation if it’s available', function () {
	assert.equal(preferNative('abc', -1), 'c');
});
