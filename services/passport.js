// const passport = require('passport')
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const LocalStrategy = require("passport-local");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const TwitterStrategy = require("passport-twitter").Strategy;
// const TwitchStrategy = require("passport-twitch").Strategy;
// const FacebookTokenStrategy = require("passport-facebook-token");
// const InstagramStrategy = require("passport-instagram").Strategy;
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const keys = require("../config/keys");
// const User = mongoose.model("users");


// passport.serializeUser((user, done) => {
// 	// the user.id is the id in the mongo
// 	done(null, user.id);
// });

// // the id pass here is the cookie use in the serializeUser
// // in this case the userId
// passport.deserializeUser((id, done) => {
// 	User.findById(id).then(user => {
// 		done(null, user);
// 	});
// });


// module.exports = function() {

// 	passport.use(
// 		new GoogleStrategy(
// 			{
// 				clientID: keys.googleClientID,
// 				clientSecret: keys.googleClientSecret,
// 				callbackURL: "/auth/google/callback",
// 				proxy: true
// 			},
// 			async (accessToken, refreshToken, profile, done) => {
// 				const existingUser = await User.findOne({
// 					googleId: profile.id
// 				});
// 				if (existingUser) {
// 					return done(null, existingUser);
// 				}
// 				const user = await new User({ googleId: profile.id }).save();
// 				done(null, user);
// 			}
// 		)
// 	);



// 	passport.use(
// 		new FacebookStrategy(
// 			{
// 				clientID: keys.facebookClientID,
// 				clientSecret: keys.facebookClientSecret,
// 				callbackURL: "/auth/facebook/callback",
// 				profileFields: [
// 					"id",
// 					"email",
// 					"gender",
// 					"displayName",
// 					"profileUrl",
// 					"photos"
// 				],
// 				enableProof: true,
// 				proxy: true
// 			},
// 			async (accessToken, refreshToken, profile, done) => {
// 				const existingUser = await User.findOne({
// 					facebookId: profile.id
// 				});
// 				if (existingUser) {
// 					return done(null, existingUser);
// 				}

// 				const user = await new User({
// 					femail: profile.emails,
// 					name: profile.displayName,
// 					provider: "Facebook",
// 					providerID: profile.id
// 				})
//                 const payload = {
//                         sub: newUser._id
//                     };
//                 const token = jwt.sign(payload, config.secret);
//                 user.jwtToken = token;

//                 user.save(function(err) {
//                     if (err) throw err;
//                     return done(null, user);
//                 })
// 			}
// 		)
// 	);

// 	passport.use(
// 		new TwitterStrategy(
// 			{
// 				consumerKey: keys.twitterClientID,
// 				consumerSecret: keys.twitterClientSecret,
// 				callbackURL: "/auth/twitter/callback",
// 				proxy: true
// 			},
// 			async (token, tokenSecret, profile, done) => {
// 				console.log(profile.id);
// 				const existingUser = await User.findOne({
// 					twitterId: profile.id
// 				});
// 				console.log(existingUser);
// 				if (existingUser) {
// 					return done(null, existingUser);
// 				}
// 				const user = await new User({
// 					twitterId: profile.id,
// 					twitterAuth: { token, tokenSecret }
// 				}).save();
// 				console.log("Saved User Twitter Account");
// 				done(null, user);
// 			}
// 		)
// 	);

// 	passport.use(
// 		new TwitchStrategy(
// 			{
// 				clientID: keys.twitchClientID,
// 				clientSecret: keys.twitchClientSecret,
// 				callbackURL: "/auth/twitch/callback",
// 				scope: "user_read",
// 				proxy: true
// 			},
// 			async (accessToken, refreshToken, profile, done) => {
// 				console.log(profile);
// 				const existingUser = await User.findOne({
// 					twitchId: profile.id
// 				});
// 				if (existingUser) {
// 					return done(null, existingUser);
// 				}
// 				const user = await new User({ twitchId: profile.id }).save();
// 				done(null, user);
// 			}
// 		)
// 	);

// 	passport.use(
// 		new InstagramStrategy(
// 			{
// 				clientID: keys.instagramClientID,
// 				clientSecret: keys.instagramClientSecret,
// 				callbackURL: "/auth/instagram/callback",
// 				proxy: true
// 			},
// 			async (accessToken, refreshToken, profile, done) => {
// 				console.log(profile);
// 				const existingUser = await User.findOne({
// 					instagramId: profile.id
// 				});
// 				if (existingUser) {
// 					return done(null, existingUser);
// 				}
// 				const user = await new User({ instagramId: profile.id }).save();
// 				done(null, user);
// 			}
// 		)
// 	);
// };

// // // Create a Local Strategy
// // const localOptions = {
// // 	usernameField: "email",
// // 	passwordField: "password",
// // 	session: false,
// // 	passReqToCallback: true
// // };
// // const localLogin = new LocalStrategy(localOptions, function(
// // 	email,
// // 	password,
// // 	done
// // ) {
// // 	// Verify this username and password, call done with the user
// // 	// if it is correct email and password
// // 	// otherwise, call done with false

// // 	User.findOne(
// // 		{
// // 			email: email
// // 		},
// // 		function(err, user) {
// // 			if (err) {
// // 				return done(err);
// // 			}

// // 			if (!user) {
// // 				return done(null, false);
// // 			}

// // 			// compare passwords - is `password` equal to user.password?
// // 			user.comparePassword(password, function(err, isMatch) {
// // 				if (err) {
// // 					return done(err);
// // 				}

// // 				if (!isMatch) {
// // 					return done(null, false);
// // 				}

// // 				return done(null, user);
// // 			});
// // 		}
// // 	);
// // });

// // // Setup options for JWT Strategy
// // const jwtOptions = {
// // 	// the extractjwt will check the value of the header with the key authorization
// // 	// this is where you put the token
// // 	// so the jwtFromRequest will get the value from there
// // 	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
// // 	// to decode the token you must also get the secret which you can get from config.secret
// // 	secretOrKey: keys.secret
// // };

// // // Create JWT Strategy
// // // set jwtOptions as one of the parameter so you can get the jwtFromRequest and secretOrKey
// // // payload is the jwt token which is the user.id and timestamp
// // // the function will be called everytime you want to authenticate a user
// // const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
// // 	// See if the user ID in the payload exists in our database
// // 	// If it does, call 'done' with that other
// // 	// otherwise, call done without a user object
// // 	User.findById(payload.sub, function(err, user) {
// // 		if (err) {
// // 			return done(err, false);
// // 		}

// // 		if (user) {
// // 			done(null, user);
// // 		} else {
// // 			done(null, false);
// // 		}
// // 	});
// // });

// // // Tell passport to use this strategy
// // passport.use(jwtLogin);
// // passport.use(localLogin);


// const keys = require("../config/keys");
// const User = mongoose.model("users");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const TwitchStrategy = require("passport-twitch").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	// the user.id is the id in the mongo
	console.log('serializeUser ' +  user.id)
	done(null, user.id);
});

// the id pass here is the cookie use in the serializeUser
// in this case the userId
passport.deserializeUser((id, done) => {
		console.log('deserializeUser ' + id)
	User.findById(id).then(user => {
		done(null, user);
	});
});



passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id })
				if (existingUser) {
					return done(null, existingUser);
				}
					const user = await new User({ googleId: profile.id }).save()
					done(null, user)
		}
	)
);



	passport.use(
		new FacebookStrategy(
			{
				clientID: keys.facebookClientID,
				clientSecret: keys.facebookClientSecret,
				callbackURL: "/auth/facebook/callback",
				profileFields: [
					"id",
					"email",
					"gender",
					"displayName",
					"profileUrl",
					"photos"
				],
				enableProof: true,
				proxy: true
			},
			async (accessToken, refreshToken, profile, done) => {
				const existingUser = await User.findOne({
					providerID: profile.id
				});
				if (existingUser) {
					console.log('User Exist ' + existingUser)
					return done(null, existingUser);
				}
				console.log('Create User')
				const user = await new User({
					email: profile.emails,
					name: profile.displayName,
					provider: "Facebook",
					providerID: profile.id,
					accessToken
				})
				console.log(user.email)
				var newUser = new User(user);
				
                const payload = {
                        sub: newUser._id
                    };
                const token = jwt.sign(payload, keys.secret);
					console.log('Access token :' + accessToken)
                newUser.jwtToken = token;
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, user);
                })
			}
		)
	);