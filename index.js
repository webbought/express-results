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
    let statusCode;
    switch(name) {
      case 'ok' : statusCode = 200;
        break;
      case 'created' : statusCode = 201;
        break;
      case 'noContent' : statusCode = 204;
        break;
      case 'badRequest' : statusCode = 400;
        break;
      case 'unauthorized' : statusCode = 401;
        break;
      case 'forbidden' : statusCode = 403;
        break;
      case 'notFound' : statusCode = 404;
        break;
      case 'internalServerError' : statusCode = 500;
        break;
      default : statusCode = 200;
    }
    this.status(statusCode);
    
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