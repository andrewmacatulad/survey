import React, {Component} from "react";
import { Link } from "react-router-dom";
import {fetchUser} from '../actions';
import { connect } from 'react-redux';

import SurveyList from './surveys/SurveyList';

class Dashboard extends Component {
	// componentDidMount() {
	// 	this.props.fetchUser();
	// }
	render() {
		return (
			<div>
				<SurveyList />
				<div className="fixed-action-btn">
					<Link to="/surveys/new" className="btn-floating btn-large red">
						<i className="large material-icons">add</i>
					</Link>
				</div>
			</div>
		);
	}
};

export default connect(null, {fetchUser})(Dashboard);