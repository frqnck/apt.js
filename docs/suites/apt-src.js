// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

// Source sinon.js mockup server
$.src("https://cdnjs.cloudflare.com/ajax/libs/sinon.js/7.3.2/sinon.min.js");

$.fn.parent = function() {
  return (this.length<2) ? $(this[0].parentNode): [];
};

$.fn.remove = function() {
  return this.each(function(e){
    e.parentNode.removeChild(e)
  })
};

var _apt = {},
    files = {
      js: basePath + '/fixtures/file.js',
      css: basePath + '/fixtures/file.css'
    },
    rnd = function(file) {
      return file + '?cacheBuster=' + Math.random();
    };

QUnit.module('apt-src', {
  beforeEach: function() { 
  },
  afterEach: function() {
    $("head [src='"+files.js+"'],[href='"+files.css+"']").remove();
  }
});

// ----------------------------------------------------------------------------

QUnit.test('Add a JavaScript file', function(assert)
{
  var file = rnd(files.js);
  $.src(file);
  assert.equal( $("head script[src='"+file+"']").length, 1);
});

// ----------------------------------------------------------------------------

QUnit.test('Add a CSS file', function(assert)
{
  var file = rnd(files.css);
  $.src(file);
  assert.equal( $("head link[href='"+file+"']").length, 1);
});

// ----------------------------------------------------------------------------

QUnit.test('Add many files in chain', function(assert)
{
  var js = rnd(files.js),
      css = rnd(files.css);

  $.src(js).src(css);

  assert.equal( $("head script[src='"+js+"']").length, 1);
  assert.equal( $("head link[href='"+css+"']").length, 1);
});

// ----------------------------------------------------------------------------

QUnit.test('Add the exact same file many time over', function(assert)
{
  $.src(files.js).src(files.js);
  $.src(files.js);

  assert.equal( $("head script[src='"+files.js+"']").length, 3);
});

// ----------------------------------------------------------------------------

QUnit.test("All JS files loaded, callback(success == true).", function(assert)
{
  assert.expect(2);
  var done = assert.async(),
      callback = function(success) {
        assert.equal(success, true, "should be true!");
        done();
        assert.equal(
          _apt.loadedFunc(files.js, success),
          "file: '../fixtures/file.js'), success: true"
        );
      };

    // var js = rnd(files.js),
    // css = rnd(files.css);

  $.src(
    rnd(files.js), rnd(files.js)+"&foo", rnd(files.js)+"&bar",
    callback
  );
});

// ----------------------------------------------------------------------------

QUnit.test("One file fail, callback(success == false).", function(assert)
{
  assert.expect(2);
  var done = assert.async(),
      callback = function(success) {
        assert.equal( success, false, "should be false!");
        done();
        assert.equal(
          _apt.loadedFunc(files.js, success),
          "file: '../fixtures/file.js'), success: false"
        );
      };
  
  $.src(
    rnd(files.js),
    rnd('/null-never-load.js'),
    rnd(files.js)+"&foo",
    callback
  );
});

// ----------------------------------------------------------------------------

QUnit.test('Callback with CSS files...', function(assert)
{
  var done1 = assert.async();
  var done2 = assert.async();
  var done3 = assert.async();
  assert.expect(3);

  function onceLoaded1(success) {
    assert.equal( success, true, "success == true, succesfully loaded" );
    done1();
  }

  function nullNeverLoad(success) {
    assert.equal( success, false, "success == false, unsuccessul loaded" );
    done2();
  }

  function onceLoaded2(success) {
    assert.equal( success, true, "success == true, succesfully loaded" );
    done3();
  }

  $.src(rnd(files.css), onceLoaded1);
  $.src(rnd('null-never-load.css'), nullNeverLoad);
  $.src(rnd(files.css), onceLoaded2);
});

// ----------------------------------------------------------------------------

// QUnit.test('TODO JSONP??', function(assert) {});
