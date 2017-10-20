import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }
    // this will check if it is authenticated if not it will push you to the root
    componentWillMount() {
     // console.log(this.context.router)

      if (!this.props.authenticated) {
        this.context.router.history.push('/');
      }
    }
    // same as above but will run if it is updated
    componentWillUpdate(nextProps) {
      //console.log(this.context.router)
      if (!nextProps.authenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {
      // console.log(this.props.authenticated)
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    // console.log(state)
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}
