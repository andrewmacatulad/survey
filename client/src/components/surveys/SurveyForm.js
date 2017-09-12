import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button
						className="teal btn-flat right white-text"
						type="submit"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	_.each(formFields, ({ name, error }) => {
		if (!values[name]) {
			errors[name] = error;
		}
	});
	// if (!values.title) {
	// 	errors.title = "Required Title";
	// }
	// if (!values.subject) {
	// 	errors.subject = "Required Subject";
	// }
	// if (!values.body) {
	// 	errors.body = "Required Body";
	// }
	// if (!values.emails) {
	// 	errors.emails = "Required Emails";
	// }

	errors.recipients = validateEmails(values.recipients || "");
	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	// this is for keeping the values so when you press back it is still there
	destroyOnUnmount: false
})(SurveyForm);
