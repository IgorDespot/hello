const bcrypt = require('bcryptjs');
const fs = require('fs');
const uuidV1 = require('uuid/v1');

var usersJson = JSON.parse(fs.readFileSync('db/users.json', 'utf8'));

/**
 * Creates User with encrypted and salted password
 * and unique id
 * 
 * @param {*} newUser - User to be created in json format
 */
module.exports.createUser = function(newUser){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.id = uuidV1();
            fs.readFile('db/users.json', function (err, data) {
                var json = JSON.parse(data);
                json.users.push(newUser);

                fs.writeFile("db/users.json", JSON.stringify(json))
            })
        });
    });
}

/**
 * Get user by username
 * 
 * @param {*} username - Username to be found
 * @param {*} callback 
 */
module.exports.getUserByUsername = function (username, callback) {
    for (index in usersJson.users) {
        if (usersJson.users[index].username==username){
           return callback(null, usersJson.users[index]);
        }
    }
    return callback(null,null);
}

/**
 * Compare if two provided passwords are equal
 * @param {*} userPassword - Password which we compare upon
 * @param {*} hash - Hash value of the password 
 * @param {*} callback 
 */
module.exports.comparePassword = function (userPassword, hash, callback){
  bcrypt.compare(userPassword, hash, function(err, isMatch) {
     if(err) throw err;
     return callback(null, isMatch);
  });
}

/**
 * Find user from database by userId
 * @param {*} id  - Id by which a user is returned
 * @param {*} callback 
 */
module.exports.getUserById = function (id, callback) {
  for (index in usersJson.users) {
    if (usersJson.users[index].id==id){
        return callback(null, usersJson.users[index]);
    }
  }
  return callback(null,null);
}
