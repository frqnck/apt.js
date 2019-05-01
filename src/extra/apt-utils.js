// apt-util.js - A few various extra utilities.
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){

    $.getUrlVars = function() {
      var v = {},
        parts = $.w.location.href.replace(
          /[?&]+([^=&]+)=([^&]*)/gi,
          function(m, k, v) {
            v[k] = v;
          }
        );
      return v;
    };

    $.getCookie = function(n) {
      var v = "; " + $.d.cookie,
        p = v.split("; " + n + "=");
      if (p.length == 2)
        return p.pop().split(";").shift();
    };

    $.isObject = function(o) {
      var _ = typeof o;
      return _ === "function" || (_ === "object" && !!o);
    };

    var _tag = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*", 
        _rmTags = new RegExp(
            "<(?:" + "!--(?:(?:-*[^->])*--+|-?)" + "|script\\b" + _tag +
            ">[\\s\\S]*?</script\\s*" + "|style\\b" + _tag +
            ">[\\s\\S]*?</style\\s*" + "|/?[a-z]" + _tag + ")>", "gi"
        );

    $.rmTags = function(h) {
      var _;
      do {
        _ = h;
        h = h.replace(_rmTags, "");
      } while (h !== _);
      return h.replace(/</g, "&lt;");
    };

    //
    // TODO convert to an aplt builtin function 
    //
    if(!String.prototype.format){
      String.prototype.format = function() {
        var a=typeof arguments[0]=='string'?arguments:arguments[0];
        return this.replace(/{(\d+)}/g,function(m,i){return typeof a[i]!='undefined'?a[i]:m})
      };
    }

})(Apt);