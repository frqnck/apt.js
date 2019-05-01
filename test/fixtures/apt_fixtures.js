// apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

var FIXTURE_ID = '#apt-fixtures',
	FIXTURE_UL = FIXTURE_ID + ' UL > *',
	_apt = {}; // holds some test 

if( window.__html__ ) {
	window.__html__ = window.__html__ || {};
	window.document.body.innerHTML = __html__['fixtures/index.html'];
	window.basePath = '/base';
} else {
	window.basePath = '..';
}

// console.log(window.__karma__);