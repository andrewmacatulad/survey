import axios from "axios";

import { FETCH_USER, FETCH_SURVEYS, FETCH_TWEETS, AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_MESSAGE, FETCH_FB } from "./types";



export function signupUser({email, password}, callback){
  return dispatch => {
    axios.post('/api/signup', { email, password })
    .then(res => {
      dispatch({ type: FETCH_USER, payload: res.data })
       localStorage.setItem('token', res.data.token)
      
    })
    .then(() => callback())
    .catch(response => {
      // console.log(authError(response.response.data))
      dispatch(authError(response.data.error))
    })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signinUsers({ email, password }, callback) {
  return function(dispatch) {
    // because of the redux thunk middleware you can now use this function
    // dispatch for asynchronous request/decision making inside it

    // Submit email/password to the server
    // this axios is an ajax request so it is asynchronous in nature
    // axios returns a promise whenever you make a request
    axios.post('/api/signin', { email, password })
    .then( response => {
     // console.log(response)
      // If request is good...
      // - Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER })
      // - Save the JWT token
      // this will save the JWT token to the localStorage of a web browser
      localStorage.setItem('token', response.data.token)

    })
    .then(() => callback())
    .catch((response) => {
      // If request is bad...
      dispatch(authError(response.data))
      // - Show an error to the user
    })
  }
}

export const signoutUser = () => async dispatch => {
  const res = await axios.get('/api/logout');

    dispatch({ type: UNAUTH_USER, payload: res.data })
   // console.log(res.data)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export function fetchMessage() {
  return dispatch => {
    axios.get('/api/sample', {
      headers: { authorization: localStorage.getItem('token')}
    }).then(response => {
      console.log(response)
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
    .catch(response => {
    //dispatch(authError(response.response.data))
    })
  }
}

export const fetchFacebookUser = () => async dispatch => {
  const res = await axios.get('/api/fbtest');
  
  dispatch({ type: FETCH_FB, payload: res.data })

}

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current/user");
  localStorage.setItem('token', res.data.jwtToken)
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('api/stripe', token);
	// this type is the same as the fetchUser so the credits will update the same time as it fetch the user
	dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data })
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data })
}

export const fetchTweets = () => async dispatch => {
	const res = await axios.get('/api/tweet/59cfa3f8ed34b4235c7d6176');

	dispatch({ type: FETCH_TWEETS, payload: res.data })
}