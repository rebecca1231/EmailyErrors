import React, { useState } from "react";
import SurveyBarChart from "./SurveyBarChart";
import { connect } from "react-redux";
import { fetchSurvey } from "../../actions";

class SurveyChart extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchSurvey(id);
  }
  render() 
  {
    return (
      <div className="ui container">

        <SurveyBarChart id={this.props.match.params.id}
         />
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { survey: surveys[0] };
};

export default connect(mapStateToProps, { fetchSurvey })(SurveyChart);
