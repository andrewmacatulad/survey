const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const TwitchStrategy = require("passport-twitch").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const InstagramStrategy = require("passport-instagram").Strategy;
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	// the user.id is the id in the mongo
	done(null, user.id);
});

// the id pass here is the cookie use in the serializeUser
// in this case the userId
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

module.exports = function() {
	// passport.use(
	// 	new FacebookTokenStrategy(
	// 		{
	// 			clientID: keys.facebookClientID,
	// 			clientSecret: keys.facebookClientSecret
	// 		},
	// 		function(accessToken, refreshToken, profile, done) {
	// 			User.upsertFbUser(accessToken, refreshToken, profile, function(
	// 				err,
	// 				user
	// 			) {
	// 				return done(err, user);
	// 			});
	// 		}
	// 	)
	// );

	passport.use(
		new GoogleStrategy(
			{
				clientID: keys.googleClientID,
				clientSecret: keys.googleClientSecret,
				callbackURL: "/auth/google/callback",
				proxy: true
			},
			async (accessToken, refreshToken, profile, done) => {
				const existingUser = await User.findOne({
					googleId: profile.id
				});
				if (existingUser) {
					return done(null, existingUser);
				}
				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
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
					facebookId: profile.id
				});
				if (existingUser) {
					return done(null, existingUser);
				}

				const user = await new User({
					femail: profile.emails,
					name: profile.displayName,
					provider: "Facebook",
					providerID: profile.id
				})
                const payload = {
                        sub: newUser._id
                    };
                const token = jwt.sign(payload, config.secret);
                user.jwtToken = token;

                user.save(function(err) {
                    if (err) throw err;
                    return done(null, user);
                })
			}
		)
	);

	passport.use(
		new TwitterStrategy(
			{
				consumerKey: keys.twitterClientID,
				consumerSecret: keys.twitterClientSecret,
				callbackURL: "/auth/twitter/callback",
				proxy: true
			},
			async (token, tokenSecret, profile, done) => {
				console.log(profile.id);
				const existingUser = await User.findOne({
					twitterId: profile.id
				});
				console.log(existingUser);
				if (existingUser) {
					return done(null, existingUser);
				}
				const user = await new User({
					twitterId: profile.id,
					twitterAuth: { token, tokenSecret }
				}).save();
				console.log("Saved User Twitter Account");
				done(null, user);
			}
		)
	);

	passport.use(
		new TwitchStrategy(
			{
				clientID: keys.twitchClientID,
				clientSecret: keys.twitchClientSecret,
				callbackURL: "/auth/twitch/callback",
				scope: "user_read",
				proxy: true
			},
			async (accessToken, refreshToken, profile, done) => {
				console.log(profile);
				const existingUser = await User.findOne({
					twitchId: profile.id
				});
				if (existingUser) {
					return done(null, existingUser);
				}
				const user = await new User({ twitchId: profile.id }).save();
				done(null, user);
			}
		)
	);

	passport.use(
		new InstagramStrategy(
			{
				clientID: keys.instagramClientID,
				clientSecret: keys.instagramClientSecret,
				callbackURL: "/auth/instagram/callback",
				proxy: true
			},
			async (accessToken, refreshToken, profile, done) => {
				console.log(profile);
				const existingUser = await User.findOne({
					instagramId: profile.id
				});
				if (existingUser) {
					return done(null, existingUser);
				}
				const user = await new User({ instagramId: profile.id }).save();
				done(null, user);
			}
		)
	);
};

//https://github.com/bertho-zero/react-redux-universal-hot-example/issues/6
