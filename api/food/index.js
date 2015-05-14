'use strict';

var express = require('express');
var controller = require('./food.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/all-foods',auth.hasRole('admin'), controller.getAllFoods);


module.exports = router;
