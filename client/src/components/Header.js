import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a className="ui primary button" href="/auth/google">
            Login With Google
          </a>
        );
      default:
        return [
          <div className="item">
            <Link className="ui animated fade button yellow" to="/surveys/new">
              <div className="visible content">New</div>
              <div className="hidden content">
                {" "}
                <i className="plus icon"></i>
              </div>
            </Link>
          </div>,
          <div className="item">
            <a className="ui button" key="2" href="/api/logout">
              Logout
            </a>
          </div>,
          <>
          <h4 className="item" key="3">
            {" "}
          {this.props.auth.credits}
          </h4>
          <a key="1">
            <Payments />
          </a>
          </>,
        ];
    }
  }

  render() {
    return (
      <div className="ui container">
      <div className="ui secondary pointing menu">
        <Link
          to={this.props.auth ? "/surveys" : "/"}
          className="item"
        >
          <h1
            style={{
              color: "#24a19c",
              fontFamily: "Lobster Two",
              fontSize: "3em",
            }}
          >
            Opine
          </h1>
        </Link>
        <div className="menu right">
          <div className="item">{this.renderContent()}</div>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
