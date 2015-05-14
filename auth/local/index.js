'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, {
        success: false,
        message: error.message
    });
    if (!user) return res.json(404,
        {
          success: false,
          message: 'Authentication failed. Wrong password.'
        }
    );

    if (user.role != 'admin') return res.json(404,
      {
          success: false,
          message: 'Authentication failed. Wrong role.'
      }
    );
    var token = auth.signToken(user._id, user.role);

    var resUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
        provider: user.provider,
        role: user.role
    };
    res.json(
        {
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: resUser
        }
    );
  })(req, res, next)
});

module.exports = router;