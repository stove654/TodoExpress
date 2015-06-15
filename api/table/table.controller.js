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
var Table = require('./table.model.js');


// Get list of Food
exports.index = function(req, res) {
  Table.find(function (err, tables) {
    if(err) { return handleError(res, err); }
    return res.json(200, tables);
  });
};

// Get a single Food
exports.show = function(req, res) {
  Table.findById(req.params.id, function (err, table) {
    if(err) { return handleError(res, err); }
    if(!table) { return res.send(404); }
    return res.json(table);
  });
};

// Creates a new Food in the DB.
exports.create = function(req, res) {
  Table.create(req.body, function(err, table) {
    if(err) { return handleError(res, err); }
    return res.json(201, table);
  });
};

// Updates an existing Food in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Table.findById(req.params.id, function (err, table) {
    if (err) { return handleError(res, err); }
    if(!table) { return res.send(404); }
    var updated = _.merge(table, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, table);
    });
  });
};

// Deletes a Food from the DB.
exports.destroy = function(req, res) {
  Table.findById(req.params.id, function (err, table) {
    if(err) { return handleError(res, err); }
    if(!table) { return res.send(404); }
    tax.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}