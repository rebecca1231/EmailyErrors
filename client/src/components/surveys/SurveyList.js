import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderList() {
    return this.props.surveys.reverse().map((survey) => {
     //render survey response info
      const total = survey.yes + survey.no;
      const yesWidth = Math.round((survey.yes / total) * 100);
      const noWidth = Math.round((survey.no / total) * 100);
      const lastResponse = survey.lastResponded
        ? ", Last Response on: " +
          new Date(survey.lastResponded).toLocaleDateString()
        : "";
     
        return (
        <div className="card" key={survey._id}>
          <div className="card-content">
            <a
              className="btn-floating btn red right"
              onClick={() => this.props.deleteSurvey(survey._id)}
            >
              <i className="material-icons">delete</i>
            </a>

            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>

            <p className="right">
              Sent: {new Date(survey.dateSent).toLocaleDateString()}
              {lastResponse}
            </p>
          </div>
          <div className="card-action">
            <div
              style={{
                backgroundColor: "#a3d2ca",
                padding: "5px",
                width: `${yesWidth}%`,
                display: "inline-block",
              }}
            >
              Yes: {survey.yes}
            </div>
            <div
              style={{
                backgroundColor: "#e8ded2",
                padding: "5px",
                width: `${noWidth}%`,
                display: "inline-block",
              }}
            >
              No: {survey.no}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div> {this.renderList()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);
