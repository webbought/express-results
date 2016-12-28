'use strict';

let express = require('express');
let results = require('../');
let bodyParser = require('body-parser')

let app = express();
app.use(results());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false 
}));

app.get('/ok-string', function(req, res, next) {
  res.ok('ok-string');
})

app.post('/ok-json', function(req, res, next) {
  res.ok(req.body);
})

app.post('/created', function(req, res, next) {
  res.created(req.body);
})


module.exports = app;