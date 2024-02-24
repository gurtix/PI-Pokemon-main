import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import DetailPage from './DetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/DetailPage/:id" component={DetailPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
