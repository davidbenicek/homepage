import React from 'react';
import BpkText from 'bpk-component-text';
import { BpkGridContainer } from 'bpk-component-grid';

// Internal imports
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Heading from './components/Heading';
import CareerEvent from './components/CareerEvent';
import Skills from './components/Skills';
import Schooling from './components/Schooling';
import Projects from './components/Projects';
import Contact from './components/Contact';
import STYLES from './App.scss';


const c = className => STYLES[className] || 'UNKNOWN';



class App extends React.Component {
  constructor() {
    super();
    this.changeSelected = this.changeSelected.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.attachNavBar = this.attachNavBar.bind(this);

    this.state = {
      sectionInView: 'top',
      navBarAttached: false,
    }
  }

  changeSelected(sectionInView) {
    console.log('change selected to', sectionInView);
    this.setState({
      sectionInView
    });
  }

  scrollTo(newSelected) {
    const elmnt = document.getElementById(newSelected);
    if(newSelected && elmnt) {
      elmnt.scrollIntoView({behavior: "instant", block: "center", inline: "center"});
      this.changeSelected(newSelected);
      if(newSelected === 'top') {
        this.attachNavBar(false);
      } else {
        this.attachNavBar(true);
      }
    }
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
            scrollTo={this.scrollTo}
          />
          <NavBar
            selected={this.state.sectionInView}
            attachNavBar={this.attachNavBar}
            attached={this.state.navBarAttached}
            scrollTo={this.scrollTo}
          />
          <Heading
            onIntersection={this.changeSelected}
            id='skills'
            text='Skills'
            show
          />
          <Skills
            changeSelected={this.changeSelected}
          />
          <Heading
            onIntersection={this.changeSelected}
            id='career'
            text='Employment History'
            show
          />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://s3.eu-central-1.amazonaws.com/benicek/homepage/skyline.jpg"
            organisation="Skyscanner"
            position="Software Engineer"
            dates="June 2016 - Present"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
          <Heading
            onIntersection={this.changeSelected}
            id='career'
            text='Employment History'
            show={false}
          />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://scontent-mad1-1.xx.fbcdn.net/v/t31.0-8/11118476_10207385998472262_497960482952204237_o.jpg?_nc_cat=104&_nc_ht=scontent-mad1-1.xx&oh=a91bf008ae6853c8c25238e04c87440e&oe=5CA6622D"
            organisation="WhiteStein"
            position="Intern Software Engineer"
            dates="Dec 2012-Jan 2013"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
          <Heading
            onIntersection={this.changeSelected}
            id='education'
            text='Education'
            show
          />
          <Schooling/>
          <Heading
            onIntersection={this.changeSelected}
            id='projects'
            text='Projects'
            show
          />
          <Projects/>
          <Heading
            onIntersection={this.changeSelected}
            id='contact'
            text='Contact details'
            show
          />
          <Contact
            scrollUp={this.scrollTo}
          />
        </BpkGridContainer>
      </div>);
  }
}

export default App;
