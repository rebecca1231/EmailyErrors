import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import SurveyDelete from './surveys/SurveyDelete'
import EditSurvey from './surveys/EditSurvey'
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
            </Switch>
            </div>
        </Router>

      </div>
    );
  }
}

export default connect(null, actions)(App);