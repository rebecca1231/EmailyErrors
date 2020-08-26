import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div>
        <Link
          className="ui vertical animated button yellow right floated large circular "
          to="/surveys/new"
        >
          <div className="visible content">
            <i className="plus icon"></i>
          </div>
          <div className="hidden content">New</div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
