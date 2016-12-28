'use strict';

let assert = require('assert');
let request = require('supertest');

let app = require('./server');

let _mock = {a : 1, b : 2};

describe('Express results Test', function() {
  describe('method ok', function() {
    it('response string', function(done) {
      request(app)
        .get('/ok-string')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            if (res.text == 'ok-string') {
              done();
            } else {
              done(new Error());
            }
          }
        });
    });

    it('response json', function(done) {
      request(app)
        .post('/ok-json')
        .send(_mock)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            try {
              assert.deepEqual(res.body, _mock);
              done();
            } catch(err) {
              done(err);
            }
          }
        });
    })
  });

  describe('method created', function() {
    it('response 201', function(done) {
      request(app)
        .post('/created')
        .send(_mock)
        .expect(201)
        .end(function(err, res) {
          if (err) {
            done(err);
          } else {
            try {
              assert.deepEqual(res.body, _mock);
              done();
            } catch(err) {
              done(err);
            }
          }
        });
    })
  })
})