'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var passport = require('passport');
var users = require('../controllers/users.controller');
var contacts = require('../controllers/contacts.controller');


router.get('/sign_in', function(req, res){
  res.render('sign_in');
});

router.get('/sign_in', function(req, res){
  res.render('sign_in', { user: req.user });
});

router.get('/sign_out', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/sign_in', passport.authenticate('local', { failureRedirect: '/sign_in'}), function(req, res){
  res.redirect('/');
});

router.get('/', auth.ensureAuthenticated, function(req, res){
  contacts.index(req, res);
});

router.get('/sign_up', function(req, res){
  res.render('sign_up');
});

router.post('/sign_up', function(req, res){
  users.signup(req, res);
});

router.get('/authorize', auth.ensureAuthenticatedAjax, function(req, res){
  res.status(200).json(req.user);
});

module.exports = router;
