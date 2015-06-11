'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TaxSchema = new Schema({
  name: String,
  amount: String,
  percent: String
});

module.exports = mongoose.model('Tax', TaxSchema);