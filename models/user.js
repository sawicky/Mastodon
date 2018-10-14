var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var userType;

// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  email: {
    type: String
  },
  name: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  specialty: {
    type: String,
    required: false
  },
  // FOR VERIFICATION GARY
  verificationStatus: { type: Boolean, default: false },
  //FOR MAKING LINK ONE TIME USABLE GARY
  verificationCode: {
    type: String
  }
});

var User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserType = function() {
  return {
    userType: userType
  };
};
module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.deleteUser = function(id, callback) {
    User.deleteOne({ _id: id }, callback);
};

module.exports.getUserByNameAndId = function(name, id, callback) {
  var query = { username: name, _id: { $ne: id } };
  User.findOne(query, callback);
};

module.exports.getUserByEmailAndId = function(email, id, callback) {
  var query = { email: email, _id: { $ne: id } };
  User.findOne(query, callback);
};

module.exports.getUserByEmail = function(email, callback) {
  var query = { email : email };
  User.findOne(query, callback);
}

module.exports.updateUser = function(updateUser, id, callback) {
  var query = null;
  var username = updateUser.username;
  var email = updateUser.email;
  var name = updateUser.name;
  var bio = updateUser.bio;
  var specialty = updateUser.specialty;

  query = { $set:
          {
              email, username, name, bio, specialty
          }
  };
  User.findOneAndUpdate({ _id: id }, query, { new: true }, callback);
};


module.exports.AdminUpdateUser = function(updateUser, id, callback) {
    var query = null;
    var username = updateUser.username;
    var name = updateUser.name;
    var specialty = updateUser.specialty;

    query = { $set:
            {
                username, name, specialty
            }
    };
    User.findOneAndUpdate({ _id: id }, query, { new: true }, callback);
};


module.exports.updatePassword = function(id, password, callback) {
  var query = null;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      password = hash;
      query = { $set: { password } };
      User.findOneAndUpdate({ _id: id }, query, { new: true }, callback);
    });
  });
};

module.exports.addPrescription = function(id, doctor, description, callback) {
    query = { $set: { doctor, description }};
    User.findOneAndUpdate({ _id: id }, query, { new: true }, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
