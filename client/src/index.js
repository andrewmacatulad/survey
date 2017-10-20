// import "materialize-css/dist/css/materialize.min.css";
// import "materialize-social/materialize-social.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { AUTH_USER } from './actions/types'

import App from "./components/App";
import reducers from "./reducers";
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const token = localStorage.getItem('token')
// If we have token, consider the user to be signed in
if(token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);