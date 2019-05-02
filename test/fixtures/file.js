// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

$(function($) { // so it only execute once fully ready ~ works across browser
	_apt.loadedFunc = function(file, success) {
		return "file: '" + file + "'), success: " + success;
	};
})
