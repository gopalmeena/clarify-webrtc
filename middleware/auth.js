'use strict';

exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/sign_in');
};

exports.ensureAuthenticatedAjax = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json('User is not authorized.');
};

