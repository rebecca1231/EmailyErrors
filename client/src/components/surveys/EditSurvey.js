//EditSurvey toggle between EditSurveyForm and EditSurveyFormReview
//it has access to the url 

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import EditSurveyForm from "./EditSurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import {connect } from 'react-redux'
import {fetchSurvey} from  "../../actions"

//input values from id


class EditSurvey extends Component {
  componentDidMount() {
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
        surveyId={this.props.survey}
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = ({surveys}) => {
    return  { survey: surveys[0] } ;
  };

export default connect(mapStateToProps, {fetchSurvey})(reduxForm({ form: "surveyForm" })(EditSurvey));
