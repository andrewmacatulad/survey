// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import StripeBilling from "./StripeBilling";

// class Header extends Component {
// 	renderContent() {
// 		switch (this.props.auth) {
// 			case null:
// 				return "Still Waiting";
// 			case false:
// 				return (
// 					<li>
// 						<a href="/login">Login</a>
// 					</li>
// 					)
// 			default:
// 				return [
// 					<li key='1'><StripeBilling /></li>,
// 					<li key='3' style={{ margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
// 					<li key='2'>
// 						<a href="/api/logout">Logout</a>
// 					</li>
// 				];
// 		}
// 	}
// 	render() {
// 		return (
// 			<nav>
// 				<div className="nav-wrapper">
// 					<Link
// 						to={this.props.auth ? "/surveys" : "/"}
// 						className="left brand-logo"
// 					>
// 						Emaily
// 					</Link>
// 					<ul className="right">
// 						{this.renderContent()}
// 					</ul>
// 				</div>
// 			</nav>
// 		);
// 	}
// }

// const mapStateToProps = ({ auth }) => {
// 	return { auth };
// };

// export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink }  from 'react-router-dom'
import StripeBilling from "./StripeBilling";

class Header extends Component {
  renderLinks() {
    console.log(this.props.authenticated)
    if(this.props.authenticated){
      // show a link to sign out
		return [
      <li key='1' className="nav-item"><NavLink className="btn btn-secondary" to="/surveys" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Surveys</NavLink></li>,
      <li key='5' className="nav-item"><NavLink className="btn btn-secondary" to="/facebook" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Facebook</NavLink></li>,
			<li key='2'><StripeBilling /></li>,
			<li key='3' className="nav-item"><button className="btn btn-info">Credits: {this.props.authenticated.credits}</button></li>,
		  <li key='4' className="nav-item"><button className="btn btn-link"><a href="/api/logout">Sign Out</a></button></li>
		];

//        return <li className="nav-item"><NavLink to="/signout"  activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign Out</NavLink></li>
    } else {
      // show a link to sign in or sign up
        return [
          <li key='1' className="nav-item"><NavLink className="nav-link" to="/signin" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign In</NavLink></li>,
          <li key='2' className="nav-item"><NavLink className="nav-link" to="/signup" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Sign Up</NavLink></li>,
          <li key='3' className="nav-item"><NavLink className="nav-link" to="/feature" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Feature</NavLink></li>
        ]

    }
  }

  render() {
    //  console.log(this.props.authenticated)
    // if(!this.props.authenticated) {
    //   return <div>Loading</div>;
    // }
    return(
      <nav className="navbar navbar-light bg-dark">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item"><NavLink className="nav-link" to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</NavLink></li>
          {this.renderLinks()}
        </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth }
}

export default connect(mapStateToProps)(Header) ;
