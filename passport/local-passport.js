const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create a Local Strategy

const localOptions = { usernameField: "email", passwordField: 'password', session: false, passReqToCallback: true };
const localLogin = new LocalStrategy(localOptions, function(
	email,
	password,
	done
) {
	// Verify this username and password, call done with the user
	// if it is correct email and password
	// otherwise, call done with false

	User.findOne(
		{
			email: email
		},
		function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false);
			}

			// compare passwords - is `password` equal to user.password?
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					return done(err);
				}

				if (!isMatch) {
					return done(null, false);
				}

				return done(null, user);
			});
		}
	);
});

// Setup options for JWT Strategy
const jwtOptions = {
	// the extractjwt will check the value of the header with the key authorization
	// this is where you put the token
	// so the jwtFromRequest will get the value from there
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	// to decode the token you must also get the secret which you can get from config.secret
	secretOrKey: keys.secret
};

// Create JWT Strategy
// set jwtOptions as one of the parameter so you can get the jwtFromRequest and secretOrKey
// payload is the jwt token which is the user.id and timestamp
// the function will be called everytime you want to authenticate a user
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call done without a user object
	User.findById(payload.sub, function(err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);