// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

QUnit.module('apt-core',
{
  // beforeEach: function() {},
  // afterEach: function() {}
});

QUnit.test('check that Apt() is always exposed', function(assert)
{
  assert.ok( Apt && Apt() );
});

// Many JavaScript libraries use $ as a function or variable name, just as jQuery does. In jQuery's case, $ is just an alias for jQuery, so all functionality is available without using $. If you need to use another JavaScript library alongside jQuery, return control of $ back to the other library with a call to $.noConflict(). Old references of $ are saved during jQuery initialization; noConflict() simply restores them.

QUnit.test('check that Apt() has a $() alias (if )', function(assert)
{
  assert.deepEqual($, Apt);
  assert.ok( $() instanceof Apt );
});

QUnit.test('$() acts as a DOM-ready wrapper', function(assert)
{
  var done = assert.async();
  // document.readyState = null
  assert.expect(1); // we have one async test to run
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

QUnit.test('Querying the DOM', function(assert)
{
  assert.deepEqual(
    document.getElementById('btn'),
    $('#btn')[0]
  );
  assert.ok($("#apt-fixtures UL > *") instanceof Array);
  assert.equal($("#apt-fixtures UL > *").length, 2);
});

QUnit.test('Iterates through all matched elements', function(assert)
{
	$("#apt-fixtures UL > *").forEach(function(p, i){
		assert.ok(p === $("#apt-fixtures UL > *")[i]);
	})
});