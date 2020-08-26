import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; //like connect, communicate w store
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from './formFields' 


class SurveyForm extends Component {

  
  renderFields() {
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

  render() {
    return (
      <div >
        <form className="ui form" style={{margin:"20px"}}
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
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

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount:false
})(SurveyForm);
