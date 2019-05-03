// apt-dom.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){

    /**
     * Get or set inner HTML.
     * @method html
     * @param {string|null}  h - The html string to set.
     */
    $.fn.html = function(h) {
        return 0 in arguments
        ? this.each(function(e) {
            e.innerHTML = h
          })
        : 0 in this ? this[0].innerHTML : ''
    }

    /**
     * Add a class name.
     * @method addClass
     * @param {string}  n - The class name  to add.
     * @return {self}
     */
    $.fn.addClass = function(n) {
        return this.each(function(e) {
            e.classList
            ? e.classList.add(n)
            : e.n += ' ' + n;
        })
    }

    /**
     * Remove a class name.
     * @method removeClass
     * @param {string}  n - The class name to remove.
     * @return {self}
     */
    $.fn.removeClass = function(n) {
        return this.each(function(e) {
            e.classList
            ? e.classList.remove(n)
            : e.n = e.n.replace(new RegExp('(^|\\b)' + n.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        })
    }

    /**
     * Set a style.
     * @method css
     * @param {string}  k -
     * @param {string}  v -
     * @return {self}
     */
    $.fn.css = function(k, v) {
        k = k + ":";        
        return this.each(function(e) {
            $.legacy // TODO: remove legacy support?
                ? e.style.cssText = k + (v == "inherit" ? "block" : v)
                : e.setAttribute("style", k + v);
        })
    }

    /**
     * Append (TODO)
     * 
     * @method append
     * @param {mixed}  m
     */
    $.fn.append = function (m) {
        m = $.type(m)=='$' ? m[0] : m;
        return this.each(function (e) {
            e.appendChild(m);
        });
    }

})(Apt)