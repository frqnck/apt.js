# :rocket: Apt.js – a few bytes long in-browser library

Minimalist, fast, rather-slim and pretty concise JavaScript library. Provides the flavour of both *jQuery* and *RequireJs* without the payload and – ***it is small enough to be embedded in the firt-byte***.

> We have use this in production on Info.com and other properties since early 2009. It allowed use to reduce the payloads of our pages considerably to a just a few KBs and the number of subsequent includes/requests to just a few. Gave us immediate page rendering as it is non-blocking, reduced bandwich consumption. great with mobile traffic...

## Usage

Ideally the content of `dist/apt.min.js` would got into the `<head>` of your page right below your CSS declaration however feel free to add it whichever way you want.

```html
<script>
  // a short example...
  $(function(){ // wait for the DOM to ready

    // Load some files asynchrnously.
    $.src('my.css', 'my.js');

    // Extend easily using Apt.fn as such
    $.fn.toggle = function () {
      return this.each(function (e) {
        e.style.display=e.style.display=='none'?'':'none';
      })
    }
  
  // then use as follow..
  $('ul li').toggle();
});
</script>
```

Above we use the shorthand `$` to invoke `Apt` – enjoy!

## Apt modules

### Bundle with `apt.js`

<details><summary><b>core</b> - Provides Apt() (and possibly `$()`) selector.</summary><p>

```js
Apt	// Core `Apt` object
$	// Alias of `Apt` if global `$` is free - jQuery like!
$.fn	// to extend Apt prototype.
```
```js
$.type()	// Returns type
$("ul li").each(...);	// iterare over the items.
```
```js
- push & pop 			// Add/remove from the end
- shift & unshift 		// Remove/add from the beginning
- slice 			 	// Extracts a section, returns a new
- splice  			 	// Add/remove from specific location
- sort 				 	// Sorts
- reverse 			 	// Reverses
- concat 			 	// Joins 2 or more
- join 					// Joins all elements into a string
- ...
```
</p></details>

<details><summary><b>src</b> - Load any files (e.g. css, js and jsonp) asynchronously.</summary><p>

```js
$.src("/my_styles.css", "/my_scripts.jss", "...");
$.src("/my_scripts.jsonp");
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

### [Test right from your Web browser](https://frqnck.github.io/apt.js/test/index.html)

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

This work is licensed under the MIT license -- see the [LICENSE](MIT-LICENSE) for the full details.<br>Copyright (c) 2009-2018 Franck Cassedanne
