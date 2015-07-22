'use strict';

// MODULES //

var erf = require( 'compute-erf/lib/number.js' );


// FUNCTIONS //

var ln = Math.log,
	sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies location parameter `mu` and scale parameter `sigma` and returns a function for evaluating the cumulative distribution function (CDF) for a Lognormal distribution.
*
* @param {Number} mu - location parameter
* @param {Number} sigma - scale parameter
* @returns {Function} CDF
*/
function partial( mu, sigma ) {
	var sqrt2xSigma = sqrt( 2 ) * sigma;
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function (CDF) for a Lognormal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {
		var z;
		z = ln( x ) - mu;
		z /= sqrt2xSigma;
		return 0.5 + 0.5 * erf( z );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
