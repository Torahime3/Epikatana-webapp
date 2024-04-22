import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Header title="Header2Merde" />
        <Switch>
        <Route exact path="/HomePage">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
