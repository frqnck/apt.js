// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

var FOO = ['B', 'A', 'R'];
var LI = $('<li/>')[0];

QUnit.module('apt-core_native', {
	beforeEach: function()
	{
    this.elements = $("#apt-fixtures UL > *");
	},
  // afterEach: function() {}
});

QUnit.test('$() is instance of Array', function(assert)
{
	assert.ok($("#apt-fixtures UL > *") instanceof Array);
	assert.equal($("#apt-fixtures UL > *").length, 2);
});

QUnit.test('$().push(element)', function(assert)
{
	assert.deepEqual( this.elements.push(LI), 3);
	assert.deepEqual( this.elements.push(LI, LI), 5);
});

QUnit.test('$().pop(element)', function(assert)
{
	assert.deepEqual( this.elements.push(LI), 3);
	assert.deepEqual( this.elements.pop(), LI);
});

QUnit.test('$().shift(element) and $().unshift(element)', function(assert)
{
	assert.deepEqual( this.elements.unshift(LI), 3 );
	assert.deepEqual( this.elements.shift(LI), LI );
});

// TODO: check fill IE8 complience!
QUnit.test('$().slice(0, 1)', function(assert)
{
	assert.deepEqual( this.elements.slice(0,1), [this.elements[0]] );
	assert.deepEqual( this.elements.slice(1,2), [this.elements[1]] );
	assert.deepEqual( $("#apt-fixtures ul li"), this.elements, "The original collection stay unmodified");

	var last = this.elements.slice(-1)[0];
	assert.deepEqual( last, this.elements[1], "Should return the last element id" );
});

// Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
QUnit.test('$().splice(0, 1)', function(assert)
{
	assert.deepEqual( this.elements.splice(0,0, LI), [] );
	assert.deepEqual( this.elements.splice(0,1), [LI] );
});

QUnit.test('$().sort() and $().reverse()', function(assert)
{
	assert.deepEqual( this.elements.sort(), this.elements.reverse().reverse() );
});

QUnit.test('$().concat()', function(assert)
{
	assert.equal( this.elements.concat(FOO).length, 4 );
	assert.equal( this.elements.length, 2, "Should stayed untouched after previous concat()");
});

QUnit.test('$().join()', function(assert)
{	
	assert.deepEqual( $(FOO).join(', '), 'B, A, R');
});

QUnit.test('$().forEach()', function(assert)
{
	var self = this;
	this.elements.forEach(function(p, i) {
		assert.ok(p === self.elements[i]);
	});

	this.elements.forEach(function(e, i, r){
		e.foo = "bar"
	});
	assert.ok( this.elements[0].foo === this.elements[1].foo );
});

QUnit.test('$().map()', function(assert)
{
	var numbers = [1, 4, 9],
		roots = $(numbers).map(Math.sqrt);

	assert.deepEqual( roots.slice(), [1,2,3] );
	assert.deepEqual( numbers, [1, 4, 9], "numbers array stay intact" );

	var txts = this.elements.map(function(e){ return e.innerHTML } );
	assert.deepEqual( txts.slice(), ['foo', 'bar'] );
});

QUnit.test('$().every()', function(assert)
{
	var	hasClass = function(e){return e.hasAttribute('class')};
	assert.deepEqual(this.elements.every( hasClass ), true, "All elements have a 'class' attribute.");
	this.elements[0].removeAttribute('class');
	assert.deepEqual(this.elements.every( hasClass ), false, "One element has no 'class' attribute.");
});

QUnit.test('$().some()', function(assert)
{
	function isBiggerThan10(element, index, array) {
	  return element > 10;
	}
	assert.deepEqual($([2, 5, 8, 1, 4]).some(isBiggerThan10), false );
	assert.deepEqual($([12, 5, 8, 1, 4]).some(isBiggerThan10), true );
});

QUnit.test('$(array).filter()', function(assert)
{
	var numbers = [12, 5, 8, 130, 44, 10],
		 	expected = [12, 130, 44];

	function above10(e){ return e > 10 }
	
	var native_version = numbers.filter(above10);
	assert.deepEqual( native_version, expected );

	var dollar_version = $(numbers).filter(above10);
	assert.deepEqual( dollar_version, expected );
});

QUnit.test('$().filter(function)', function(assert)
{
	var filtered = this.elements.filter(function(e){
		return e.getAttribute('class') == 'b'
	});
	assert.equal( $(filtered)[0], this.elements[1] );
});

QUnit.test('$().indexOf()', function(assert)
{
	var r = [2, 5, 9];
	assert.deepEqual( $(r).indexOf(2), 0);
	assert.deepEqual( $(r).indexOf(7), -1);
	assert.deepEqual( $(r).indexOf(9), 2);
	assert.deepEqual( $(r).indexOf(2, -1), -1);
	assert.deepEqual( $(r).indexOf(2, -3), 0);

	assert.deepEqual( this.elements.indexOf(this.elements[1]), 1 );
	
	// TODO check this out!
	var last = this.elements.indexOf(1,1);
	assert.deepEqual( last, -1 );
});

QUnit.test('$().reduce()', function(assert)
{
	var r1 = [0,1,2,3],
		  r2 = [[0,1],[2,3]];

	assert.deepEqual($(r1).reduce(function(a,b){return a+b}), 6);
	assert.deepEqual($(r2).reduce(function(a,b){return a.concat(b)}), r1);

	// duplicate an elements (clone)
	this.elements.push( this.elements.slice(0) );
	this.elements[2].innerHTML = 'biz';

	// elements
	assert.deepEqual( this.elements.reduce(
		function(memo, e, i, r){
			memo[i] = e.innerHTML;
			return memo;
		}, []
	), ['foo', 'bar', 'biz'] );
});

QUnit.test('$().reduce() as per PHP', function(assert)
{
	var sum = function(carry, item){
	    		carry += item; return carry;
			},
			multiply = function(carry, item){
	    		carry *= item; return carry;
			},
			a = [1,2,3,4,5];

	assert.deepEqual( $(a).reduce(sum), 15);
	assert.deepEqual( $(a).reduce(multiply, 10), 1200, "=> 10*1*2*3*4*5=1200");

	var s = "Empty array, no data to reduce"
	assert.deepEqual( $([]).reduce(sum, s), s);

	var f = function(assert){}
	assert.deepEqual( $().reduce(sum, f), f);
});

QUnit.test('$().unique()', function(assert)
{
	// duplicate an elements (shallow)
	this.elements.push(this.elements[0]);

	assert.deepEqual( this.elements.length, 3);

	$.fn.unique = function(assert) {
	    return this.reduce(function(u, c) {
	        if(u.indexOf(c)==-1)
	        	u.push(c);
	        return u
	    }, $());
	};

	// reduce to unique elements
	assert.deepEqual( this.elements.unique().length, 2 );
	assert.deepEqual( this.elements.unique(), $("#apt-fixtures UL > *") );
});
