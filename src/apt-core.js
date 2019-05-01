// apt-core.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

// @param {[...]}    a Set as array object [].
// @param {String}   p The matched elements ('prototype').
// @param {Object}   t The targetted elemtn (document).
// @param {internal} $ onternal/private pointer.
!function (a, p, t, $) {

    /**
     * This is the description for my class.
     * @param {Object | String | Function} m - Mixed value can be either CSS selector/DOM element or a function.
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
     * @class Apt
     * @constructor
     * @param {Object | String | Function} mixed - Mixed value either a CSS selector, a DOM element, or a function.
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
     * @method each
     * @param {function(Object)} f - The function to call on each iteration.
     * @param {Mixed} v - The `this` value for that function.
     * @return {self} - Returns `this` for chainability...
     */
    $.fn.each = function (f, v) {
        a.forEach.call(this, f, v)
        return this
    }

    // $.fn.is = {
    //   func:function(a){return typeof a == "function"},
    //   str:function(a){return typeof a == "string"},
    //   arr:function(a){return Object.prototype.toString.call(a)==='[object Array]'},
    //   obj:function(a){return typeof a == "object"}
    // }

    $.type = function (o) {
        return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    // Expose as Apt
    Apt = $;

    // Shortcuts
    $.w = window;
    $.d = t;

    // If global `$` is free, let's use it -- jQuery like!
    $.w.$ === undefined && ($.w.$ = $);

}([], 'prototype', document);