import React from "react";
import Modal from "../../Modal";
import { connect } from "react-redux";

import { fetchSurvey, deleteSurvey } from "../../actions";
import { useParams, Link } from "react-router-dom";

class SurveyDelete extends React.Component {
  componentDidMount() {
    
    const id = this.props.match.params.id;
    console.log(id);
    this.props.fetchSurvey(id);

  }

  //add in this.props.survey.title or something.  
  //let's try to get the survey loaded up and get it's info into the DOM
  //like the title to be passed into the Modal, etc
  render() {
    return (
    <div>
        delete
        </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return { survey: state, props: ownProps };
};
export default connect(mapStateToProps, { fetchSurvey })(SurveyDelete);
