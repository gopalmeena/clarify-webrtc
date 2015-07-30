'use strict';

var mongoose = require('mongoose');

var Call = new mongoose.Schema({
  date: Date,
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Call', Call);
