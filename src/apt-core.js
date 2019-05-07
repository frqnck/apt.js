// apt-core.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

!function (a, p, t, $) {

    /**
     *  Private _
     * 
     * @param {Object | String | Function} m - Mixed value can be either CSS selector/DOM element or a function.
     * @param {Object | String | Null} c - Context.
     * @param {Private} e - The matched elements
     * @param {internal} i - Index of the matched elements
     * @private
     * @static
     */
    function _(m, c, e, i) {
        e = m && m.nodeType
            ? [m]
            : '' + m === m // is string!

                // http://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
                ? /</.test(m)
                    ? (
                        (i = t.createElement(c || 'Ap')).innerHTML = m, i.children
                    )
                    : (c && $(c)[0] || t).querySelectorAll(m)

                // ? t.querySelectorAll(m)
                : m || a;

        // c.push.apply(this, e);
        for (
            e, i = e.length; i--;
            a.unshift.call(this, e[i])
        );
    }

    /**
     * Main
     * 
     * @param {Object | String | Function} m - Mixed value either a CSS selector, string, a DOM element, or a function.
     * @param {Object | String | Null} c - Context.
     * @return {} A new base class instance or, if DOMready, run the function.
     * @see {@link _} for base class.
     * @see {@link http://www.dustindiaz.com/smallest-domready-ever} and
     * {@link https://twitter.com/ded/status/40685635933048832} for cross browser DOMready.
     */
    $ = function (m, c) {
        return /^f/.test(typeof m)
            ? /in/.test(t.readyState) ? setTimeout('$(' + m + ')', 9) : m()
            : new _(m, c)
    }

    _[p] =              // adds a base prototype
    $[p] =              // allows to wrap DOM elements
    $.fn =              // creates the `fn` alias to `prototype` property
    Array[p].slice(0);  // inherits by cloning the native Array

    /**
     * Each -- use native forEach to iterate a collection.
     * 
     * @method each
     * @param {function(Object)} f - The function to call on each iteration.
     * @param {Mixed} m - The value for that function.
     * @return {self}
     */
    $.fn.each = function (f, m) {
        a.forEach.call(this, f, m)
        return this
    }

    /**
     * type - Return the type as '$' (for Apt objects) or as String, Number, Boolean,
     * Null, Undefined, Array, Object, Function, Error, Regexp.
     * 
     * @method type
     * @param {Mixed} m - Mixed value.
     * @return {String}
     */
    $.type = function (m) {
        return m instanceof $
            ? '$'
            : ({}).toString.call(m).match(/\s([a-zA-Z]+)/)[1]
    }

    // Expose as Apt
    Apt = $;

    // Shortcuts
    $.w = window;
    $.d = t;

    // If global `$` is free, let's use it -- jQuery like!
    $.w.$ === undefined && ($.w.$ = $);

}([], 'prototype', document);