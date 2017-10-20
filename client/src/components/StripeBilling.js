import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {handleToken} from '../actions'

class StripeBilling extends Component {
	render() {
		return(
		<StripeCheckout 
			name="Survey"
			description="$5 for 5 Credits"
			amount={500}
			// this is a token from Stripe
			// this token got the values like email id create ip etc
			token={token => this.props.handleToken(token)}
			stripeKey={process.env.REACT_APP_STRIPE_KEY}
		>
		<button className="btn btn-success">
		Add Credits
		</button>
		</StripeCheckout>
		)
	}
}

export default connect(null, {handleToken})(StripeBilling);