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
var Tax = require('./tax.model');


// Get list of Food
exports.index = function(req, res) {
  Tax.find(function (err, taxes) {
    if(err) { return handleError(res, err); }
    return res.json(200, taxes);
  });
};

// Get a single Food
exports.show = function(req, res) {
  Tax.findById(req.params.id, function (err, tax) {
    if(err) { return handleError(res, err); }
    if(!tax) { return res.send(404); }
    return res.json(tax);
  });
};

// Creates a new Food in the DB.
exports.create = function(req, res) {
  Tax.create(req.body, function(err, tax) {
    if(err) { return handleError(res, err); }
    return res.json(201, tax);
  });
};

// Updates an existing Food in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tax.findById(req.params.id, function (err, tax) {
    if (err) { return handleError(res, err); }
    if(!tax) { return res.send(404); }
    var updated = _.merge(tax, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tax);
    });
  });
};

// Deletes a Food from the DB.
exports.destroy = function(req, res) {
  Tax.findById(req.params.id, function (err, tax) {
    if(err) { return handleError(res, err); }
    if(!tax) { return res.send(404); }
    tax.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}