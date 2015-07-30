'use strict';

var passport = require('passport');
var local = require('./strategies/local');
var User = require('../../models/user');

module.exports = function () {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, '-salt -password', function (err, user) {
            done(err, user);
        });
    });

    passport.use(local.strategy());
};