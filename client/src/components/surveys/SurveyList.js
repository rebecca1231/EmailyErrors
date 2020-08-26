import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchSurveys, deleteSurvey } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderReply(){
    
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
        <div className="item" key={survey._id}>
          <div className="content">

            <div className="header">{survey.title}</div>
            <div className="description">
            <p >{survey.body}</p>

            <p >
              Sent: {new Date(survey.dateSent).toLocaleDateString()}
              {lastResponse}
            </p>
            </div>
          </div>
          <div className="">
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
    return <div className="ui celled animated list"> {this.renderList()}</div>;
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
  SurveyList
);
