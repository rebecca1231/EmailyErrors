import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from './Payments'

class Header extends Component {
  
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
            <a className="ui primary button" href="/auth/google">Login With Google</a>
        );
      default:
        return [
          <h4 className="item" key='3'> Credits: {this.props.auth.credits} </h4>,
         <a className="item" key='1' ><Payments /></a>,
         <a className="ui button" key='2' a href="/api/logout">Logout</a>
        ];
    }
  }

  render() {
    return (
        <div className="ui secondary pointing menu">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="item" style={{marginLeft: "10px"}}
          >
            <h2>Opine</h2>
          </Link>
          <div className="right menu">
          <div className="item">{this.renderContent()}</div>
          </div>
        </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
