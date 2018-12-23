import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Internal imports
import Homepage from './Homepage';
import WorldMap from './WorldMap';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/map" component={WorldMap} />
        </Switch>
      </Router>
    );
  }
}

export default App;
