var xml2js = require('xml2js');

function parseTypes(input) {
  var result = {},
      mode = 'normal';

  try {
    for (var key in input) {
      //key = keys[i];
      if (!input.hasOwnProperty(key)) continue;
      var item = input[key];

      if (mode === 'array') {
        mode = 'normal';
        
        if (Array.isArray(item)) {
          result = [];
          for (var j = 0; j < item.length; j++) {
            if (typeof item[j] == 'string') result.push(item[j]);
            else result.push(parseTypes(item[j]));
          }
        } else result = [parseTypes(item)];

      } else if (typeof item === 'object') {
        if (item['#'] && item.type && (item.type === 'datetime')) result[key] = new Date(item['#']);
        else if (item['#'] && item.type && (item.type === 'integer')) result[key] = parseInt(item['#'], 10);
        else if (item['#'] && item.type && (item.type === 'boolean')) result[key] = (item['#'] === 'true'? true : false);
        else if (item.nil && (item.nil === 'nil')) result[key] = '';
        else result[key] = parseTypes(item);
      } else if ((key === 'type') && (item === 'array')) mode = 'array';
      else result[key] = item;
    }
  } catch (e) {
    result = input;
  }
  return result;
}

function RecurlyParser() {
  this.parser = new xml2js.Parser({
    mergeAttrs: true,
    attrkey: '#',
    charkey: '#',
    explicitArray: false,
    explicitRoot: false,
  });
}

RecurlyParser.prototype.parseXML = function(input, cb) {
  this.parser.parseString(input, function (e, json) {
    if (e) return cb(e);
    cb(null, parseTypes(json));
  });
};

module.exports = RecurlyParser;