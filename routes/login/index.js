const express = require('express');
const router = express.Router();
const loginModule = require('../../lib/login-module');

/**
 * Home page
 */
router.get('/', loginModule.authenticate, function(req, res) {
  res.render('login/index');
});

/**
 * Exports
 */
module.exports = router;
