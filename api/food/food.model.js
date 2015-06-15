'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var FoodSchema = new Schema({
  name: String,
  price: String,
  type: Number,
  foodCategoryId: String,
  image: String,
  imageThumbnail: String,
  description: String,
  status: Boolean,
  options: [
    {
      name: String,
      price: String
    }
  ],
  discounts: [
    {
      name: String,
      amount: String,
      percent: String
    }
  ]
});

module.exports = mongoose.model('Food', FoodSchema);