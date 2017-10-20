import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'

import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import tweetsReducer from './tweetReducer';
import facebookReducer from './facebookReducer';

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	tweets: tweetsReducer,
	facebook: facebookReducer,
	surveys: surveysReducer
})