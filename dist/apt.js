!function (a, p, t, $) {
    function _(m, c, e, i) {
        e = m && m.nodeType
            ? [m]
            : '' + m === m // is string!
                ? /</.test(m)
                    ? (
                        (i = t.createElement(c || 'Ap')).innerHTML = m, i.children
                    )
                    : (c && $(c)[0] || t).querySelectorAll(m)
                : m || a;
        for (
            e, i = e.length; i--;
            a.unshift.call(this, e[i])
        );
    }
    $ = function (m, c) {
        return /^f/.test(typeof m)
            ? /in/.test(t.readyState) ? setTimeout('$(' + m + ')', 9) : m()
            : new _(m, c)
    }

    _[p] =              // adds a base prototype
    $[p] =              // allows to wrap DOM elements
    $.fn =              // creates the `fn` alias to `prototype` property
    Array[p].slice(0);  // inherits by cloning the native Array
    $.fn.each = function (f, m) {
        a.forEach.call(this, f, m)
        return this
    }
    $.type = function (m) {
        return m instanceof $
            ? '$'
            : ({}).toString.call(m).match(/\s([a-zA-Z]+)/)[1]
    }
    Apt = $;
    $.w = window;
    $.d = t;
    $.w.$ === undefined && ($.w.$ = $);
    $.ajax = function(u, c, m, x) {
        c = c || function(){}

        try {
            x = new XMLHttpRequest();
        } catch (e) {
            var a = [6, 3];
            for (var i = 0; i < a.length; i++)
            try {
                x = new ActiveXObject("Msxml2.XMLHTTP." + a[i] + ".0");
            } catch (e) {
                continue;
            }
        }

        x.open(m&&m.toUpperCase()||'GET', u, true);
        x.onreadystatechange = function() {
            x = this;
            if( x.readyState==4 && x.status!=0 && c) { // skip if CORS issue
                x.parse = function() {
                    return JSON.parse(x.responseText);
                }
                c(x.responseText, x.status >=200 && x.status<300, x)
            }
        };
        m||x.send();
        return x;
    }
    $.legacy = !$.w.addEventListener && $.w.attachEvent;
    var _e = function (e, t, f, v, p, l) {
        l = 'EventListener';
        return e.each(function (a) {
            a['add' + l]
                ? a[v + l](t, f, false)
                : a[p + 'tachEvent']('on' + t, f)
        })
    }
    $.fn.on = function (t, f) {
        return _e(this, t, f, 'add', 'at')
    }
    $.fn.off = function (t, f) {
        return _e(this, t, f, 'remove', 'de')
    }
    $.fn.html = function(h) {
        return 0 in arguments
        ? this.each(function(e) {
            e.innerHTML = h
          })
        : 0 in this ? this[0].innerHTML : ''
    }
    $.fn.addClass = function(n) {
        return this.each(function(e) {
            e.classList
            ? e.classList.add(n)
            : e.n += ' ' + n;
        })
    }
    $.fn.removeClass = function(n) {
        return this.each(function(e) {
            e.classList
            ? e.classList.remove(n)
            : e.n = e.n.replace(new RegExp('(^|\\b)' + n.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        })
    }
    $.fn.css = function(k, v) {
        k = k + ":";        
        return this.each(function(e) {
            $.legacy // TODO: remove legacy support?
                ? e.style.cssText = k + (v == "inherit" ? "block" : v)
                : e.setAttribute("style", k + v);
        })
    }
    $.fn.append = function (m) {
        m = $.type(m)=='$' ? m[0] : m;
        return this.each(function (e) {
            e.appendChild(m);
        });
    }
    var _IE_handler = function(s, _t) {
        _t = s.readyState;
        s.children;
        if (_t == 'loaded' && s.readyState == 'loading')
            s.success = false;

        if ( !/in/.test( s.readyState ) )
            s.success = _t == 'complete' ? true : null;
    };
    $.src = function() {
        var args = arguments,
            toLoad = args.length,  // load this many scripts
            cb = args[toLoad - 1],
            hasCallback = cb.call, // is the last arg a callback?
            d = document;

        if(hasCallback) toLoad--;
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
            for(var k in o[key]) s[i][k]=o[key][k];
            if (d.attachEvent && !d.addEventListener) {
                s[i].onreadystatechange = m;

            } else {

                s[i].onload = s[i].onerror = m;
                $("head")[0].appendChild(s[i]);
            }

        }

        return this;
    }

}([], 'prototype', document);
