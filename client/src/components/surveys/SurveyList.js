import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  state = {
    older: false,
    olderText: "Older",
    atoZ: false,
    atoZText: "A - Z",
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderAdmin(survey) {
    return (
      <div className="right floated content">
        <Link
          to={`/surveys/chart/${survey._id}`}
          className="ui button icon purple"
        >
          <i className="chart bar icon"></i>
        </Link>
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
    const yesWidth = Math.round((survey.yes / total) * 98);
    const noWidth = Math.round((survey.no / total) * 98);
    const maybeWidth = Math.round((survey.maybe / total) * 98);
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

  renderList(surveys = this.props.surveys) {
    if (surveys.length < 1)
      return (
        <div className="ui container" style={{ height: "60vh" }}>
          <h2>
            <br />
            Just getting started?
          </h2>
          <h3>
            Click on the yellow "+" or "New" button to add a question to your
            list!
          </h3>
        </div>
      );
    return surveys.reverse().map((survey) => {
      //render survey response info
      const total = survey.yes + survey.no;
      const yesWidth = Math.round((survey.yes / total) * 100);
      const noWidth = Math.round((survey.no / total) * 100);

      const lastResponse = survey.lastResponded
        ? ", Last Response on: " +
          new Date(survey.lastResponded).toLocaleDateString()
        : "";
      const sentDate = survey.dateSent
        ? "Sent on: " + new Date(survey.dateSent).toLocaleDateString()
        : "Unsent Draft";
      return (
        <div
          className="item"
          key={survey._id}
          style={{ marginBottom: "0.75em" }}
        >
          {this.renderAdmin(survey)}
          <div className="content">
            <div className="header">{survey.title}</div>
            <div className="description">
              <p>{survey.body}</p>

              <p>
                {sentDate}
                {lastResponse}
              </p>
            </div>
          </div>

          {this.renderData(survey)}
        </div>
      );
    });
  }
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  compareDate(a, b) {
    // Use toUpperCase() to ignore character casing
    const dateA = a.dateSent.toUpperCase();
    const dateB = b.dateSent.toUpperCase();

    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  render() {
    let list = this.renderList();

    return (
      <div style={{ padding: "2%" }}>
        {this.props.surveys.length > 1 ? (
          <>
            <h4>Sort by: </h4>
            <div className="actions" style={{ marginLeft: "5px" }}>
              <button
                className="ui basic button"
                onClick={() =>
                  this.state.older === false
                    ? (this.setState({ older: true, olderText: "Newer" }),
                      this.props.surveys.sort(this.compareDate))
                    : (this.setState({ older: false, olderText: "Older" }),
                      this.props.surveys.sort(this.compareDate).reverse())
                }
              >
                {this.state.olderText}
              </button>

              <button
                className="ui basic button"
                onClick={() =>
                  this.state.atoZ === false
                    ? (this.setState({ atoZ: true, atoZText: "Z - A" }),
                      this.props.surveys.sort(this.compare))
                    : (this.setState({ atoZ: false, atoZText: "A - Z" }),
                      this.props.surveys.sort(this.compare).reverse())
                }
              >
                {this.state.atoZText}
              </button>
            </div>
          </>
        ) : (
          " "
        )}{" "}
        <div className="ui animated list">{list}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
