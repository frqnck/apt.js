// apt-ajax.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){

    /**
     * Apt Ajax.
     * @param {String}   u - URL to request.
     * @param {Function} c - Call back function.
     * @param {String}   m - The request Method, default GET (passing this value will cancelsend(), manual overide).
     * @param {internal} x - Holds XMLHttpRequest()
     * @static
     */
    $.ajax = function(u, c, m, x) {
        c = c || function(){}

        try {
            // if(window.XDomainRequest) x = new XDomainRequest(); else // Explorer 8 and 9
            x = new XMLHttpRequest();
        } catch (e) {
            /*
            Failback to handle IE/Windows variations.
            http://blogs.msdn.com/b/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
            https://msdn.microsoft.com/en-us/library/ie/ms535874(v=vs.85).aspx
            Msxml2.XMLHTTP.6.0 - MSXML 6.0 since Vista+ IE7+
            Msxml2.XMLHTTP.3.0 - MSXML 3.0 fallback, also wotk with <IE7
            Microsoft.XMLHTTP  - ActiveX object (best avoided)
            */
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

        // Will on send the request when the argument `m` is not explicitly passed.
        m||x.send();
        return x;
    }

})(Apt)