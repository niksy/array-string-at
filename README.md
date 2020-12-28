# array-string-at

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

[Array/string `.at()`](https://github.com/tc39/proposal-relative-indexing-method)
[ponyfill](https://ponyfill.com).

> […] `at()`, that is on the prototype of the built-in indexable objects:
> `Array`, `String`, and `TypedArrays` objects. The method supports relative
> indexing from the end when passed a negative index.

## Install

```sh
npm install array-string-at --save
```

## Usage

```js
import at from 'array-string-at';

at('becky', 1); // e
at('becky', -2); // k
```

You can **use named export `preferNative` if you wish to use native
implementation if it’s available**. In all other cases, ponyfill will be used.
Beware of
[caveats](https://github.com/sindresorhus/ponyfill#user-content-ponyfill:~:text=Ponyfills%20should%20never%20use%20the%20native,between%20environments%2C%20which%20can%20cause%20bugs.)!

### Polyfill

```js
import at from 'array-string-at';

if (typeof String.prototype.at === 'undefined') {
	String.prototype.at = function (index) {
		return at(this, index);
	};
}

if (typeof Array.prototype.at === 'undefined') {
	Array.prototype.at = function (index) {
		return at(this, index);
	};
}
```

## API

### at(item, index)

Returns: `*`

Returns value at specified index. Supports relative indexing from the end when
passed a negative index.

#### item

Type: `string|Array`

Item to search.

#### index

Type: `number`

Relative index.

## Browser support

Tested in IE11+ and all modern browsers.

## Test

Test suite is taken and modified from following packages:

-   [es-shims, string](https://github.com/es-shims/String.prototype.at/blob/main/test/tests.js)
-   [es-shims, array](https://github.com/es-shims/Array.prototype.at/blob/main/test/tests.js)

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/array-string-at
[ci-img]: https://travis-ci.com/niksy/array-string-at.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=<badge_key>

<!-- prettier-ignore-end -->
