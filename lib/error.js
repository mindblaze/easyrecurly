function RecurlyError(struct) {
  this.name = 'RecurlyError';
  this.errors = [];
  if (typeof struct === 'string') {
    this.message = struct;
  } else if (struct.symbol) {
    this.errors.push(struct);
    this.message = struct.description;
  } else {
    for (var key in struct) {
      if (!struct.hasOwnProperty(key)) continue;
      var err = struct[key];
      err.message = err['#'];
      delete err['#'];
      this.errors.push(err);
    }
    if (this.errors.length === 1) this.message = this.errors[0].message;
    else this.message = this.errors.length + ' transaction errors';
  }
}

util.inherits(RecurlyError, Error);

module.exports = RecurlyError;