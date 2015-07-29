'use strict';

var express = require('express');
var router = express.Router();
var contacts = require('../controllers/contacts.controller');
var auth = require('../middleware/auth');

router.get('/', auth.ensureAuthenticatedAjax, contacts.list);
router.get('/:id', auth.ensureAuthenticatedAjax, contacts.one);
router.get('/:id/call', auth.ensureAuthenticatedAjax, contacts.call);

module.exports = router;
