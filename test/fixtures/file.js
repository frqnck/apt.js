$(function($){ // so it only execute once fully ready ~ works across browser
	_apt.debugNull = function(file, success) {
		return "DEBUG (loaded '"+file+"') success: " + success;
		// console.log("DEBUG (loaded '"+file+"') success: " + success);
		// console.log(arguments);
	};
})
