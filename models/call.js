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
  },
  records: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Record'
  }]
});

Call.virtual('name').get(function(){
   return this.from.username + ' - ' + this.to.username;
});

module.exports = mongoose.model('Call', Call);
