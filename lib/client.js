var httpStatusCodes = require('http').STATUS_CODES,
    request = require('request'),
    /*xml2js = require('xml2js'),
    xmlParser = new xml2js.Parser({explicitArray: false}),*/
    xmlParser = require('./parser'),
    xmlParser = new xmlParser(),
    RecurlyError = require('./error'),
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
          if (e) return cb(e);
          if (config.debug) self._debug(res, parsedXml);
          var apiError = self._parseError(res, parsedXml);
          if (apiError) return cb(apiError);
          cb(null, self._wrapResponse(res, parsedXml));
        });
      } else {
        if (config.debug) self._debug(res, body);
        var apiError = self._parseError(res, body);
        if (apiError.length) return cb(apiError);
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
    if (body && body.errors) {
      newError = new RecurlyError(body);
      if (newError.message || newError.errors.length) return newError;
    } else if (res.statusCode >= 400 && res.statusCode <= 499) { // Client Request Error
      return new Error('Client Request Error: status code ' + res.statusCode);
    } else if (res.statusCode >= 500 && res.statusCode <= 599) { // Server Error
      return new Error('Recurly Server Error: status code ' + res.statusCode);
    }
    return null;
  };
  
  this._debug = function(res, body) { console.log('DEBUG: ', res.statusCode, ' \n', body); };
};