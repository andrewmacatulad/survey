import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Signin from "./Signin";
import Signout from "./Signout";
import Facebook from "./Facebook";
import SurveyNew from "./surveys/SurveyNew";
import TweetsNew from "./Tweets";
import Signup from "./Signup";
import Feature from "./Feature";
import RequireAuth from "./auth/require_auth";


class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/signin" component={Signin} />
					<Route path="/tweet" component={TweetsNew} />
					<Route path="/signup" component={Signup} />
					<Route path="/signout" component={Signout} />
					<Route
						path="/surveys/new"
						component={RequireAuth(SurveyNew)}
					/>
					<Route
						exact
						path="/facebook"
						component={RequireAuth(Facebook)}
					/>
					<Route
						exact
						path="/surveys"
						component={RequireAuth(Dashboard)}
					/>
					<Route
						exact
						path="/feature"
						component={RequireAuth(Feature)}
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, { fetchUser })(App);
