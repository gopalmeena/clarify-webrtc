'use strict';

var mongoose = require('mongoose');
var Call = require('../models/call');
var Record = require('../models/user');
var User = require('../models/record');
var fs = require('fs');
var _ = require('lodash');


exports.list = function (req, res) {
  Call.find({$or: [{from: req.user._id}, {to: req.user._id}]})
    .populate('from username')
    .populate('to username')
    .populate('records url')
    .populate('records clarify')
    .exec(function (err, calls) {
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

exports.delete = function(req, res){
  Call.findById(req.params.id)
      .populate('records')
      .exec(function(err, call){
        if (err){
          res.json(null);
        }

        _.each(call.records, function(rec){
          var path = './public/uploads/' + rec._id + '.ogg';
          fs.exists(path, function(exists){
            if (exists){
              fs.unlink(path);
            }
          });
          rec.remove();
        });

        call.remove(function(){
          res.status(200).json(call);
        });
      });
};