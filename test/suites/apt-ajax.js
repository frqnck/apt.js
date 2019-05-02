// apt-ajax.js
// (c) 2009-2019 Franck Cassedanne (frqnck)
// MIT license.

// Source apt-ajax.js
$.src("../../src/apt-ajax.js");

// Source sinon.js
$.src("https://cdnjs.cloudflare.com/ajax/libs/sinon.js/7.3.2/sinon.min.js");

// ----------------------------------------------------------------------------
var XMLHttpRequest;

(function() {
  'use strict';

  QUnit.module('apt-ajax', {
    beforeEach: function(){
      this.server = sinon.fakeServer.create();
    },
    afterEach: function(){
      this.server.restore();
      delete this.server;
    }
  });

  // ----------------------------------------------------------------------------

  QUnit.test('GET request method is default', function(assert) {
    var done = assert.async();
    assert.expect(6);

    this.server.respondWith("GET", "/mocked_url", [200, {}, 'foo bar']);

    var ajax_callback = function(data, success, xhr) {
      assert.equal(data, "foo bar");
      assert.equal(success, true);
      assert.equal(xhr.status, 200);
      assert.equal(xhr.method, "GET", "Default method");
      done();
    };

    $.ajax('/mocked_url', ajax_callback);

    this.server.respond();

    assert.ok(this.server.requests.length == 1, "One request was executed");
    assert.ok(this.server.responses.length == 1, "One response received");
  });

  // ----------------------------------------------------------------------------

  QUnit.test('GET request with no callback', function(assert) {
    // var done = assert.async();

    assert.expect(3);
    this.server.respondWith("GET", "/mocked_url", [200, {}, 'foo bar']);

    var xhr = $.ajax('/mocked_url');

    this.server.respond();

    assert.deepEqual( xhr, this.server.requests[0] );

    assert.ok(this.server.requests.length == 1, "One request was executed");
    assert.ok(this.server.responses.length == 1, "One response received");
    // done();
  });

  // ----------------------------------------------------------------------------

  QUnit.test('GET - Error', function(assert) {
    var done = assert.async();
    assert.expect(3);

    var ajax_callback = function(data, success, xhr) {
      assert.equal(data, "");
      assert.equal(success, false);
      assert.equal(xhr.status, 404);

      // try again!
      // setTimeout("$.ajax(u,id,t)",10)
      // console.log(r);

      done();
    };

    $.ajax('/mocked_url', ajax_callback);

    this.server.respond();
  });

  // ----------------------------------------------------------------------------

  QUnit.test('POST request', function(assert) {
    var done = assert.async();
    assert.expect(7);

    var json_str = JSON.stringify('{foo:"bar"}');

    this.server.respondWith("POST", "/mocked_url", [200, {}, "posted"]);

    var ajax_callback = function(data, success, xhr) {
      assert.equal(data, "posted");
      assert.equal(success, true);

      assert.equal(xhr.method, "POST");
      assert.equal(xhr.requestBody, json_str);
      assert.equal(xhr.requestHeaders['foo'], 'bar');

      done();
    };

    var xhr = $.ajax('/mocked_url', ajax_callback, 'post');
    xhr.setRequestHeader("Content-type","application/json");
    xhr.setRequestHeader("foo","bar");
    xhr.send( json_str );

    assert.ok(this.server.requests.length == 1, "One request was executed");
    assert.ok(this.server.responses.length == 1, "One response received");

    this.server.respond();
  });

  // ----------------------------------------------------------------------------

  QUnit.test('POST request with no callback', function(assert) {
    var done = assert.async();
    assert.expect( 2 );

    this.server.respondWith("POST", "/mocked_url", [200, {}, ""]);

    var xhr = $.ajax('/mocked_url', null, 'post');
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("foo=bar&buz=bar");

    assert.ok(this.server.requests.length == 1, "One request was executed");
    assert.ok(this.server.responses.length == 1, "One response received");

    this.server.respond();
    done();
  });

  // ----------------------------------------------------------------------------

  QUnit.test('Real life GET request to Github + setRequestHeader', function(assert) {

    this.server.restore();
    var done = assert.async();
    assert.expect(5);

    var ajax_callback = function(data, success, xhr) {
      var data =  JSON.parse(data);
      assert.equal(data.name, 'Franck Cassedanne');
      assert.equal(success, true);
      assert.equal(xhr.status, 200);
      assert.equal(xhr.requestBody, null);
      assert.equal(JSON.stringify(xhr.parse()), JSON.stringify(data));

      done();
    };

    var xhr = $.ajax('https://api.github.com/users/frqnck', ajax_callback, 'GET');
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.send();
  });

}());