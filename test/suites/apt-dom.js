// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

// Source apt-dom.js
if(from_src) {
  $.src("../../src/apt-dom.js");
}

// ----------------------------------------------------------------------------

QUnit.module('apt-dom', {
  beforeEach: function(){
    var h = '<ul class="test"><li class="f">foo</li><li class="b">bar</li></ul><button id="btn">Click</button>';
    $('#apt-fixtures').html(h);
  },
  afterEach: function(){
  }
});

(function() {
  'use strict';

  QUnit.test('Query the DOM', function(assert) {
    assert.deepEqual($('#apt-fixtures ul.test li').length, 2);
  });

  QUnit.test('Query the DOM, narrowed to provided context', function(assert) {
    assert.deepEqual($('ul.test li', '#apt-fixtures').length, 2);

    var h = '<div id="bar"><ul class="test"><li\><li\><li\><li\></ul></div>';
    $('#apt-fixtures').append($(h));

    assert.deepEqual($('ul.test li', '#bar').length, 4);
    assert.deepEqual($('ul.test li', '#apt-fixtures').length, 6);
  });

  QUnit.test('Fail silently for unmatched elements', function(assert) {
    assert.ok($(null).length === 0);
    assert.ok($('asd').length === 0);
  });

  QUnit.test('Wrap a DOM element with $', function(assert) {
    assert.ok($(document.getElementById('btn')) instanceof $);
  });

  QUnit.test('Ready method', function(assert) {
    $(function() {
      assert.ok(true === true);
    });
  });

  QUnit.test('Iterate through all matched elements', function(assert) {
    $('#apt-fixtures ul li').each(function(p, i) {
      assert.ok(p === $('#apt-fixtures ul li')[i]);
    });
  });

  QUnit.test('Understands CSS selector', function(assert) {
    assert.deepEqual( $('#btn')[0], document.getElementById('btn') );
  
    var el = $().html();
    assert.deepEqual(el.length, 0);
  });

  QUnit.test('html() returns innerHTML', function(assert) {
    assert.deepEqual( $('#btn').html(), document.getElementById('btn').innerHTML );
  });

  QUnit.test('html() selector', function(assert) {
    var h = "<div>",
    el = $(h);

    assert.deepEqual(el.length, 1);
    assert.deepEqual($("<div>")[0].outerHTML, "<div></div>");
 
    h = "<div>hello world</div>";
    el = $(h);
    assert.ok( el.length == 1 );
    assert.deepEqual($(h)[0].outerHTML, h)

    h = "<div>hello</div> <span>world</span>"
    el = $(h)
    assert.ok( el.length == 2 );
    assert.deepEqual($(h)[1].outerHTML, "<span>world</span>")

    h = $("<div></div><div />")
    assert.deepEqual(h.length, 2)
  });

  QUnit.test('addClass() and removeClass()', function(assert) {
    var el = $('#apt-fixtures ul li');
    assert.deepEqual( el[0].className, 'f' );

    el.addClass('on');
    assert.deepEqual( el[0].className, 'f on' );

    el.removeClass('on');
    assert.deepEqual( el[0].className, 'f' );

    // el.removeClass('f');
    // assert.deepEqual( el[0].className, '' );
  });

  QUnit.test('addClass() and removeClass() are chainable', function(assert) {
    var el = $('#apt-fixtures ul li');
    el.addClass('foo').addClass('bar');
    assert.deepEqual( el[0].className, 'f foo bar' );

    el.removeClass('foo').removeClass('bar')
    assert.deepEqual( el[0].className, 'f' );
  });

  QUnit.test('css()', function(assert) {
    var el = $('#apt-fixtures ul').css('color', 'green');
    assert.deepEqual(el[0].style.color, 'green');

    el = $('#apt-fixtures ul li').css('color', 'red');
    assert.deepEqual(el[0].style.color, 'red');
    assert.deepEqual(el[1].style.color, 'red');
  });

  QUnit.test('css(), legacy mode', function(assert) {
    $.legacy = true;
    var el = $('<div id="x" />');
    assert.deepEqual( el[0].id, 'x' );
    el.css('color', 'red');
    assert.deepEqual(el[0].style.color, 'red');
  });

  QUnit.test('$().append() is chainable', function(assert) {
    var h = '<li>text</li>';
    $("#apt-fixtures ul").append($(h));
    $("#apt-fixtures ul").append($(h)).append($(h));
    assert.deepEqual( $("#apt-fixtures UL > *").length, 5 );
  });

}());