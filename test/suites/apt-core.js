QUnit.module('apt-core',
{
  setup: function() {
    _apt.elements = $(FIXTURE_UL);
  },
  // teardown: function() {}
});

test('check that Apt is always exposed', function()
{
  ok( Apt && Apt() );
});

// Many JavaScript libraries use $ as a function or variable name, just as jQuery does. In jQuery's case, $ is just an alias for jQuery, so all functionality is available without using $. If you need to use another JavaScript library alongside jQuery, return control of $ back to the other library with a call to $.noConflict(). Old references of $ are saved during jQuery initialization; noConflict() simply restores them.

test('check that Apt has a $ alias (if )', function()
{
  deepEqual($, Apt);
  ok( $() instanceof Apt );
});

asyncTest('$() acts as a DOM-ready wrapper', function()
{
  // document.readyState = null
  expect(1); // we have one async test to run
  $(function(){
    deepEqual(document.readyState, "complete", "Run once the DOM is fully loaded. Just like ready() in jQuery.");
    start();
  });
});

test('$() always extends Array.prototype', function()
{
  ok( $() instanceof Array );
  equal($().length, 0);
  equal($(null).length, 0);
  equal($('non-existant').length, 0);
});

test('$(DOM) is also a DOM wrapper', function()
{
  var $d = $(document.getElementById('btn'))
  ok( $d instanceof $ );
  ok( $d instanceof Array );
  ok( $d.length === 1 );
});

test('$("htmlString") should work', function()
{
  var DOM = $(
    '<div><span class="foo">bar</span><span class="bar">foo</span></div>'
  );

  ok( DOM instanceof Array );
  equal( DOM[0].firstChild.innerHTML, 'bar' );
  equal( DOM[0].lastChild.innerHTML, 'foo' );
  equal( $('.bar', DOM[0])[0].innerHTML, 'foo' );

  // equal( $('.bar', DOM[0]).html(), 'foo' );
});

// TEMP
// test('$().append()', function()
// {
//   var h = '<p id="t3">text</p>';
//   var t = _apt.elements.append( h, $ELs, h );
//   // console.log($ELs, t);
//   equal( _apt.elements.length, 3 );
// });

test('Querying the DOM', function()
{
  deepEqual(
    document.getElementById('btn'),
    $('#btn')[0]
  );
  ok(_apt.elements instanceof Array);
  equal(_apt.elements.length, 2);
});

test('Iterates through all matched elements', function()
{
	_apt.elements.forEach(function(p, i){
		ok(p === _apt.elements[i]);
	})
});
