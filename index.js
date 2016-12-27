'use strict';

function Results() {
  return function(req, res, next) {
    [
      'ok',
      'created',
      'noContent',
      'movedPermanently',
      'moveTemporarily',
      'badRequest',
      'forbidden',
      'unauthorized',
      'notFound',
      'internalServerError',
    ].forEach(function(name) {
      Object.defineProperty(res, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value : _result(name)
      });
    })
    next();
  }
}

function _result(name) {
  return function(content) {
    switch(name) {
      case 'ok' : this.status(200);
        break;
      case 'created' : this.status(201);
        break;
      case 'noContent' :this.status(204);
        break;
      case 'badRequest' : this.status(400);
        break;
      case 'unauthorized' : this.status(401);
        break;
      case 'forbidden' : this.status(403);
        break;
      case 'notFound' : this.status(404);
        break;
      case 'internalServerError' : this.status(500);
        break;
      default : this.status(200);
    }
    if (name == 'movedPermanently') {
      this.redirect(301, content);
    } else if (name == 'moveTemporarily') {
      this.redirect(content);
    } else {
      this.send(_body.call(this, content));
    }
  }
}


function _body(content) {
  if (content == null && this.statusCode == 204) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
    this.removeHeader('Transfer-Encoding');
  }
  return content;
}

module.exports = Results;