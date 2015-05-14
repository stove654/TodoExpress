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
var Category = require('../category/category.model');

// Get list of Category
exports.getAllFoods = function(req, res) {
  Category.find(function (err, categories) {
    if(err) { return handleError(res, err); }
    return res.json(200, categories);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}