const express = require('express');
const router = express.Router();
const loginModule = require('../../lib/login-module');
var registerPostService = require('services/register/rest/post');

/**
 * Register page
 */
router.get('/register', function(req, res) {
  res.render('login/register');
});

/**
 * Login page - get method
 */
router.get('/login', function(req, res) {
  res.render('login/login');
});

/**
 * Login User - post method
 */
router.post('/login', loginModule.authTest, function(req, res){
  res.redirect('/upload');
});

/**
 * Register User - post method
 */
router.post('/register', function(req, res) {
  registerPostService(req, res);
});

/**
 * Logout - get method
 */
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are successfully logged out');
  res.redirect('/users/login');
});

/**
 * Exports
 */
module.exports = router;
