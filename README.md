
# :rocket: Apt.js – a few bytes long in-browser library

Minimalist, fast and supra-slim Javascript library. Provides the flavour of jQuery without the payload, small enough to be embedded in the firt-byte.

> We have use this in production at Info.com since early 2009. It allowed use to reduce the payloads of our SERPs considerably to a just a few KBs and the number of include/request to just a few. Gave us immediate page rendering as it is non-blocking, reduced bandwich consumption...

## Usage (WIP)

```html
<script>
  $(function(){ // Wait for the DOM to be fully loaded

		$('div > ul li').on('mouseover', function(event){ console.log(event); } );

		// load some additional files asynchrnously.
		$.src('my.csss', 'my.js');

		// Extend with nifty method
		$.fn.flip = function (prefix) {
			return this.each(function (i) {
				var r = i.innerText.split("").reverse().join("");
				i.innerText = prefix + ': ' + r;
			});
		}
		$('h1, h2, div.info > p').flip("Backward")
	
  });
</script>
```

## Apt modules

### Bundle with `apt.js`:

<details><summary><b>core</b> - Provides Apt() (and possibly `$()`) selector.</summary><p>

- length, `$("ul li").lenght;`
- each, `$("ul li").each(...);`
- push & pop 		— add/remove from the end
- shift & unshift 	— remove/add from the beginning
- slice 			- Extracts a section, returns a new
- splice  			— Add/remove from specific location
- sort 				- sorts
- reverse 			- reverses
- concat 			- joins 2 or more
- join 				- joins all elements into a string
- toString 			- Converts to a string
- many more...
</p></details>

<details><summary><b>src</b> - Load any files (e.g. css, js and jsonp) asynchronously.</summary><p>

- `$.src('/my_styles.css');`
- `$.src('/my_scripts.jss');`
- `$.src('/my_scripts.jsonp');`
</p></details>

<details><summary><b>event</b> - Event handling.</summary><p>

```js
.$().on('click');
.$().on('click');
```
</p></details>

<details><summary><b>dom</b> - DOM methods.</summary><p>

```js
TODO
```
</p></details>

<details><summary><b>ajax</b> - Ajax/XMLHttpRequest loader.</summary><p>

```js
TODO
```
</p></details>

### Additionals extra

<details><summary><b>utils</b> (apt-utils.js) - collection of small, helpful utilities for common tasks.</summary><p>

```js
TODO
```
</p></details>


<details>
	<summary><b>shims</b> (apt-utils.js) - ECMAScript 5 compatibility shims for legacy browser; support IE8 and below including IE9 Quirk mode.</summary>

- forEach()			-applies a callback to all the elements.
- map()				- creates new array thru callback.
- every() 			- tests a callback against the elements
- some()			- similar to every() but stop at first true!
- filter()          - creates new array with the elements that pass the test.
- indexOf			- returns the index of first matching element.
- reduce() 			- Iteratively reduce the array to a single value using a callback
</details>

## Distribution


## Contribution

⇄ *[Pull requests](//github.com/frqnck/apt-js/blob/master/.github/CONTRIBUTING.md)* and ★ *Stars* are always welcome. For bugs and feature request, please [open an issue](//github.com/frqnck/apt-js/issues/new).

### To run the automated test in your browser

https://htmlpreview.github.com/?https://github.com/frqnck/apt.js/blob/master/test/index.html

### To run the automated tests suite

~~~ sh
$ yarn test
~~~

We use `yarn` but you can equally use `npm`.

## License

This work is licensed under the MIT license -- see the [LICENSE](MIT-LICENSE) for the full details.<br>Copyright (c) 2009-2018 Franck Cassedanne
