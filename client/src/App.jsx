import React from 'react';
import axios from 'axios';
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
import Footer from './components/Footer';
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
    };
  }

  changeSelected(sectionInView) {
    this.setState({
      sectionInView,
    });
  }

  scrollTo(newSelected) {
    const elmnt = document.getElementById(newSelected);
    if (newSelected && elmnt) {
      elmnt.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });
      this.changeSelected(newSelected);
      if (newSelected === 'top') {
        this.attachNavBar(false);
      } else {
        this.attachNavBar(true);
      }
    }
  }

  attachNavBar(navBarAttached) {
    this.setState({
      navBarAttached,
    });
  }

  render() {
    axios({
      url: '/char',
      method: 'get',
    }).then((data) => {
      console.log(data);
    });
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
            id="skills"
            show
          />
          <Skills
            changeSelected={this.changeSelected}
          />
          <Heading
            onIntersection={this.changeSelected}
            id="career"
            show
          />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://s3.eu-central-1.amazonaws.com/benicek/homepage/skyline.jpg"
            organisation="Skyscanner"
            position="Software Engineer"
            dates="June 2016 - Present"
            text={['Initially, worked part time alongside university for two years (Glasgow, London office)', 'Created bespoke systems for surfacing internal company organisation structure, goal alignment and service ownership', 'Worked extensively with JIRA, Confluence and developed system engineering knowledge', 'Helped re-design the Skyscanner Jobs website', 'After a move to Barcelona, worked in the Modern Advertising team, focusing on optimising the delivery of ads throughout the Skyscanner product', 'Worked with integrations for Google Ad Manager, Media Alpha and helped optimise the Skyscanners own Ad Mananger system', 'Created branded content pages for numberous partners']}
          />
          <Heading
            onIntersection={this.changeSelected}
            id="career"
            show={false}
          />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://scontent-mad1-1.xx.fbcdn.net/v/t31.0-8/11118476_10207385998472262_497960482952204237_o.jpg?_nc_cat=104&_nc_ht=scontent-mad1-1.xx&oh=a91bf008ae6853c8c25238e04c87440e&oe=5CA6622D"
            organisation="WhiteStein"
            position="Intern Software Engineer"
            dates="Dec 2012-Jan 2013"
            text={['One month internship during final year of high scool', 'Extended a set of executable models for a Business Process Management platform', 'Reimplemented demo programs and documentation that was presented to clients']}
          />
          <Heading
            onIntersection={this.changeSelected}
            id="education"
            show
          />
          <Schooling />
          <Heading
            onIntersection={this.changeSelected}
            id="projects"
            show
          />
          <Projects />
          <Heading
            onIntersection={this.changeSelected}
            id="contact"
            show
          />
          <Contact />
          <Footer
            scrollUp={this.scrollTo}
          />
        </BpkGridContainer>
      </div>);
  }
}

export default App;
