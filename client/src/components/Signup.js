import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { signupUser } from '../actions'

// const validate = values =>  {
//   const errors = {};
//
//   if(values.password !== values.confirmPassword){
//     errors.password = "Password did not match"
//   }
//   return errors
// }

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(values.password !== values.confirmPassword){
    errors.password = "Password did not match"
    errors.confirmPassword = "Password did not match"
  }
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

const renderField = ({input, label, type, className, meta: {touched, error, warning}}) => (
  <div className="form-group">
    <label>{label}</label>
      <input {...input} placeholder={label} type={type} className={className}/>
      {touched &&
        ((error && <div className="alert alert-danger" role="alert">{error}</div>) ||
          (warning && <div className="alert alert-warning" role="alert">{warning}</div>))}
  </div>
)

class Signup extends Component {
  handleFormSubmit(formProps){
    // Call action creator to sign up to the user
    this.props.signupUser(formProps, () => this.props.history.push('/surveys'))
  }
  
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>FUCKER ERROR!!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div>
              <Field
                className="form-control"
                name="email"
                label="Email"
                component={renderField}
                type="email"
                />
              </div>
              <div>
              <Field
                className="form-control"
                name="password"
                component={renderField}
                type="password"
                placeholder="Password"
                label="Password"
                />

              </div>
              <div className="form-group">
              <Field className="form-control"
                name="confirmPassword"
                component={renderField}
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
                />
              </div>

              <button action="submit" className="btn btn-primary">Sign Up</button>
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
	 console.log(state)
  return { errorMessage: state.auth }
}


Signup = reduxForm({
  form: 'signForm',
  validate
}) (Signup);



Signup = connect(mapStateToProps, {signupUser})(Signup);
export default Signup;