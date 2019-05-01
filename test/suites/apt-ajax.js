$.src("../../src/apt-ajax.js");

// ----------------------------------------------------------------------------

QUnit.module('apt-ajax', {
   setup: function(){
    this.server = sinon.fakeServer.create();
   },
   teardown: function(){
    this.server.restore();
    delete this.server;
   }
});

// ----------------------------------------------------------------------------

asyncTest('GET - default', function() {
  expect(6);

  this.server.respondWith("GET", "/mocked_url", [200, {}, 'foo bar']);

  var ajax_callback = function(data, success, xhr) {
    equal(data, "foo bar");
    equal(success, true);
    equal(xhr.status, 200);
    equal(xhr.method, "GET", "Default method");
    start();
  };

  $.ajax('/mocked_url', ajax_callback);

  this.server.respond();

  ok(this.server.requests.length == 1, "One request was executed");
  ok(this.server.responses.length == 1, "One response received");
});

// ----------------------------------------------------------------------------

asyncTest('GET - with no callback', function() {
  expect(3);

  this.server.respondWith("GET", "/mocked_url", [200, {}, 'foo bar']);

  var xhr = $.ajax('/mocked_url');

  this.server.respond();

  deepEqual( xhr, this.server.requests[0] );

  ok(this.server.requests.length == 1, "One request was executed");
  ok(this.server.responses.length == 1, "One response received");

  start();
});

// ----------------------------------------------------------------------------

asyncTest('GET - Error', function() {
  expect(3);

  var ajax_callback = function(data, success, xhr) {
    equal(data, "");
    equal(success, false);
    equal(xhr.status, 404);

    // try again!
    // setTimeout("$.ajax(u,id,t)",10)
    // console.log(r);

    start();
  };

  $.ajax('/mocked_url', ajax_callback);

  this.server.respond();
});

// ----------------------------------------------------------------------------

asyncTest('POST - Simple', function() {
  expect(7);

  var json_str = JSON.stringify('{foo:"bar"}');

  this.server.respondWith("POST", "/mocked_url", [200, {}, "posted"]);

  var ajax_callback = function(data, success, xhr) {
    equal(data, "posted");
    equal(success, true);

    equal(xhr.method, "POST");
    equal(xhr.requestBody, json_str);
    equal(xhr.requestHeaders['foo'], 'bar');

    start();
  };

  var xhr = $.ajax('/mocked_url', ajax_callback, 'post');
  xhr.setRequestHeader("Content-type","application/json");
  xhr.setRequestHeader("foo","bar");
  xhr.send( json_str );

  ok(this.server.requests.length == 1, "One request was executed");
  ok(this.server.responses.length == 1, "One response received");

  this.server.respond();
});

// ----------------------------------------------------------------------------

asyncTest('POST - no callback', function() {
  expect( 2 );

  this.server.respondWith("POST", "/mocked_url", [200, {}, ""]);

  var xhr = $.ajax('/mocked_url', null, 'post');
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send("foo=bar&buz=bar");

  ok(this.server.requests.length == 1, "One request was executed");
  ok(this.server.responses.length == 1, "One response received");

  this.server.respond();
  start();
});

// ----------------------------------------------------------------------------

// test('TODO JSONP??', function() {});

// asyncTest('GET JSON', function() {
//   expect( 3 );

//   var xhr = $.ajax('https://api.github.com/users/frqnck', function(data, success, xhr){

//       data = JSON.parse(data);
//       equal(data.name, 'Franck Cassedanne');

//       equal(success, true);

//       equal(xhr.status, 200);
//     // equal(xhr.requestBody, null);

//     start();
//   }, 'get');

//   // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//   // xhr.send("foo=bar&buz=bar");

// xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xhr.send( JSON.stringify( { sort: "created", direction: "asc" } ) );

// console.log(xhr);
// });

