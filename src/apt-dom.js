// apt-dom.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){

    /**
     * Get or set inner HTML.
     * @method html
     * @param {string}  a - The event type to handle e.g. 'click'.
     * @return {array}
     */
    // $.fn.html = function (a) {
    //     return this.each(function (i) {
    //         a === []._
    //             ? i.innerHTML
    //             : i.innerHTML = a;
    //     });
    // }
    $.fn.html = function(h) {
        return 0 in arguments ?
          this.each(function(i){
            i.innerHTML = h
          }) :
          (0 in this ? this[0].innerHTML : '')
    }

    $.fn.addClass = function(n) {
        this.each(function(e) {
            e.classList
            ? e.classList.add(n)
            : e.n += ' ' + n;
        })
    }

    $.fn.removeClass = function(n) {
        this.each(function(e) {
            e.classList
            ? e.classList.remove(n)
            : e.n = e.n.replace(new RegExp('(^|\\b)' + n.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        })
    }

    $.fn.css = function(k, v) {
        var c = k + ":", _ = function(e, k, v) {
          if ($.legacy) {
            c += v == "inherit" ? "block" : v;
            e.each(function(e) {
                e.style.cssText = c + ";";
            })
          } else {
            c += v + ";";
            e.each(function(e) {
                if (k == "display") e.style.display = v;
                else e.setAttribute("style", c);
            })
          }
        };
        return _(this, k, v);
    }

    /*
     * append() method
     * a = todo
     * return self
     */
    $.fn.append = function (a) {
        return this.each(function (c) {
            c.appendChild(a[0]);
        });
    }

})(Apt)