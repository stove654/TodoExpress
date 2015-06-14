'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TableSchema = new Schema({
  name: String,
  tables: [
      {
          name: String
      }
  ]
});

module.exports = mongoose.model('Table', TableSchema);