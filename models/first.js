var User = require('./User.js');
var superAdmin;

exports.set = function(callback) {
  User.find({}, function(err, users) {
    if (users.length == 0) {
      superAdmin = false;
    } else {
      superAdmin = true;
    }
    callback();
  });
}

exports.exists = function () {
  if (!superAdmin) {
    return superAdmin;
  }
  return superAdmin;
};