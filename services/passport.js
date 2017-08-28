const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

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
