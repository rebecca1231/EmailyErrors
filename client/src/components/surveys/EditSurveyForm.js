import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form"; //like connect, communicate w store
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from './formFields' 
import { connect } from 'react-redux'
import {fetchSurvey} from '../../actions'
//input values from id

let EditSurveyForm = props => {
  const id = props.id
  const renderFields = () => {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

    return (
      <div >
        <form className="ui form" style={{margin:"20px"}}
          onSubmit={props.handleSubmit(props.onSurveySubmit)}
        >
          {renderFields()}
          <Link to="/surveys" className="ui button negative">
            Cancel
          </Link>
          <button className="teal ui button right floated" type="submit">
            Next
            <i className="arrow icon right"></i>
          </button>
        </form>
      </div>
    );
  }


function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value.";
    }
  });

  return errors;
}

EditSurveyForm = reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount:false
})(EditSurveyForm);


// You have to connect() to any reducers that you wish to connect to yourself
EditSurveyForm = connect(
  state => ({
    initialValues: state.survey[0] // pull initial values from account reducer
  }),
  { fetchSurvey } // bind account loading action creator
)(EditSurveyForm)

export default EditSurveyForm;