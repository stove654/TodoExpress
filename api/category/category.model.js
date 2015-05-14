'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var CategorySchema = new Schema({
  name: String,
  description: String,
  type: Number,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Category', CategorySchema);