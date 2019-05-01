$.src("../../src/apt-event.js");

QUnit.module('apt-event',
{
  setup: function()
  {
    _apt = {
      elements: $(FIXTURE_UL),
      buttons: $(FIXTURE_ID + ' button'),
      counter: 0,
      increaseCounter: function(){ _apt.counter++ }
    }
  },
  teardown: function()
  {
    _apt.buttons.off('click', _apt.increaseCounter);
  }
});

test('on() method is like addEventListener()', function()
{
  _apt.buttons.on('click', _apt.increaseCounter);
  
  equal(_apt.counter, 0);
  _apt.buttons[0].click();
  equal(_apt.counter, 1);
});

test('off() method is like removeEventListener()', function ()
{
  _apt.buttons.on('click', _apt.increaseCounter);

  _apt.buttons[0].click();
  equal(_apt.counter, 1);

  _apt.buttons.off('click', _apt.increaseCounter);

  _apt.buttons[0].click();
  equal(_apt.counter, 1, "Should still be just one");
});

test('on() and off() should be chainable.', function()
{
  var noop = function(){};
  ok(
    _apt.elements.each(noop)
      .on('click', noop)
      .off('click', noop)
    === _apt.elements
  );
});



// // jQuery
// function KeyLogger(target){
//   this.target = target;
//   this.log = [];
 
//   var that = this;
//   this.target.off("click").on("click", function(event) {
//     that.log.push( event.keyCode );
//   });
// }

// QUnit.test("keylogger api behavior", function( assert ) {
//   var $doc = $(document),
//       keys = new KeyLogger($doc);
 
//    assert.deepEqual(keys.log, [], "should be an empty array");


//   // Trigger the key event

//   // doc.trigger( $.Event( "keydown", { keyCode: 9 } ) );
//   // var onKeydownFunc = function(e){
//   //   console.log('onKeydownFunc');
//   // };
//   // $doc.on('click', onKeydownFunc);

//   // $doc.on('keydown', onKeydownFunc);

  
//   $doc.click( { keyCode: 9 } );

//   // DOC = $doc;
 
//   // Verify expected behavior
//   assert.deepEqual(keys.log, [9], "Correct[key] was logged.");
// });
