import React from "react";
import SurveyList from "./surveys/SurveyList";
import { connect } from "react-redux";

const Dashboard = ({ auth }) => {
  if (auth) {
    console.log(
      "%cWelcome back! %cHappy to see you!",
      "font-weight:bold",
      "color: teal"
    );
  }
  return (
    <div>
      {!auth ? (
        <div style={{ color: "#2185D0", padding: "0 20px 0 20px" }}>
          <h1> Hello! </h1>
          <h2> You don't seem to be logged in. </h2>
          <h2>Please log in to continue. </h2>
        </div>
      ) : (
        <SurveyList />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Dashboard);
