import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTweets } from '../actions';
import { Tweet } from 'react-twitter-widgets'

class Tweets extends Component {
	componentDidMount() {
		this.props.fetchTweets();
	}
	renderTweetsList() {
		return this.props.tweets.map(tweetList => {
			return(
				<div><Tweet key={tweetList.id} tweetId={tweetList.id_str} /></div>
			)
		})
	}
	render() {
	    if(!this.props.tweets) {
	      return <div>Loading....</div>
	    }
		return <div>{this.renderTweetsList()}</div>;
	}
}

const mapStateToProps = ({tweets}) => {
	return { tweets };
}



export default connect(mapStateToProps, {fetchTweets})(Tweets);