import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchFacebookUser} from '../actions'

class Facebook extends Component {
  componentDidMount() {
  	this.props.fetchFacebookUser()
  }
  fetchFBList() {
		return _.map(this.props.facebookFetch, fbFetch => {
			return (
				<li
				key={fbFetch.id}
				className='list-group-item'>
				{fbFetch.created_time}
				</li>
				)
		})
  }
  render() { 
  	console.log(this.props.facebookFetch);
    return(
		<ul>{this.fetchFBList()}</ul>
    )
  }
}

function mapStateToProps(state) {
  return { facebookFetch: state.facebook }
}

export default connect(mapStateToProps, {fetchFacebookUser}) (Facebook);
