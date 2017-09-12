import React, { Component } from "react";
import { reduxForm } from 'redux-form'

import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { new: false };
	// }

	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview) {
			return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })}/>;
		}
		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

// set a reduxForm here also so when you cancel since the destroyOnMount is defaulted to true
// the values from the reduxForm in the surveyForm will be deleted
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);
