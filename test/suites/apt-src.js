$.fn.parent = function() {
  return (this.length<2) ? $(this[0].parentNode): [];
};

$.fn.remove = function() {
  return this.each(function(e){
    e.parentNode.removeChild(e)
  })
};

var files = {
  js: basePath+'/fixtures/file.js',
  css: basePath+'/fixtures/file.css'
};

QUnit.module('apt-src', {
   setup: function(){},
   teardown: function(){
    $("head [src='"+files.js+"'],[href='"+files.css+"']").remove();
   }
});

// ----------------------------------------------------------------------------

test('Add a JavaScript file', function()
{
  $.src(files.js);

  equal( $("head script[src='"+files.js+"']").length, 1);
});

// ----------------------------------------------------------------------------

test('Add a CSS file', function()
{
  $.src(files.css);

  equal( $("head link[href='"+files.css+"']").length, 1);
});

// ----------------------------------------------------------------------------

test('Add many files in chain', function()
{
  $.src(files.js).src(files.css);

  equal( $("head script[src='"+files.js+"']").length, 1);
  equal( $("head link[href='"+files.css+"']").length, 1);
});

// ----------------------------------------------------------------------------

test('Add the exact same file many time over', function()
{
  $.src(files.js).src(files.js);
  $.src(files.js);

  equal( $("head script[src='"+files.js+"']").length, 3);
});

// ----------------------------------------------------------------------------

test("All JS files loaded, callback(success == true).", function(assert)
{
  expect(1);
  var done = assert.async(),
      callback = function(success) {
        equal( success, true, "should be true!");
        done();
        // _apt.debugNull(files.js, success);
      };

  $.src(
    files.js, files.js+"?foo", files.js+"?bar",
    callback
  );
});

// ----------------------------------------------------------------------------

test("One file fail, callback(success == false).", function(assert)
{
  expect(1);
  var done = assert.async(),
      callback = function(success) {
        equal( success, false, "should be false!");
        done();
        _apt.debugNull(files.js, success);
      };
  
  $.src(
    files.js,
    '/null-never-load.js',
    files.js+"?foo",
    callback
  );
});

// ----------------------------------------------------------------------------

test('Callback with CSS files...', function(assert)
{
  var done1 = assert.async();
  var done2 = assert.async();
  var done3 = assert.async();
  expect(3);

  function onceLoaded1(success) {
    equal( success, true, "success == true, succesfully loaded" );
    done1();
  };

  function nullNeverLoad(success) {
    equal( success, false, "success == false, unsuccessul loaded" );
    done2();
  };

  function onceLoaded2(success) {
    equal( success, true, "success == true, succesfully loaded" );
    done3();
  };

  $.src(files.css, onceLoaded1);
  $.src('null-never-load.css', nullNeverLoad);
  $.src(files.css, onceLoaded2);
});
