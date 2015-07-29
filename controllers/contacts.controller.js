'use strict';

require('../models/user');
var User = require('mongoose').model('User');

exports.index = function(req, res){
  res.render('index', {user: req.user});
};

exports.list = function(req, res) {
  User.find({_id: {$ne: req.user._id}}, function(err, users){
    res.status(200).json(users);
  });
};

exports.one = function(req, res) {
  User.findById(req.params.id)
    .select({_id: true, username: true})
    .exec(function(err, user){
    res.status(200).json(user);
  });
};

exports.call = function(req, res) {
  var from = req.user._id;
  var io = req.app.get('io');
  io.sockets.in(req.params.id).emit('call', {id: from});
  res.jsonp({contact: req.params.id});
};