var loginModule = require('lib/login-module');

exports = module.exports = function (req, res) {
    /**
     * Variables
     */
    var name = req.body.name;
    var fiware_service  = req.body.fiware_service ;
    var fiware_servicepath = req.body.fiware_servicepath;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    /**
     * Validations
     */
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('fiware_service', 'Fiware service  is required').notEmpty();
    req.checkBody('fiware_servicepath', 'Fiware servicepath  is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  
    /**
     * Errors
     */
    var errors = req.validationErrors();
    if (errors) {
      res.render('login/register',{
        errors: errors
      });
    };
    /**
     * Check if the user already exists. If not, create new user
     */
    loginModule.User.getUserByUsername(
        username,
        function (err, user) {
            if (user) {
                res.render('login/register', {
                    error: "User already exists"
                });
            } else {

                var newUser = {name: name, fiware_service: fiware_service, fiware_servicepath: fiware_servicepath, username:username, password: password};

                loginModule.User.createUser(newUser);
        
                req.flash('success_msg', 'You are registered and now you can login');
                res.redirect('login');
            }
        }
    )
}