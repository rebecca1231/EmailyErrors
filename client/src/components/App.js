import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Footer from './Footer'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import SurveyDelete from './surveys/SurveyDelete'
import EditSurvey from './surveys/EditSurvey'
import SurveyChart from './surveys/SurveyChart'
import ShowBarChart from './surveys/visualizations/ShowBarChart'
import About from './About'

import history from '../history'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
            <Route exact path="/surveys/delete/:id" component={SurveyDelete} />
            <Route exact path="/surveys/edit/:id" component={EditSurvey} />
            <Route exact path="/surveys/chart/:id" component={SurveyChart} />
            <Route exact path="/surveys/showbarchart" component={ShowBarChart} />
            <Route exact path="/about" component={About} />

            </Switch>
            <Footer />
            </div>
        </Router>

      </div>
    );
  }
}

export default connect(null, actions)(App);