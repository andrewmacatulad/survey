const jwt = require("jwt-simple");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  // sub is for subject which in this case the user.id
  // iat is equals to issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  // req.body will get an empty object
  // if you post data this like email and password
  // you can call them using req.body.email and req.body.password
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "Enter an email and password" });
  }
  // see if a user with the given email exist
  // the User will get you all user the entire collection of user
  // the findOne is a method that will search in this case
  // email will find if they have an equal
  // and have a callback function where you have an argument of Error
  // and an existingUser argument
  User.findOne({ email }, function(err, existingUser) {
    // this will run if there is an error
    if (err) {
      return next(err);
    }

    // if a user with email does exist, return an Error
    if (existingUser) {
      // this res.status 422 is the same when you didn find anything on a browser
      // and send an error object with the Email is in use value
      return res.status(422).send({ error: "Email is in use" });
    }

    // if a user with email does not exist, create and save a user record
    // this will make a user that is equal to a new User with the
    // value of email is equal to the email argument above the findOne
    // and the value of password to the password argument in the findOne
    const user = new User({
      email,
      password
    });
    // then you can save it like this where you still need a callback for error
    user.save(function(err) {
      // this is for the error
      if (err) {
        return next(err);
      }
      // Respond to request indicating the user was created
      // now you can execute it with res.json
      res.json({ token: tokenForUser(user) });
    });
  });
};