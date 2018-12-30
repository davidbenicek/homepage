import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Internal imports
import Homepage from './Homepage';
import WorldMap from './WorldMap';
import Hanyu from './Hanyu';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/map" component={WorldMap} />
          <Route path="/kanhanzi" component={Hanyu} />
          <Route path="/hanyu" component={Hanyu} />
        </Switch>
      </Router>
    );
  }
}

export default App;
