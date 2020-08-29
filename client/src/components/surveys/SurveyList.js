import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderAdmin(survey) {
    return (
      <div className="right floated content">
        <Link to={`/surveys/edit/${survey._id}`} className="ui icon button">
          <i className="edit icon"></i>
        </Link>
        <Link
          to={`/surveys/delete/${survey._id}`}
          className="ui button icon orange"
        >
          <i className="trash alternate icon"></i>
        </Link>
      </div>
    );
  }

  renderData(survey) {
    const total = survey.yes + survey.no + survey.maybe;
    const yesWidth = Math.round((survey.yes / total) * 95);
    const noWidth = Math.round((survey.no / total) * 95);
    const maybeWidth = Math.round((survey.maybe / total) * 95);
    return (
      <>
        <div
          style={{
            backgroundColor: "#2185d0",
            padding: "5px",
            width: `${yesWidth}%`,
            display: "inline-block",
            color: "#f1f3f8",
          }}
        >
          Yes: <br />
          {survey.yes}
        </div>
        <div
          style={{
            backgroundColor: "#00b5ad",
            padding: "5px",
            width: `${maybeWidth}%`,
            display: "inline-block",
            color: "#f1f3f8",
          }}
        >
          Maybe: <br />
          {survey.maybe}
        </div>
        <div
          style={{
            backgroundColor: "#a2d5f2",
            padding: "5px",
            width: `${noWidth}%`,
            display: "inline-block",
            color: "#0f3460",
          }}
        >
          No: <br />
          {survey.no}
        </div>
      </>
    );
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
          {this.renderAdmin(survey)}
          <div className="content">
            <div className="header">{survey.title}</div>
            <div className="description">
              <p>{survey.body}</p>

              <p>
                Sent: {new Date(survey.dateSent).toLocaleDateString()}
                {lastResponse}
              </p>
            </div>
          </div>

          {this.renderData(survey)}
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

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
