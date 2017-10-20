const passport = require("passport");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = mongoose.model("users");
const Authentication = require("../controllers/authentication");
const async = require("async");
const expressJwt = require("express-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const axios = require("axios");
const request = require("request-promise");

// // this will set the passport authenticate to use the jwt Strategy
// // by default session use cookie base but since we use token make it false
// const requireAuth = passport.authenticate("jwt", { session: false });

// const requireSignIn = passport.authenticate("local", { session: false });

// function tokenForUser(user) {
// 	const timestamp = new Date().getTime();

// 	// sub is for subject which in this case the user.id
// 	// iat is equals to issued at time
// 	return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
// }

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

const requireAuth = passport.authenticate("jwt", { session: false });

// this will make the route a function
module.exports = app => {
	app.get("");
	app.get("/api/sample", function(req, res) {
		var token = "";
		//console.log(req.user)
		if (!req.user) {
			res.send({ message: "Error" });
		} else {
			token = req.user.jwtToken;

			jwt.verify(token, keys.secret, (err, decoded) => {
				if (err) {
					res.status(402).send({ message: "Error" });
				} else {
					console.log("payload");
					console.log(decoded.sub);
					res.send({ message: "Super Secret Code Fuck You" });
				}
			});
		}
	});
	// app.post("/signup", Authentication.signup);
	// app.post("/signin", requireSignIn, Authentication.signin);

	app.get(
		"/auth/facebook",
		passport.authenticate("facebook", {
			scope: [
				"user_friends",
				"user_posts",
				"publish_actions",
				"manage_pages",
				"email",
				"user_likes"
			]
		})
	);

	app.get(
		"/auth/facebook/callback",
		passport.authenticate("facebook", {
			failureRedirect: "/"
		}),
		(req, res) => {
			var user = req.user;
			var token = req.user.jwtToken;
			console.log("token : " + token);
			console.log(user);
			console.log("Authenticated?");
			console.log(req.isAuthenticated());
			res.redirect("/surveys");
		}
	);

	app.get("/auth/twitter", passport.authenticate("twitter"));

	app.get(
		"/auth/twitter/callback",
		passport.authenticate("twitter"),
		(req, res) => {
			res.redirect("/surveys");
		}
	);

	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/surveys");
		}
	);

	app.get(
		"/auth/twitch",
		passport.authenticate("twitch", { forceVerify: true })
	);

	app.get(
		"/auth/twitch/callback",
		passport.authenticate("twitch"),
		(req, res) => {
			res.redirect("/surveys");
		}
	);

	app.get("/auth/instagram", passport.authenticate("instagram"));

	app.get(
		"/auth/instagram/callback",
		passport.authenticate("instagram"),
		(req, res) => {
			res.redirect("/surveys");
		}
	);

	app.get("/api/fbtest", (req, res) => {
		var accessT = req.user.accessToken;
		console.log(accessT);
		// console.log(accessT)
		// axios.get('https://graph.facebook.com/me/feed&accessToken=' + accessT)
		// .then(response => {
		// 	return console.log("Success")
		// })
		// .catch(err => {
		// 	return res.send(err)
		// })

		const options = {
		  method: 'GET',
		  uri: 'https://graph.facebook.com/v2.10/me/posts',
		  qs: {
		  	// with: "location",
		  	// fields: "likes.limit(0).summary(true)",
		  	limit: 100,
		    access_token: req.user.accessToken
		  }
		};
		// const options = {
		// 	method: "GET",
		// 	uri:
		// 		"https://graph.facebook.com/v2.10/1859378600745149_1888555814494094?fields=message,from,created_time,updated_time,reactions.type(LOVE).limit(0).summary(1).as(reactions_love),reactions.type(WOW).limit(0).summary(1).as(reactions_wow),reactions.type(HAHA).limit(0).summary(1).as(reactions_haha),reactions.type(LIKE).limit(0).summary(1).as(reactions_like),reactions.type(SAD).limit(0).summary(1).as(reactions_sad),reactions.type(ANGRY).limit(0).summary(1).as(reactions_angry),reactions.type(THANKFUL).limit(0).summary(1).as(reactions_thankful),reactions.type(NONE).limit(0).summary(1).as(reactions_total)&limit=1",
		// 	qs: {
		// 		// with: "location",
		// 		// fields: "id, name, type",
		// 		// summary: "total_count, viewer_reaction",
		// 		// fields: "likes.limit(0).summary(true)",
		// 		limit: 100,
		// 		access_token: req.user.accessToken
		// 	}
		// };
		request(options).then(fbRes => {
			// // Search results are in the data property of the response.
			// // There is another property that allows for pagination of results.
			// // Pagination will not be covered in this post,
			// // so we only need the data property of the parsed response.
			const parsedRes = JSON.parse(fbRes).data;

			//      async.map(parsedRes, (results, callback) => {
			// function getSum(total, num) {
			//     return total + num;
			// }
			//       	const likesCount = results.likes.summary.total_count
			// console.log(likesCount.reduce(getSum))
			//       })
			// var sum = parsedRes.map(function(results){
			// 	return results
			// })
			// .reduce(function(prev, curr){
			// 	return prev + curr;
			// })
			res.send(parsedRes);
		});
	});

	app.get("/api/logout", (req, res) => {
		// req.logout();
		// res.redirect("/");
		req.logout();
		console.log("Authenticated " + req.isAuthenticated());
		// res.status(200).json({ message: "Fuck" });
		res.redirect("/");
	});

	app.get("/api/current/user", (req, res) => {
		//res.send(req.session)
		console.log("authRouter.get /user " + req.user);
		//var user = req.user;
		//res.status(200).json(req.user);
		res.send(req.user);
	});

	app.get("/api/tweet/:id", (req, res) => {
		const Twit = require("twit");
		const id = req.params.id;

		User.findById(id).then(
			user => {
				if (!user) {
					return res.status(404).send("");
				}
				const T = new Twit({
					consumer_key: "THCzeFbDONK7PEijkW8YNf2R2",
					consumer_secret:
						"JMHkvXTeLHPyNGgT7Keai1wnGmJfz2FfwwAUyj7o6frqUAA8Y0",
					access_token: user.twitter.token,
					access_token_secret: user.twitter.tokenSecret
				});

				// T.get("statuses/user_timeline", function(err, data, response) {
				// 	async.map(
				// 		data,
				// 		(results, callback) => {
				// 			T.get(
				// 				"statuses/oembed",
				// 				{ id: results.id_str },
				// 				function(err, data, response) {
				// 					callback(null, data);
				// 				}
				// 			);
				// 		},
				// 		(err, results2) => {
				// 			res.send(results2);
				// 		}
				// 	);
				// 	// console.log(Math.max(...sample))
				// });
				T.get("statuses/user_timeline", function(err, data, response) {
					res.send(data);
					// async.map(
					// 	data,
					// 	(results, callback) => {
					// 		callback(null, data);
					// 	},
					// 	(err, results2) => {
					// 		res.send(results2);
					// 	}
					// );
					// console.log(Math.max(...sample))
				});
			},
			e => {
				res.status(400).send(e);
			}
		);
	});
};
