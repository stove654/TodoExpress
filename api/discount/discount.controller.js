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
var Discount = require('./discount.model');


// Get list of Food
exports.index = function(req, res) {
  Discount.find(function (err, discounts) {
    if(err) { return handleError(res, err); }
    return res.json(200, discounts);
  });
};

// Get a single Food
exports.show = function(req, res) {
  Discount.findById(req.params.id, function (err, discount) {
    if(err) { return handleError(res, err); }
    if(!discount) { return res.send(404); }
    return res.json(tax);
  });
};

// Creates a new Food in the DB.
exports.create = function(req, res) {
  Discount.create(req.body, function(err, discount) {
    if(err) { return handleError(res, err); }
    return res.json(201, discount);
  });
};

// Updates an existing Food in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Discount.findById(req.params.id, function (err, discount) {
    if (err) { return handleError(res, err); }
    if(!discount) { return res.send(404); }
    var updated = _.merge(discount, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, discount);
    });
  });
};

// Deletes a Food from the DB.
exports.destroy = function(req, res) {
  Discount.findById(req.params.id, function (err, discount) {
    if(err) { return handleError(res, err); }
    if(!tax) { return res.send(404); }
    discount.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}