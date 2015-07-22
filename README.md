Cumulative Distribution Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) distribution [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function).

The [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) for a [Lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) random variable is

<div class="equation" align="center" data-raw-text="F(x;\mu,\sigma)=\frac12 + \frac12\,\operatorname{erf}\left[\frac{\ln x-\mu}{\sqrt{2}\sigma}\right]" data-equation="eq:cdf">
	<img src="https://cdn.rawgit.com/distributions-io/lognormal-cdf/eced4e40a09bfdb6fd4aa110115e84baa0a0d49d/docs/img/eqn.svg" alt="Cumulative distribution function for a Lognormal distribution.">
	<br>
</div>

where `mu` is the location parameter and `sigma` is the scale parameter.

## Installation

``` bash
$ npm install distributions-lognormal-cdf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var cdf = require( 'distributions-lognormal-cdf' );
```

#### cdf( x[, options] )

Evaluates the [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) for the [Lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = cdf( 1 );
// returns 0.5

x = [ -1, 0, 1, 2, 3 ];
out = cdf( x );
// returns [ 0, 0, ~0.5, ~0.756, ~0.864 ]

x = new Float32Array( x );
out = cdf( x );
// returns Float64Array( [0,0,~0.5,~0.756,~0.864] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = cdf( mat );
/*
	[  0     ~0.5
	  ~0.756 ~0.864
	  ~0.917 ~0.946 ]
*/
```

The function accepts the following `options`:

*	__mu__: location parameter. Default: `0`.
*	__sigma__: scale parameter. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Lognormal](https://en.wikipedia.org/wiki/Lognormal_distribution) distribution is a function of two parameters: `mu`(location parameter) and `sigma`(scale parameter). By default, `mu` is equal to `0` and `sigma` is equal to `1`. To adjust either parameter, set the corresponding options.

``` javascript
var x = [ -1, 0, 1, 2, 3 ];

var out = cdf( x, {
	'mu': 3,
	'sigma': 2
});
// returns [ 0, ~0.0668, ~0.124, ~0.171, ~0.21, ~0.243 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,-1],
	[1,0],
	[2,1],
	[3,2],
	[4,3],
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = cdf( data, {
	'accessor': getValue
});
// returns [ 0, 0, ~0.5, ~0.756, ~0.864 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-4]},
	{'x':[1,-2]},
	{'x':[2,0]},
	{'x':[3,2]},
	{'x':[4,4]},
];

var out = cdf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,0]},
		{'x':[1,0]},
		{'x':[2,~0.5]},
		{'x':[3,~0.756]},
		{'x':[4,~0.864]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Float64Array( [-1,0,1,2,3] );

out = cdf( x, {
	'dtype': 'float32'
});
// returns Float32Array( [0,0,~0.5,~0.756,~0.864] )

// Works for plain arrays, as well...
out = cdf( [-1,0,1,2,3], {
	'dtype': 'float32'
});
// returns Float32Array( [0,0,~0.5,~0.756,~0.864] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ -1, 0, 1, 2, 3 ];

out = cdf( x, {
	'copy': false
});
// returns [ 0, 0, ~0.5, ~0.756, ~0.864 ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i - 3 ;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = cdf( mat, {
	'copy': false
});
/*
	[  0     ~0.5
	  ~0.756 ~0.864
	  ~0.917 ~0.946 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) is `NaN`.

	``` javascript
	var data, out;

	out = cdf( null );
	// returns NaN

	out = cdf( true );
	// returns NaN

	out = cdf( {'a':'b'} );
	// returns NaN

	out = cdf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = cdf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = cdf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

## Examples

``` javascript
var cdf = require( 'distributions-lognormal-cdf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i - 5;
}
out = cdf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = cdf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = cdf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i - 5;
}
out = cdf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = cdf( mat );

// Matrices (custom output data type)...
out = cdf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-lognormal-cdf.svg
[npm-url]: https://npmjs.org/package/distributions-lognormal-cdf

[travis-image]: http://img.shields.io/travis/distributions-io/lognormal-cdf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/lognormal-cdf

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/lognormal-cdf/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/lognormal-cdf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/lognormal-cdf.svg
[dependencies-url]: https://david-dm.org/distributions-io/lognormal-cdf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/lognormal-cdf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/lognormal-cdf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/lognormal-cdf.svg
[github-issues-url]: https://github.com/distributions-io/lognormal-cdf/issues
