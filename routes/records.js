'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records.controller');
var auth = require('../middleware/auth');

router.post('/', auth.ensureAuthenticatedAjax, records.create);
router.put('/:id', auth.ensureAuthenticatedAjax, records.update);
router.put('/:id/finish', auth.ensureAuthenticatedAjax, records.finish);

router.get('/search', auth.ensureAuthenticated, function(req, res){
  res.render('search', {user: req.user});
});

router.get('/notify', records.notify);

router.post('/search', auth.ensureAuthenticated, function(req, res){
  records.search(req, res);
});

module.exports = router;

