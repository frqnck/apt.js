// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

QUnit.module('apt-core',
{
  // beforeEach: function() {},
  // afterEach: function() {}
});

QUnit.test('Apt() - check that it is exposed', function(assert)
{
  assert.ok( Apt && Apt() );
});

QUnit.test('Apt() - check for $ alias', function(assert)
{
  assert.deepEqual($, Apt);
  assert.ok( $() instanceof Apt );
});

QUnit.skip('Apt() - check has a $ alias (only if global $ is unused)', function(assert)
{
  // TODO: check alias only if $ unused
});

QUnit.test('$() acts as a DOM-ready wrapper', function(assert)
{
  var done = assert.async();
  document.readyState = false; // TODO that's read only?!
  assert.expect(1);
  $(function(){
    assert.deepEqual(document.readyState, "complete", "Run once the DOM is fully loaded. Just like jQuery's ready() method.");
    done();
  });
});

QUnit.test('$() always extends Array.prototype', function(assert)
{
  assert.ok( $() instanceof Array );
  assert.equal($().length, 0);
  assert.equal($(null).length, 0);
  assert.equal($('non-existant').length, 0);
});

QUnit.test('$(DOM) is also a DOM wrapper', function(assert)
{
  var $d = $(document.getElementById('btn'))
  assert.ok( $d instanceof $ );
  assert.ok( $d instanceof Array );
  assert.ok( $d.length === 1 );
});

QUnit.test('$("htmlString") should work', function(assert)
{
  var DOM = $(
    '<div><span class="foo">bar</span><span class="bar">foo</span></div>'
  );

  assert.ok( DOM instanceof Array );
  assert.equal( DOM[0].firstChild.innerHTML, 'bar' );
  assert.equal( DOM[0].lastChild.innerHTML, 'foo' );
  assert.equal( $('.bar', DOM[0])[0].innerHTML, 'foo' );

  // assert.equal( $('.bar', DOM[0]).html(), 'foo' );
});

QUnit.test('$("..")[0] - querying the DOM', function(assert)
{
  assert.deepEqual(
    document.getElementById('btn'),
    $('#btn')[0]
  );
  assert.ok($("#apt-fixtures UL > *") instanceof Array);
  assert.equal($("#apt-fixtures UL > *").length, 2);
});

QUnit.test('$().foreach() - iterates through all matched elements', function(assert)
{
	$("#apt-fixtures UL > *").forEach(function(p, i){
		assert.ok(p === $("#apt-fixtures UL > *")[i]);
	})
});

QUnit.test('$.type() - checks all posssible types', function(assert)
{
  assert.equal($.type($()), "$");
  assert.equal($.type(Apt()), "$");
  assert.equal($.type(''), "String");
  assert.equal($.type(64), "Number");
  assert.equal($.type(true), "Boolean");
  assert.equal($.type(null), "Null");
  assert.equal($.type(), "Undefined");
  assert.equal($.type([]), "Array");
  assert.equal($.type({}), "Object");
  assert.equal($.type(function(){}), "Function");

  assert.equal($.type(Error()), "Error");
  assert.equal($.type(RegExp()), "RegExp");
});