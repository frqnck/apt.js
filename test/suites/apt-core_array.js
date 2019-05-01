var FOO = ['B', 'A', 'R'];

QUnit.module('apt-core_array', {
	setup: function()
	{
    _apt = {
    	elements: $(FIXTURE_UL),
    }
	},
  // teardown: function() {}
});

test('$() is instance of Array', function()
{
	ok(_apt.elements instanceof Array);
	equal(_apt.elements.length, 2);
});

test('$().push() and $().pop()', function()
{
	deepEqual( _apt.elements.push(FOO), 3 );
	deepEqual( _apt.elements.pop(), FOO );
});

test('$().shift() and $().unshift()', function()
{
	deepEqual( _apt.elements.unshift(FOO), 3 );
	deepEqual( _apt.elements.shift(FOO), FOO );
});

// TODO: check fill IE8 complience!
test('$().slice()', function()
{
	deepEqual( _apt.elements.slice(0,1), [_apt.elements[0]] );
	deepEqual( _apt.elements.slice(1,2), [_apt.elements[1]] );

	// var last = _apt.elements.slice(-1)[0];
	// ok( last.id == 't2', "Should return the last element id" );
});

test('$().splice()', function()
{
	deepEqual( _apt.elements.splice(0,0, FOO), [] );
	deepEqual( _apt.elements.splice(0,1), [FOO] );
	deepEqual( _apt.elements.sort(), _apt.elements.reverse().reverse() );
});

test('$().sort() and $().reverse()', function()
{
	deepEqual( _apt.elements.sort(), _apt.elements.reverse().reverse() );
});

test('$().concat()', function()
{
	equal( _apt.elements.concat(FOO).length, 4 );
	equal( _apt.elements.length, 2, "Should stayed untouched after previous concat()");
});

test('$().join()', function()
{	
	deepEqual( $(FOO).join(', '), 'B, A, R');
});

test('$().forEach()', function()
{
	_apt.elements.forEach(function(p, i) {
		ok(p === _apt.elements[i]);
	});

	_apt.elements.forEach(function(e, i, r){
		e.foo = "bar"
	});
	ok( _apt.elements[0].foo === _apt.elements[1].foo );
});

test('$().map()', function()
{
	var numbers = [1, 4, 9],
		roots = $(numbers).map(Math.sqrt);

	deepEqual( roots.slice(), [1,2,3] );
	deepEqual( numbers, [1, 4, 9], "numbers array stay intact" );

	var txts = _apt.elements.map(function(e){ return e.innerHTML } );
	deepEqual( txts.slice(), ['foo', 'bar'] );
});

test('$().every()', function()
{
	var	hasClass = function(e){return e.hasAttribute('class')};
	deepEqual(_apt.elements.every( hasClass ), true, "All elements have a 'class' attribute.");
	_apt.elements[0].removeAttribute('class');
	deepEqual(_apt.elements.every( hasClass ), false, "One element has no 'class' attribute.");
});

test('$().some()', function()
{
	function isBiggerThan10(element, index, array) {
	  return element > 10;
	}
	deepEqual($([2, 5, 8, 1, 4]).some(isBiggerThan10), false );
	deepEqual($([12, 5, 8, 1, 4]).some(isBiggerThan10), true );
});

test('$(array).filter()', function()
{
	var numbers = [12, 5, 8, 130, 44, 10],
		 	expected = [12, 130, 44];

	function above10(e){ return e > 10 }
	
	var native_version = numbers.filter(above10);
	deepEqual( native_version, expected );

	var dollar_version = $(numbers).filter(above10);
	deepEqual( dollar_version, expected );
});

test('$().filter(function)', function()
{
	var filtered = _apt.elements.filter(function(e){
		return e.getAttribute('class') == 'b'
	});
	equal( $(filtered)[0], _apt.elements[1] );
});

test('$().indexOf()', function()
{
	var r = [2, 5, 9];
	deepEqual( $(r).indexOf(2), 0);
	deepEqual( $(r).indexOf(7), -1);
	deepEqual( $(r).indexOf(9), 2);
	deepEqual( $(r).indexOf(2, -1), -1);
	deepEqual( $(r).indexOf(2, -3), 0);

	deepEqual( _apt.elements.indexOf(_apt.elements[1]), 1 );
	
	// TODO check this out!
	var last = _apt.elements.indexOf(1,1);
	deepEqual( last, -1 );
});

test('$().reduce()', function()
{
	var r1 = [0,1,2,3],
		  r2 = [[0,1],[2,3]];

	deepEqual($(r1).reduce(function(a,b){return a+b}), 6);
	deepEqual($(r2).reduce(function(a,b){return a.concat(b)}), r1);

	// duplicate an elements (clone)
	_apt.elements.push( _apt.elements.slice(0) );
	_apt.elements[2].innerHTML = 'biz';

	// elements
	deepEqual( _apt.elements.reduce(
		function(memo, e, i, r){
			memo[i] = e.innerHTML;
			return memo;
		}, []
	), ['foo', 'bar', 'biz'] );
});

test('$().reduce() as per PHP', function()
{
	var sum = function(carry, item){
	    		carry += item; return carry;
			},
			multiply = function(carry, item){
	    		carry *= item; return carry;
			},
			a = [1,2,3,4,5];

	deepEqual( $(a).reduce(sum), 15);
	deepEqual( $(a).reduce(multiply, 10), 1200, "=> 10*1*2*3*4*5=1200");

	var s = "Empty array, no data to reduce"
	deepEqual( $([]).reduce(sum, s), s);

	var f = function(){}
	deepEqual( $().reduce(sum, f), f);
});

test('$().unique()', function()
{
	// duplicate an elements (shallow)
	_apt.elements.push(_apt.elements[0]);

	deepEqual( _apt.elements.length, 3);

	$.fn.unique = function() {
	    return this.reduce(function(u, c) {
	        if(u.indexOf(c)==-1)
	        	u.push(c);
	        return u
	    }, $());
	};

	// reduce to unique elements
	deepEqual( _apt.elements.unique().length, 2 );
	deepEqual( _apt.elements.unique(), $(FIXTURE_UL) );
});