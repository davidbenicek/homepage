import React from 'react';
import BpkText from 'bpk-component-text';
import { BpkGridContainer } from 'bpk-component-grid';

// Internal imports
import Hero from './components/Hero';
import Event from './components/Event';
// import Map from './components/EventBox';
// import Footer from './components/EventBox';
import STYLES from './App.scss';


const c = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={c('App')}>
      <BpkGridContainer>
        <Hero />
        <Event />
        {/* <EventBox />
        <EventBox />
        <Map />
        <Footer /> */}
      </BpkGridContainer>

  </div>);

export default App;
