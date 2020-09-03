import React, { useState } from "react";
import SurveyBarChart from "./SurveyBarChart";
import SurveyPieChart from "./SurveyPieChart"
import { connect } from "react-redux";
import { fetchSurvey } from "../../actions";

class SurveyChart extends React.Component {
  state = {
    pie: false,
    text: "Pie Chart"
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchSurvey(id);
  }
  render() 
  {
    return (
      <div className="ui container">
        <div style={{margin: "1rem"}}>
     <button
        className="ui button purple"
        onClick={() => {this.state.pie === true ? 
          this.setState({pie:false, text: "Pie Chart"}) 
          : this.setState({pie:true, text: "Bar Chart"})
        }
      }
      >
        {this.state.text}
      </button>
      </div>
              {this.state.pie === false ? 
          <SurveyBarChart id={this.props.match.params.id}/>
          : <SurveyPieChart id={this.props.match.params.id} /> }      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { survey: surveys[0] };
};

export default connect(mapStateToProps, { fetchSurvey })(SurveyChart);
