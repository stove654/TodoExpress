'use strict';

var express = require('express');
var controller = require('./food.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/all-foods',auth.hasRole('admin'), controller.getAllFoods);
router.get('/',auth.hasRole('admin'), controller.index);
router.get('/:id',auth.hasRole('admin'), controller.show);
router.post('/',auth.hasRole('admin'), controller.create);
router.put('/:id',auth.hasRole('admin'), controller.update);
router.patch('/:id',auth.hasRole('admin'), controller.update);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;
