'use strict';

var mongoose = require('mongoose');
var Call = require('../models/call');
var Record = require('../models/user');
var User = require('../models/record');

exports.list = function (req, res) {
  Call.find({$or: [{from: req.user._id}, {to: req.user._id}]})
    .populate('from username')
    .populate('to username')
    .populate('records url')
    .populate('records clarify')
    .exec(function (err, calls) {
      //res.render('history', {calls: calls, user: req.user});
      res.status(200).json({calls: calls, user: req.user});
    });
};

exports.create = function (req, res) {
  User.findById(req.body.to, function (err, to) {
    Call.create({
      from: req.user,
      to: to,
      date: Date.now()
    }, function (call) {
      res.status(201).json(call);
    });
  });
};