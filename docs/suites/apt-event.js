// Apt.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

// Source apt-event.js
if(from_src) {
  $.src("../../src/apt-event.js");
}

QUnit.module('apt-event',
{
  beforeEach: function(assert) {
    var counter = {
      elements: $('#apt-fixtures UL > *'),
      button: $('#apt-fixtures button'),
      log: 0,
      increase: function() {
        counter.log++;
      }
    };

    this.counter = counter;
  },
  afterEach: function(assert)
  {
    this.counter.button.off('click', this.counter.increase);
  }
});

QUnit.test('on() method is like addEventListener()', function(assert) {
  this.counter.button.on('click', this.counter.increase);
  
  assert.equal(this.counter.log, 0);
  this.counter.button[0].click();
  this.counter.button[0].click();
  assert.equal(this.counter.log, 2);
});

QUnit.test('off() method is like removeEventListener()', function(assert) {
  this.counter.button.on('click', this.counter.increase);

  this.counter.button[0].click();
  assert.equal(this.counter.log, 1);

  this.counter.button.off('click', this.counter.increase);

  this.counter.button[0].click();
  assert.equal(this.counter.log, 1, "Should still be just one");
});

QUnit.test('on() and off() should be chainable', function(assert) {
  var noop = function() {};
  assert.deepEqual(
    $("#apt-fixtures UL > *").each(noop).on('click', noop).off('hover', noop),
    $("#apt-fixtures UL > *")
  );
});

QUnit.test("Keyboard events loggin", function(assert) {
  function KeyLogger(target) {
    this.target = target;
    this.logs = [];
   
    var self = this;
    this.target.off("keydup").on("keydown", function(event){
      self.logs.push(event.keyCode);
    });
  }

  var $doc = $(document),
      keys = new KeyLogger($doc);
 
  assert.deepEqual(keys.logs, [], "should be an empty array");

  var event = document.createEvent('Event');
  event.initEvent('keydown', true, true);
  event.keyCode = 9;
  document.dispatchEvent(event);

  event.keyCode = 65;
  document.dispatchEvent(event);

  assert.deepEqual(keys.logs, [9,65], "The correct keys were logged.");
});
