
// import React, { Component } from 'react';

// class Signin extends Component {
// 	render() {
// 		return(
// 			<div>
// 				<a className="waves-effect waves-light btn-large social facebook" href="/auth/facebook">
// 				<i className="fa fa-facebook"></i> Sign in with Facebook</a>
// 				<a className="waves-effect waves-light btn-large social google" href="/auth/google">
// 				<i className="fa fa-google"></i> Sign in with Google</a>
// 				<a className="waves-effect waves-light btn-large social twitter" href="/auth/twitter">
// 				<i className="fa fa-twitter"></i> Sign in with Twitter</a>
// 				<a className="waves-effect waves-light btn-large social twitch" href="/auth/twitch">
// 				<i className="fa fa-twitch"></i> Sign in with Twitch</a>
// 				<a className="waves-effect waves-light btn-large social instagram" href="/auth/instagram">
// 				<i className="fa fa-instagram"></i> Sign in with Instagram</a>
// 				<a className="waves-effect waves-light btn-large social reddit" href="http://localhost:3000/signup">
// 				<i className="fa fa-reddit"></i> Sign in with Email</a>
// 			</div>
// 		)
// 	}
// }

// export default Signin;

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field  } from 'redux-form'
import { signinUsers } from '../actions'
import { withRouter } from 'react-router-dom';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUsers({email, password}, () => this.props.history.push('/surveys'))
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
  renderLogins() {
    const { handleSubmit } = this.props;

    return(
  	<div id="accordion" role="tablist">
			  <div className="card">
			    <div className="card-header" role="tab" id="headingOne">
			      <h5 className="mb-0">
			        <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			          <i className="fa fa-user-circle-o"></i> Sign in with Email
			        </a>
			      </h5>
			    </div>

		          <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
				      <div className="card-body">
					      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					        <div className="form-group">
					        <label>Email</label>
					        <Field  className="form-control"
					          name="email"
					          component="input"
					          type="email"
					          placeholder="Email"
					          />
					        </div>
					        <div className="form-group">
					        <label>Password</label>
					        <Field className="form-control"
					          name="password"
					          component="input"
					          type="password"
					          placeholder="Password"
					          />
					        </div>

					        <button action="submit" className="btn btn-primary">Sign In</button>
					  	  </form>
						</div>
			    	</div>

		    </div>

			  <div className="card">
			    <div className="card-header" role="tab" id="headingTwo">
			      <h5 className="mb-0">
			        <a data-toggle="collapse" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
			          <i className="fa fa-facebook"></i> Sign in with Facebook
			        </a>
			      </h5>
			    </div>

		          <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
				      <div className="card-body">

						<a className="btn btn-block btn-social btn-facebook" href="/auth/facebook">
						<i className="fa fa-facebook"></i> Sign in with Facebook</a>
						</div>
			    	</div>
			    </div>
			  <div className="card">
			    <div className="card-header" role="tab" id="headingThree">
			      <h5 className="mb-0">
			        <a data-toggle="collapse" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
			          <i className="fa fa-google"></i> Sign in with Google
			        </a>
			      </h5>
			    </div>

		          <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
				      <div className="card-body">

						<a className="btn btn-block btn-social btn-google" href="/auth/google">
						<i className="fa fa-google"></i> Sign in with Google</a>
						</div>
			    	</div>
			    </div>
			  <div className="card">
			    <div className="card-header" role="tab" id="headingFour">
			      <h5 className="mb-0">
			        <a data-toggle="collapse" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
			          <i className="fa fa-twitter"></i> Sign in with Twitter
			        </a>
			      </h5>
			    </div>

		          <div id="collapseFour" className="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion">
				      <div className="card-body">

						<a className="btn btn-block btn-social btn-twitter" href="/auth/twitter">
						<i className="fa fa-twitter"></i> Sign in with Twitter</a>
						</div>
			    	</div>
			    </div>

			  <div className="card">
			    <div className="card-header" role="tab" id="headingFive">
			      <h5 className="mb-0">
			        <a data-toggle="collapse" href="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
			          <i className="fa fa-twitch"></i> Sign in with Twitch
			        </a>
			      </h5>
			    </div>

		          <div id="collapseFive" className="collapse" role="tabpanel" aria-labelledby="headingFive" data-parent="#accordion">
				      <div className="card-body">

						<a className="btn btn-block btn-social btn-twitch" href="/auth/twitch">
						<i className="fa fa-twitch"></i> Sign in with Twitch</a>
						</div>
			    	</div>
			    </div>

			  <div className="card">
			    <div className="card-header" role="tab" id="headingSix">
			      <h5 className="mb-0">
			        <a data-toggle="collapse" href="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
			          <i className="fa fa-instagram"></i> Sign in with Instagram
			        </a>
			      </h5>
			    </div>

		          <div id="collapseSix" className="collapse" role="tabpanel" aria-labelledby="headingSix" data-parent="#accordion">
				      <div className="card-body">

						<a className="btn btn-block btn-social btn-instagram" href="/auth/instagram">
						<i className="fa fa-instagram"></i> Sign in with Instagram</a>
						</div>
			    	</div>
			    </div>
	</div>
	)
  }
  render() {

    return(
    	<div>
			{this.renderLogins()}

    </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth }
}

Signin = reduxForm({
  form: 'myForm'
})(Signin);

Signin = withRouter(connect(mapStateToProps, {signinUsers})(Signin));

export default Signin;