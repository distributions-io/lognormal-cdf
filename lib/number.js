'use strict';

// MODULES //

var erf = require( 'compute-erf/lib/number.js' );


// FUNCTIONS //

var ln = Math.log,
	sqrt = Math.sqrt;


// CDF //

/**
* FUNCTION: cdf( x, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Lognormal distribution with location parameter `mu` and scale parameter `sigma` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @returns {Number} evaluated CDF
*/
function cdf( x, mu, sigma ) {
	var z;
	z = ln( x ) - mu;
	z /= sqrt( 2 ) * sigma;
	return 0.5 + 0.5 * erf( z );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
