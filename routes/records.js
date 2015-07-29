'use strict';

var express = require('express');
var router = express.Router();
var records = require('../controllers/records.controller');
var auth = require('../middleware/auth');

router.post('/', auth.ensureAuthenticatedAjax, records.create);
router.put('/:id', auth.ensureAuthenticatedAjax, records.update);
router.put('/:id/finish', auth.ensureAuthenticatedAjax, records.finish);

module.exports = router;

