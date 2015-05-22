'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var FoodSchema = new Schema({
  name: String,
  price: String,
  type: Number,
  food_category_id: Number,
  image: String,
  options: Array
});

module.exports = mongoose.model('Food', FoodSchema);