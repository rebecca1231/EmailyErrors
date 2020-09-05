import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SurveyBarChart from "./SurveyBarChart";
import SurveyPieChart from "./SurveyPieChart";
import { fetchSurvey, fetchSurveys } from "../../actions";

class SurveyChart extends React.Component {
  state = {
    pie: false,
    text: "Pie Chart",
    id: this.props.match.params.id
  };

  componentDidMount() {
    this.props.fetchSurveys();

    const id = this.props.match.params.id;
    this.props.fetchSurvey(id);
  }

  renderList() {
    return this.props.surveys.map((s) => {
      return (
        <Link to={`/surveys/chart/${s._id}`} className="item" key={s._id} onClick={()=> this.setState({id:s._id})}>
          {" "}
          {s.title}{" "}
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="ui container">
        <div style={{ margin: "1rem" }}>
          <Link to="/surveys" className="ui button">
            <i class="arrow left icon"></i>
            Back
          </Link>
          <button
            className="ui button purple"
            onClick={() => {
              this.state.pie === true
                ? this.setState({ pie: false, text: "Pie Chart" })
                : this.setState({ pie: true, text: "Bar Chart" });
            }}
          >
            {this.state.text}
          </button>
        </div>
        {this.state.pie === false ? (
          <SurveyBarChart id={this.state.id} />
        ) : (
          <SurveyPieChart id={this.state.id} />
        )}{" "}
        <div>
          <div className="ui celled horizontal list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, surveys }) => {
  return { survey: survey[0], surveys: surveys };
};

export default connect(mapStateToProps, { fetchSurvey, fetchSurveys })(
  SurveyChart
);
