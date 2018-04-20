var auth = require('./auth.js');
var User = require('./models/userJson.js');

var init = function (app) {
    /**
     * Express requires
     */
    const express = require('express');
    const expbs = require('express-handlebars');
    const expressValidator = require('express-validator');
    const session = require('express-session');

    /**
     * Path require
     */
     const path = require('path');

    /** 
     * Parsers require
     */
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
 
    /** 
     * Flash require (for messages)
     */
    const flash = require('connect-flash');
 
    /** 
     * Passport requires
     */
    const passport = require('passport');
    const localStrategy = require('passport-local').Strategy;

    /** 
     * BodyParser Middleware
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser('secret'));

    /** 
     * Express Session
     */
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));

    /** 
     * Passport Start
     */
    app.use(passport.initialize());
    app.use(passport.session());
 
    /** 
     * Express Validator
     */
    app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
        }
        return {
        param : formParam,
        msg   : msg,
        value : value
        };
    }
    }));

    /** 
     * Connect Flash
     */
    app.use(flash());

    /** 
     * Messages
     */
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
    next();
    });

    app.use(express.static(path.resolve('./public')));
}

exports = module.exports = function (app) {
   init(app);
};

/** 
* Export functions
*/
exports.authenticate = auth.authenticate;
exports.authTest = auth.test;
exports.User = User;
exports.checkCredentials = auth.checkCredentials;
