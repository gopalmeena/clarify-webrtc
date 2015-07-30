'use strict';

require('../models/call');
require('../models/user');
require('../models/record');
var mongoose = require('mongoose');
var Call = mongoose.model('Call');
var Record = mongoose.model('Record');
var User = mongoose.model('User');

exports.list = function(req, res) {
  Call.find({$or: [{from: req.user._id}, {to: req.user._id}]})
    .populate('from', 'username')
    .populate('to', 'username')
    .populate('records', 'url')
    .exec(function(err, calls){
      res.render('history', {calls: calls, user: req.user});
  });
};

exports.create = function(req, res){
  User.findById(req.body.to, function(err, to){
    Call.create({
      from: req.user,
      to: to,
      date: Date.now()
    }, function(call) {
      res.status(201).json(call);
    });
  });
};