const passport = require("passport");

// this will make the route a function
module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	app.get("/auth/google/callback", passport.authenticate("google"));

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.send(req.user);
	})

	app.get("/api/current/user", (req, res) => {
		res.send(req.session)
		// res.send(req.user);
	});

};
