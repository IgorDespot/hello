require('app-module-path').addPath( __dirname );
var config = require('./config.json');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expbs = require('express-handlebars');
const fs = require('fs');

function myAuthorizer(username, password) {
  return username == config['USERNAME'] && password == config['PASSWORD']
}

var express = require('express');
const basicAuth = require('express-basic-auth')
var app = express();

// app.use(basicAuth({
//     authorizer: myAuthorizer,
//     unauthorizedResponse:
// "The request has not been applied because it lacks valid authentication credentials for the target resource."
// }))

const cors = require('cors');
app.use(cors());

app.set('views/login', path.join(__dirname, './views/login'));
app.engine('handlebars', expbs({
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, './views/login/layouts')
}));
app.set('view engine', 'handlebars');

var logger = require('morgan');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(logger('common', {stream: accessLogStream}));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
const minute = 60 * 1000;
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  duration: 30 * minute,
  activeDuration: 5 * minute,
}));

const passport = require('passport');
let FIWAREStrategy = require('passport-fiware-oauth').OAuth2Strategy;
let { clientID, clientSecret, callbackURL } = config.authentication;
passport.use(
  new FIWAREStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL,
    passReqToCallback: true
  }, function addFiwareTokenToSession(req, accessToken, refreshToken, profile, done) {
    req.session.fiwareToken = accessToken;
    done(null, true);
  })
);
app.use(passport.initialize());

// app.use(function authenticationConditional(req, res, next) {
//   if (!req.session || !req.session.fiwareToken) {
//     (passport.authenticate('fiware', {
//       session: false
//     })(req, res, next));
//   } else {
//     next();
//   }
// });

var routeConfigurator = require('lib/route-configurator');
routeConfigurator(app, config['app-routes'], __dirname);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('login/error');
});



module.exports = app;
