'use strict';

var mongoose = require('mongoose');
var dateFormat = require('dateformat');

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
   return this.from.username + ' - ' + this.to.username
     + ' on ' + dateFormat(this.date, 'yyyy/mm/dd')
     + ' at ' + dateFormat(this.date, 'h:MM TT');
});

Call.set('toJSON', { virtuals: true});
module.exports = mongoose.model('Call', Call);
