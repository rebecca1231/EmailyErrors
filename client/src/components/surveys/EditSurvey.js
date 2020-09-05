//EditSurvey toggle between EditSurveyForm and EditSurveyFormReview
//it has access to the url

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import EditSurveyForm from "./EditSurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { connect } from "react-redux";
import { fetchSurvey, fetchSurveys } from "../../actions";
import { Link } from "react-router-dom";

//input values from id

class EditSurvey extends Component {
  state = { id: this.props.match.params.id };

  componentDidMount() {
    this.props.fetchSurveys();
    const id = this.props.match.params.id;
    this.props.fetchSurvey(id);
  }
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <EditSurveyForm
        surveyId={this.state.id}
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  renderList() {
    return this.props.surveys.map((s) => {
      return (
        <a
          href={`/surveys/edit/${s._id}`}
          className="item"
          key={s._id}
          onClick={() => this.setState({ id: s._id })}
        >
          {" "}
          {s.title}{" "}
        </a>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        <div style={{marginLeft:"1.25rem"}}>
          <h3>Edit Other Emails</h3>
          <div className="ui celled horizontal list">{this.renderList(this.state.id)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey, surveys }) => {
  return { survey: survey[0], surveys: surveys };
};

export default connect(mapStateToProps, { fetchSurvey, fetchSurveys })(
  reduxForm({ form: "surveyForm" })(EditSurvey)
);
