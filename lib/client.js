var httpStatusCodes = require('http').STATUS_CODES,
    request = require('request'),
    /*xml2js = require('xml2js'),
    xmlParser = new xml2js.Parser({explicitArray: false}),*/
    xmlParser = require('./parser'),
    extend = require('extend');

module.exports = function(config) {
  
  this.request = function(route, data, options, cb) {
    if (typeof data == 'function') {
      cb = data;
      data = null;
      options = {};
    } else if (typeof options == 'function') {
      cb = options;
      options = {};
    }
    
    var self = this;
        url = route[0],
        method = route[1],
        defaultOptions = {
      url: config.subdomain + url,
      method: method,
      headers: {
        Accept: 'application/xml'
        //'Content-Type': 'application/xml; charset=utf-8'
      },
      auth: {
        user: config.apiKey,
        pass: '',
        sendImmediately: true
      },
      body: data
    };
    
    options = extend(true, defaultOptions, options);
    
    //console.log('Options: ', options);
    
    request(options, function(e, res, body) {
      if (e) return cb(e);
      //console.log('isXML: ', res.headers);
      if (options.headers.Accept == 'application/xml') {
        xmlParser.parseXML(body, function(e, parsedXml) {
          if (config.debug) self._debug(res, parsedXml);
          var apiErrors = self._parseError(res, parsedXml);
          if (apiErrors.length) return cb(apiErrors);
          cb(null, self._wrapResponse(res, parsedXml));
        });
      } else {
        if (config.debug) self._debug(res, body);
        var apiErrors = self._parseError(res, body);
        if (apiErrors.length) return cb(apiErrors);
        cb(null, self._wrapResponse(res, body));
      }
    });
  };
  
  
  this._wrapResponse = function(res, body) {
    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: body
    };
  };
  
  this._parseError = function(res, body) {
    var errors = [],
        newError = null;
    console.log('BODY: ', body);
    if (body && body.errors && body.errors.error) {
      if (body.errors.error instanceof Array) {
        for (var i = 0; i < body.errors.length; i++) {
          var currentError = body.errors[i];
          newError = new Error(currentError.$.field + ' ' + currentError._);
          newError.body = currentError;
          newError.code = currentError.$.symbol;
          errors.push(newError);
        }
      } else {
        var currentError = body.errors.error;
        newError = new Error(currentError.$.field + ' ' + currentError._);
        newError.body = currentError;
        newError.code = currentError.$.symbol;
        errors.push(newError);
      }
    } else if (res.statusCode >= 400 && res.statusCode <= 499) { // Client Request Error
      if (body) newError = new Error('Client Request Error: ' + JSON.stringify(body));
      else newError = new Error('Client Request Error: ' + httpStatusCodes[res.statusCode]);
      newError.body = body;
      newError.code = res.statusCode;
      errors.push(newError);
    } else if (res.statusCode >= 500 && res.statusCode <= 599) { // Server Error
      if (body) newError = new Error('Server Error: ' + JSON.stringify(body));
      else newError = new Error('Server Error: ' + httpStatusCodes[res.statusCode]);
      newError.body = body;
      newError.code = res.statusCode;
      errors.push(newError);
    }
    return errors;
  };
  
  this._debug = function(res, body) { console.log('DEBUG: ', res.statusCode, ' \n', body); };
};