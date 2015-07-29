'use strict';

require('../models/call');
var mongoose = require('mongoose');
var Call = mongoose.model('Call');
var User = mongoose.model('User');

exports.list = function(req, res) {
  Call.find({user: req.user}, function(err, calls){
    res.render('history', {calls: calls, user: req.user});
  });
};

exports.create = function(req, res){
  User.find({_id: req.body.to}, function(err, to){
    Call.create({
      from: req.user,
      to: to,
      date: Date.now()
    }, function(call) {
      res.status(201).json(call);
    });
  });
};