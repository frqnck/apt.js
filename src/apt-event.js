// apt-event.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

;(function($){

    // Detects IE <= 8 and IE9 in Quirks Mode
    $.legacy = !$.w.addEventListener && $.w.attachEvent;

    /**
     * Binds the named event type to a listener.
     * @method _eventBind
     * @param {string} t - The event type to handle e.g. 'click'.
     * @param {function(Object)} f - The listener to handle.
     * @return {self}
     * @private
     */
    var _e = function (e, t, f, v, p, l) {
        l = 'EventListener';
        return e.each(function (a) {
            a['add' + l]
                ? a[v + l](t, f, false)
                : a[p + 'tachEvent']('on' + t, f)
        })
    }

    /**
     * Registers an event listener.
     * @method on
     * @param {string} a - The event type to listen e.g. 'click'.
     * @param {function(Object)} b - The listener to call.
     * @return {self}
     * See {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
     */
    $.fn.on = function (a, b) {
        return _e(this, a, b, 'add', 'at')
    }

    /**
     * Removes a previously registered event listener.
     * @method off
     * @param {string} a - The event type being removed e.g. 'mouseout'.
     * @param {function(Object)} b - The listener to remove.
     * @return {self}
     * See {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
     */
    $.fn.off = function (a, b) {
        return _e(this, a, b, 'remove', 'de')
    }
     
})(Apt)