import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Internal imports
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import TravelMap from './TravelMap';
import Hanyu from './Hanyu';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/map" component={TravelMap} />
          <Route path="/kanhanzi" component={Hanyu} />
          <Route path="/hanyu" component={Hanyu} />
        </Switch>
      </Router>
    );
  }
}

export default App;
