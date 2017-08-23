const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");

const app = express();

app.use(
	cookieSession({
		// maxage is for how long the cookie can survive
		// this computation is for 30days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// this key array will allow you to have multiple keys
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

mongoose.connect(keys.mongoURI);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server Started at port 5000");
});

 1013569835319-906lk365vhihhkctunrgc65fugta05u1.apps.googleusercontent.com 

  D3TCT_PZriG6FsUwe9SL19Pk 