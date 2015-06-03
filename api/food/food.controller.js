/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /categories             ->  index
 * POST    /categories              ->  create
 * GET     /categories/:id          ->  show
 * PUT     /categories/:id          ->  update
 * DELETE  /categories/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Q = require('q');
var Category = require('../category/category.model');
var Food = require('./food.model');

// Get list of Category
exports.getAllFoods = function(req, res) {

  var listCategories = [];
  var listFoods = [];

  var q1 = Category.find(function (err, categories) {
    if(err) { return handleError(res, err); }
    listCategories = categories;
  });
  var q2 = Food.find(function (err, foods) {
    if(err) { return handleError(res, err); }
    listFoods = foods;
  });
  return Q.spread([q1, q2], function () {
    var result = _.chain(listFoods)
     .groupBy('foodCategoryId')
     .pairs()
     .map(function (currentItem) {
      return _.object(_.zip(["foodCategoryId", "foods"], currentItem));
     })
     .value();


    for (var i = 0; i < result.length; i++) {
      var name = _.result(_.find(listFoods, function(chr) {
        return chr.foodCategoryId == result[i].foodCategoryId;
      }), 'name');
      if (!name) {
        name = 'uncategory';
      }
      for (var j = 0; j < listCategories.length; j++) {
        if (result[i].foodCategoryId == listCategories[j]._id) {
          result[i].name = listCategories[j].name;
          break
        }
      }
    }

    res.json({
       success: true,
       data: result
     });
  })
  .done();
};


// Get list of Food
exports.index = function(req, res) {
  Food.find(function (err, foods) {
    if(err) { return handleError(res, err); }
    return res.json(200, foods);
  });
};

// Get a single Food
exports.show = function(req, res) {
  Food.findById(req.params.id, function (err, food) {
    if(err) { return handleError(res, err); }
    if(!food) { return res.send(404); }
    return res.json(food);
  });
};

// Creates a new Food in the DB.
exports.create = function(req, res) {
  Food.create(req.body, function(err, food) {
    if(err) { return handleError(res, err); }
    return res.json(201, food);
  });
};

// Updates an existing Food in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Food.findById(req.params.id, function (err, food) {
    if (err) { return handleError(res, err); }
    if(!food) { return res.send(404); }
    var updated = _.merge(food, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, food);
    });
  });
};

// Deletes a Food from the DB.
exports.destroy = function(req, res) {
  Food.findById(req.params.id, function (err, food) {
    if(err) { return handleError(res, err); }
    if(!food) { return res.send(404); }
    food.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}