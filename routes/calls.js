'use strict';

var express = require('express');
var router = express.Router();
var calls = require('../controllers/calls.controller');
var auth = require('../middleware/auth');

router.get('/', auth.ensureAuthenticatedAjax, calls.list);
router.post('/', auth.ensureAuthenticatedAjax, calls.create);

module.exports = router;

