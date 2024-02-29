import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import CreatePokemon from './CreatePokemon';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/DetailPage/:id" component={DetailPage} />
          <Route path="/post" component={CreatePokemon} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
