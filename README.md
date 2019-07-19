# :rocket: Apt.js – a few bytes long in-browser library

Minimalist, fast, rather-slim and pretty concise JavaScript library. Provides the flavour of both *jQuery* and *RequireJS* without the payload. ***Small enough to be embedded in any first-byte***.

> We have use this in production on Info.com and other properties since early 2009. It allowed use to reduce the payloads of our pages considerably to a just a few KBs and the number of subsequent includes/requests to just a few. Gave us immediate page rendering as it is non-blocking, reduced bandwich consumption. great with mobile traffic...

**Apt** stands for "Array Prototype Touchdown" :football:

## Instalation

Ideally the content of `dist/apt.min.js` would be embedded right into the `<head>`of your page, below your CSS declaration however feel free to add it whichever way you want.

You can also copy & paste the code block below: 

```js
<script>
/*! apt.js v0.1.3-2 | MIT License | github.com/frqnck/apt.js */
!function(a,p,t,$){function s(e,n,s,r){for(r=(s=e&&e.nodeType?[e]:""+e===e?/</.test(e)?((r=t.createElement(n||"Ap")).innerHTML=e,r.children):(n&&$(n)[0]||t).querySelectorAll(e):e||a).length;r--;a.unshift.call(this,s[r]));}$=function(e,n){return/^f/.test(typeof e)?/in/.test(t.readyState)?setTimeout("$("+e+")",9):e():new s(e,n)},s[p]=$[p]=$.fn=Array[p].slice(0),$.fn.each=function(e,n){return a.forEach.call(this,e,n),this},$.type=function(e){return e instanceof $?"$":{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1]},(Apt=$).w=window,$.d=t,void 0===$.w.$&&($.w.$=$),$.ajax=function(e,n,s,r){n=n||function(){};try{r=new XMLHttpRequest}catch(e){for(var a=[6,3],c=0;c<a.length;c++)try{r=new ActiveXObject("Msxml2.XMLHTTP."+a[c]+".0")}catch(e){continue}}return r.open(s&&s.toUpperCase()||"GET",e,!0),r.onreadystatechange=function(){4==(r=this).readyState&&0!=r.status&&n&&(r.parse=function(){return JSON.parse(r.responseText)},n(r.responseText,200<=r.status&&r.status<300,r))},s||r.send(),r},$.legacy=!$.w.addEventListener&&$.w.attachEvent;function n(e,t,n,s,p,r){return r="EventListener",e.each(function(a){a["add"+r]?a[s+r](t,n,!1):a[p+"tachEvent"]("on"+t,n)})}$.fn.on=function(t,e){return n(this,t,e,"add","at")},$.fn.off=function(t,e){return n(this,t,e,"remove","de")},$.fn.html=function(n){return 0 in arguments?this.each(function(e){e.innerHTML=n}):0 in this?this[0].innerHTML:""},$.fn.addClass=function(n){return this.each(function(e){e.classList?e.classList.add(n):e.n+=" "+n})},$.fn.removeClass=function(n){return this.each(function(e){e.classList?e.classList.remove(n):e.n=e.n.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," ")})},$.fn.css=function(n,s){return n+=":",this.each(function(e){$.legacy?e.style.cssText=n+("inherit"==s?"block":s):e.setAttribute("style",n+s)})},$.fn.append=function(n){return n="$"==$.type(n)?n[0]:n,this.each(function(e){e.appendChild(n)})};$.src=function(){var e=arguments,n=e.length,s=e[n-1],r=s.call,c=document;r&&n--;function i(e){if(e?this.success="error"!==e.type:function(e,n){n=e.readyState,e.children,"loaded"==n&&"loading"==e.readyState&&(e.success=!1),/in/.test(e.readyState)||(e.success="complete"==n||null)}(this),null!==this.success&&r&&!--n)return s(o.every(function(e){return e.success}))}for(var o=[],u=0;u<n;u++){var f=e[u],l=l||(-1<f.indexOf(".css")?"link":"script"),h={link:{rel:"stylesheet",href:f},script:{type:"text/javascript",src:f,async:!0}};for(var d in o[u]=c.createElement(l),o[u].success=null,h[l])o[u][d]=h[l][d];c.attachEvent&&!c.addEventListener?o[u].onreadystatechange=i:(o[u].onload=o[u].onerror=i,$("head")[0].appendChild(o[u]))}return this}}([],"prototype",document);
</script>
```

## Usage
```html
<script> // (below $ === Apt)
  $(function(){ // wait for the DOM to ready

    // Apply a native Javascript method to a collection. 
    $('ul li').push($('<li class="bar"/>')[0]);

    // Load some files asynchrnously then run a callback
    $.src('my.css', 'my.js', function(success){});

    // Extend/add a new method using `Apt.fn`
    $.fn.toggle = function () {
      return this.each(function (e) {
        e.style.display=e.style.display=='none'?'':'none';
      })
    }
  
  // then use as follow..
  $('ul li.bar').toggle();
});
</script>
```

Above we use the shorthand `$` to invoke `Apt`. Apt does not provide jQuery like boilerplate methods but instead exposes the native JavaScript Array object methods to keep the code base light and portable. List of modules are listed below.

## Apt modules

### Bundle with `apt.js`

<details><summary><b>core</b> - Provides the `Apt()` core objet/selector (and if free, it will also use the `$` shortand).</summary><p>

```js
`Apt()`	// Core `Apt` selector object returns a collection.
`$`	// Alias of `Apt` if global `$` is free - jQuery like!
`$.fn`	// to extend Apt prototype.
```
```js
`$.type()`	// Returns type
`$("ul li").each(...);`	// Iterare over the collection items.
```
```js
- `$().push(el)` // Adds one or more elements to the end, and returns the new length of the collection.
- `$().pop(el)` // Removes and returns the last element from the collection.
- `$().shift(el)` // Same as pop() but from the beginning.
- `$().unshift(el)` // Same as push() but from the beginning.
- `$().slice(0,1)` // Extracts a section, returns a new.
- `$().slice(0,1,el)` // Add/remove from specific location.
- `$().sort()`  // Sorts
- `$().reverse()` // Reverses
- `$().concat()`  // Joins 2 or more
- `$().join()`  // Joins all elements into a string
- and the usual `unique()`, `reduce()`, `indexOf()`, `filter()`, `some()`, `map()`, `every()`, ...
```
</p></details>

<details><summary><b>src</b> - Load any files (e.g. css, js and jsonp) asynchronously – just like "RequireJS"</summary><p>

```js
$.src("/my_styles.css", "/my_scripts.jss", "...");
$.src("/my_scripts.jsonp");
```
You can also use a callback as the last argument.
```js
$.src("/my_scripts.js", function(success) { console.log("success == true, succesfully loaded") } );
$.src("/my_styles.css", "/my_scripts.jss", "...", function(success) {} );
```

</p></details>

<details><summary><b>event</b> - Event handling.</summary><p>

```js
var callback = function(event){ console.log(event); }
$("div .link").on('mouseover', callback);
$("div .link").off('mouseover', callback);
```
</p></details>

<details><summary><b>dom</b> - DOM methods.</summary><p>

```js
var h = "Some <b>HTML</b>";
$('h1').html(h);
var out =$('h1').html(); // -> out == h
```
```js
$('ul li').addClass('foo');
$('ul li').removeClass('bar');
```
```js
$('.offers').css('diplay', 'none');
```
</p></details>

<details><summary><b>ajax</b> - Ajax/XMLHttpRequest loader.</summary><p>

```js
var callback = function(data, success, xhr){ console.log(data, success, xhr); }
$.ajax('https://api.github.com/users/frqnck', callback); // GET by default

var api = $.ajax('https://api.github.com/users/frqnck', callback, 'post');
api.send("foo=bar&buz=bar"); 
```
</p></details>

### Additionals extra

<details><summary><b>utils</b> (apt-utils.js) - collection of small, helpful utilities for common tasks.</summary><p>

```js
$.getUrlVars();			//
$.getCookie('name');	//
$.rmTags(html);			//
```
```js
var tpl = "Template {0} - {1}";
tpl.format(""foo", "bar");  // 
```
</p></details>

<details>
	<summary><b>shims</b> (apt-utils.js) - ECMAScript 5 compatibility shims for legacy browser; support IE8 and below including IE9 Quirk mode.</summary>

```js
- forEach()			-applies a callback to all the elements.
- map()				- creates new array thru callback.
- every() 			- tests a callback against the elements
- some()			- similar to every() but stop at first true!
- filter()          - creates new array with the elements that pass the test.
- indexOf			- returns the index of first matching element.
- reduce() 			- Iteratively reduce the array to a single value using a callback
```
</details>

## Test suite

The code is covered by extensive unit testing.

### :arrow_forward: [Test right from your Web browser](https://frqnck.github.io/apt.js/test/index.html)

### Local automated test

We use headless Chrome and PhantomJS to run our automated testing. Installation is straight forward just run 

~~~ sh
$ yarn install
~~~

To run the automated tests:

~~~ sh
$ yarn test
~~~

You can replace `yarn` by `npm` if that what rock your boat.

This package is also available via [NPM](https://www.npmjs.com/package/apt.js).

## Contribution

⇄ *[Pull requests](//github.com/frqnck/apt-js/blob/master/.github/CONTRIBUTING.md)* and ★ *Stars* are always welcome. For bugs and feature request, please [open an issue](//github.com/frqnck/apt-js/issues/new).


## License

This work is licensed under the MIT license – see the [LICENSE](MIT-LICENSE) for the full details.<br>Copyright (c) 2009-2018 Franck Cassedanne
