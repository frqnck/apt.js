$.src("../../src/apt-dom.js");

// ----------------------------------------------------------------------------

QUnit.module('apt-dom', {
  setup: function(){
    $('#apt-fixtures').html('<ul><li class="f">foo</li><li class="b">bar</li></ul><button id="btn">Click</button>')
  },
  teardown: function(){
    $('#apt-fixtures').html('');
  }
});

(function () {
  'use strict';

  test('Query the dom', 1, function () {
    ok($('ul li').length === 2);
  });

  test('Fail silently for unmatched elements', 2, function () {
    ok($(null).length === 0);
    ok($('asd').length === 0);
  });

  test('Wrap a DOM element with $', 1, function () {

    ok($(document.getElementById('btn')) instanceof $);
  });

  test('Ready method', 1, function () {
    $(function() {
      ok(true === true);
    });
  });

  test('Iterate through all matched elements', 2, function () {
    $('ul li').each(function (p, i) {
      ok(p === $('ul li')[i]);
    });
  });

  test('Understands CSS selector', function() {
    equal( $('#btn')[0], document.getElementById('btn') );
  
    var el = $().html();
    ok( el.length == 0 );
    // var el = $('button').html();
  });

  // test('html() returns innerHTML', function() {

  //   console.log( $('#btn').html() );
  //   equal( $('#btn').html(), document.getElementById('btn').innerHTML );
  
  // });


  test('html() Selector', function() {
    var h = "<div>", el = $(h)
    ok( el.length == 1 )
    equal($("<div>")[0].outerHTML, "<div></div>")
 
    h = "<div>hello world</div>"
    el = $(h)
    ok( el.length == 1 );
    equal($(h)[0].outerHTML, "<div>hello world</div>")

    h = "<div>hello</div> <span>world</span>"
    el = $(h)
    ok( el.length == 2 );
    equal($(h)[1].outerHTML, "<span>world</span>")

    h = $("<div></div><div />")
    equal(h.length, 2)
  });

  test('addClass() and removeClass()', function() {
    var el = $('ul li');
    equal( el[0].className, 'f' );

    el.addClass('on');
    equal( el[0].className, 'f on' );

    el.removeClass('on');
    equal( el[0].className, 'f' );

    // el.removeClass('f');
    // equal( el[0].className, '' );
  });

  test('css()', function() {
    var el = $('<div id="x" />');
    equal( el[0].id, 'x' );
    el.css('color', 'red');
    equal(el[0].style.color, 'red');
  });

  test('css() in legacy mode', function() {
    $.legacy = true;
    var el = $('<div id="x" />');
    equal( el[0].id, 'x' );
    el.css('color', 'red');
    equal(el[0].style.color, 'red');
  });


}());