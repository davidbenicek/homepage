import React from 'react';
import BpkText from 'bpk-component-text';
import { BpkGridContainer } from 'bpk-component-grid';

// Internal imports
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Event from './components/Event';
import Skills from './components/Skills';
// import Map from './components/EventBox';
// import Footer from './components/EventBox';
import STYLES from './App.scss';


const c = className => STYLES[className] || 'UNKNOWN';



class App extends React.Component {
  constructor() {
    super();
    this.changeSelected = this.changeSelected.bind(this);
    this.attachNavBar = this.attachNavBar.bind(this);

    this.state = {
      sectionInView: 'top',
      navBarAttached: false,
    }
  }

  changeSelected(sectionInView) {
    this.setState({
      sectionInView
    })
  }

  attachNavBar(navBarAttached) {
    this.setState({
      navBarAttached
    })
  }

  render() {
    return (
      <div className={c('App')}>
        <BpkGridContainer>
          <Hero
            attachNavBar={this.attachNavBar}
            changeSelected={this.changeSelected}
          />
          <NavBar
            selected={this.state.sectionInView}
            attachNavBar={this.attachNavBar}
            attached={this.state.navBarAttached}
            changeElement={this.changeSelected}
          />
          <Skills
            changeSelected={this.changeSelected}
          />
          <Event
            changeSelected={this.changeSelected}
          />
          {/* <EventBox />
          <EventBox />
          <Map />
          <Footer /> */}
        </BpkGridContainer>
      </div>);
  }
}

export default App;
