'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../../../models/user');

exports.strategy = function () {
  return new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      User.findOne({
        username: username
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Unknown user or invalid password'
          });
        }
        if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'Unknown user or invalid password'
          });
        }

        return done(null, user);
      });
    }
  );
};