// apt-src.js - Source any files asynchronously.
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){

    // Handler for IE
    var _IE_handler = function(s, _t) {
        _t = s.readyState;

        // See: http://stackoverflow.com/questions/6946631/dynamically-creating-script-readystate-never-complete

        // if (type == 'complete') {
        //   // console.log(type + ": " + s.src + " " + toLoad);
        //   // // insert node only after completing the request,
        //   // // though this is not necessary
        //   $("head")[0].appendChild(s);
        // }

        // ie hack: should changes readyState from loaded to complete
        s.children;
        if (_t == 'loaded' && s.readyState == 'loading')
            s.success = false;

        if ( !/in/.test( s.readyState ) )
            s.success = _t == 'complete' ? true : null;
    };

    /**
     * Source files asynchronously
     * @param {Mix}   arguments - one or many URLs/files to source (css, js, jsonp, ...).
     * @static
     */
    $.src = function()
    {
        var args = arguments,
            toLoad = args.length,  // load this many scripts
            cb = args[toLoad - 1],
            hasCallback = cb.call, // is the last arg a callback?
            d = document;

        if(hasCallback) toLoad--;

        // Run this once ready...
        var m = function(e) {
            if(e) this.success = e.type !== 'error';
            else _IE_handler(this);

            if ( this.success !== null ) {
                if ( hasCallback && !--toLoad ) {
                    return cb( s.every(function(e){ return e.success }));
                }
            }
        };

        var s=[], success = true;
        for (var i=0; i<toLoad; i++) {
            var x = args[i],
                key = key ? key : x.indexOf(".css") > -1 ? "link" : "script",
                o = {
                    link:{rel:"stylesheet", href:x},
                    script:{type:"text/javascript", src:x, async:true} //, defer:true}
                };

            s[i] = d.createElement(key);
            s[i].success = null;

            // set all the attributes
            for(var k in o[key]) s[i][k]=o[key][k];

            // set the event handlers..
            if (d.attachEvent && !d.addEventListener) {
                // For IE 8 and earlier versions
                // window.attachEvent("onload", func12);
                s[i].onreadystatechange = m;

            } else {
                // For all major browsers, except IE 8 and earlier
                // window.addEventListener("load", func1);

                s[i].onload = s[i].onerror = m;
                $("head")[0].appendChild(s[i]);
            }

        }

        return this;
    }

})(Apt)