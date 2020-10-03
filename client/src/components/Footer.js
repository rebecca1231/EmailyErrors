import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div
        className="ui secondary menu"
        style={{ bottom: 0, marginTop: "7rem" }}
      >
        <Link to="/about" className="item" style={{ fontSize: "1.5em" }}>
          About
        </Link>
        <div className="menu right">
          <div className="item">&#169;2020 Opine</div>
          {this.props.auth ? (
            <div className="item">
              <a className="ui button" key="2" href="/api/logout">
                Logout
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Footer);
