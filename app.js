var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');


var port = process.env.PORT || 8080;        // set port

mongoose.connect(config.database);
app.set('superSecret', config.secret);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// set user admin
app.get('/setup', function (req, res) {
    //create a sample user
    var nick = new User({
        name: 'stove',
        password: 'password',
        admin: true
    });

    //save the sample user
    nick.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
            success: true
        });
    });

});

// ROUTES FOR OUR API
// =============================================================================
var apiRouter = express.Router();

apiRouter.post('/authenticate', function (req, res) {
    // find user
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                massage: 'Authentication failed. User not found.'
            })
        } else if (user) {

            //check password
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                })
            } else {
                //if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                })

                // return information include token as json
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                })
            }
        }
    })
});

apiRouter.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

});

apiRouter.get('/', function (req, res) {
    res.json({
        message: 'Hello dog! welcome to todo app api!'
    });
});

apiRouter.get('/users', function (req, res) {
   User.find({}, function (err, users) {
       res.json(users);
   })
});



app.use('/api', apiRouter);

app.listen(port);
console.log('Todo app running with port ' + port);
