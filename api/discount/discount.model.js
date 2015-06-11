'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var DiscountSchema = new Schema({
  name: String,
  amount: String,
  percent: String
});

module.exports = mongoose.model('Discount', DiscountSchema);