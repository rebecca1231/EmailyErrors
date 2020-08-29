import React from "react";
import Modal from "../../Modal";
import { connect } from "react-redux";

import { fetchSurvey, deleteSurvey } from "../../actions";

//import history from "../../history";
//import { Link } from "react-router-dom";
//not using Link or history.push to /surveys, because SurveyList doesn't re-render properly
//it doesn't make the api call to get the list of surveys


class SurveyDelete extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchSurvey(id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <a
          onClick={() => this.props.deleteSurvey(id)}
          href="/surveys"
          className="ui negative button"
        >
          Delete
        </a>
        <a href="/surveys" className="ui button">
          Cancel
        </a>
      </>
    );
  }
  renderContent() {
    if (!this.props.survey) {
      return "Are you sure you want to delete this survey?";
    } else {
      return `Are you sure you want to delete "${this.props.survey.title}"?`;
    }
  }

  //add in this.props.survey.title or something.
  //let's try to get the survey loaded up and get it's info into the DOM
  //like the title to be passed into the Modal, etc
  render() {
    return (
      <div>
        <Modal
          title="Delete Survey"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => window.location.href="/surveys"}
        />
      </div>
    );
  }
}

const mapStateToProps = ({surveys}, ownProps) => {
  return  { survey: surveys[ownProps.match.params.id] } ;
};
export default connect(mapStateToProps, { fetchSurvey, deleteSurvey })(
  SurveyDelete
);
