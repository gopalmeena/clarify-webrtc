'use strict';

require('../models/user');
var User = require('mongoose').model('User');

exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var repeatPassword = req.body.repeatPassword;

  User.find({username: username}, function(err, user){
    if (!user) {
      req.flash('error', 'User with same username already exists.');
      res.render('/sign_up');
    } else {
      if (password !== repeatPassword) {
        req.flash('error', 'Passwords don\'t match.');
        res.render('/sign_up');
      } else {
        User.create({
          username: username,
          password: password
        }, function(){
          req.flash('success', 'You\'ve successfully signed up.');
          res.redirect('/sign_in');
        });
      }
    }
  });
};