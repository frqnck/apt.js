// apt-ajax.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){
    /**
     * Apt Ajax.
     * @param {String}   url - URL to request.
     * @param {Function} callback - Call back function.
     * @param {String}   method - The request Method, default GET (passing this value will cancelsend(), manual overide).
     * @param {internal} xhrInstance - Holds XMLHttpRequest()
     * @static
     */
    $.ajax = function(url, callback, method, xhrInstance) {
        xhrInstance = new XMLHttpRequest();

        xhrInstance.open(method && method.toUpperCase()||'GET', url);
        xhrInstance.onloadend = function(text, status) {
            xhrInstance.parse = JSON.parse.bind(0, text = xhrInstance.response);
            status = xhrInstance.status;
            
            if (callback) callback(text, !status || status > 199 && status < 400, xhrInstance);
        };
        
        if (!method) xhrInstance.send(); // Send the request when the argument `method` is not explicitly passed.
        
        return xhrInstance;
    };
    
})(Apt);
