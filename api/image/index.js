'use strict';

var express = require('express');
var controller = require('./image.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.hasRole('admin'), controller.index);
router.get('/:id',auth.hasRole('admin'), controller.show);
router.post('/',auth.hasRole('admin'), controller.create);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;
