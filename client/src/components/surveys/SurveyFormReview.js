import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, saveSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div className="item" key={name}>
        <div className="content">
        <label className="header" >{label}</label>
        <div className="description" >{formValues[name]}</div>
        </div>
      </div>
    );
  });

  return (
    <div style={{padding:"10px", margin: "10px"}}>
      <h5>Please confirm your entries.</h5>
      <div className="ui relaxed list">
      {reviewFields}
      </div>
      <button
        onClick={onCancel}
        className="ui button yellow"
      >
        <i className="arrow left icon"></i>
        Back
      </button>
      <button
        onClick={() => saveSurvey(formValues, history)}
        className="ui button right floated blue"
      >
        Save Draft
        <i className="save outline icon right floated"> </i>
      </button>

      <button
        onClick={() => submitSurvey(formValues, history)}
        className="ui button right floated teal"
      >
        Send Survey  
        <i className="envelope outline icon right floated"> </i>
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
