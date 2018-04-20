const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/userJson')

/**
 * Ensure that requested page is authenticated. If not,
 * error is printed and user is redirected to login page
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next 
 */
exports.authenticate = function ensureAuth(req, res, next) {
    if (req.isAuthenticated()){
      return next();
    } else {
       req.flash('error_msg', 'You are not logged in');
       res.redirect('/users/login');
    }
  }

  /** 
   * Use LocalStrategy to check if the user exists and
   * if the password is a valid one
  */
passport.use(new LocalStrategy(
  exports.checkCredentials = function check(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user) {
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
}));

/**
 * Serialize user
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

/**
 * Deserialize user
 */
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Authenticate a request and do the redirect depending on cases 
 */
exports.test = passport.authenticate(
  'local', 
  {
    successRedirect:'/upload', 
    failureRedirect:'/users/login', 
    failureFlash: true
  });
