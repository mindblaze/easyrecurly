
exports.addParams = function(route, keys) {
  var newRoute = route.slice();
  newRoute[0] = newRoute[0].replace(/(:[^\/]+)/g, function(match) {
    return keys[match.substr(1)];
  });
  return newRoute;
};

exports.addQueryParams = function(route, params) {
  var newRoute = route.slice();
  var _params = [];
  if (params) {
    for (var prop in params) {
      _params.push(prop + '=' + encodeURIComponent(params[prop]));
    }
  }
  if(_params.length > 0) return [newRoute[0] + '?' + _params.join('&'), newRoute[1]];
  else return newRoute;
};