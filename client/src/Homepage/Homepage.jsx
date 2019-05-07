import React from 'react';
import { BpkGridContainer } from 'bpk-component-grid';

// Internal imports
import Hero from './components/Hero';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Heading from './components/Heading';
import CareerEvent from './components/CareerEvent';
import Schooling from './components/Schooling';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import STYLES from './Homepage.scss';

import { SKYSCANNER, GLASGOW, WHITESTEIN } from './data/career';

const c = className => STYLES[className] || 'UNKNOWN';


class Homepage extends React.Component {
  constructor() {
    super();
    this.changeSelected = this.changeSelected.bind(this);
    this.scrollTo = this.scrollTo.bind(this);

    this.state = {
      sectionInView: 'top',
      sectionsUncovered: {
        top: true,
        profile: false,
        projects: false,
        career: false,
        careerB: false,
        careerC: false,
        education: false,
        contact: false,
      },
      skills: [],
    };
  }

  changeSelected(sectionInView) {
    const sectionsUncovered = { ...this.state.sectionsUncovered };
    sectionsUncovered[sectionInView] = true;

    this.setState({
      sectionInView,
      sectionsUncovered,
    });
  }

  scrollTo(newSelected, where) {
    const elmnt = document.getElementById(newSelected);
    if (newSelected && elmnt) {
      elmnt.scrollIntoView({
        behavior: 'smooth',
        block: where || 'center',
        inline: 'center',
      });
      this.changeSelected(newSelected);
    }
  }

  render() {
    const { sectionsUncovered } = this.state;
    return (
      <div className={c('App')}>
        <BpkGridContainer>
          <Hero changeSelected={this.changeSelected} scrollTo={this.scrollTo} />
          <NavBar
            selected={this.state.sectionInView}
            scrollTo={this.scrollTo}
          />
          <Heading
            visible={sectionsUncovered.profile}
            onIntersection={this.changeSelected}
            pixelId="profile"
            show
          />
          <Profile
            visible={sectionsUncovered.profile}
            scrollTo={this.scrollTo}
          />
          <Heading
            visible={sectionsUncovered.projects}
            onIntersection={this.changeSelected}
            pixelId="projects"
            show
          />
          <Projects
            visible={sectionsUncovered.projects}
            filters={this.state.skills}
            onFilterRemove={this.onFilter}
          />
          <Heading
            visible={sectionsUncovered.career}
            onIntersection={this.changeSelected}
            pixelId="career"
            show
          />
          <CareerEvent
            visible={sectionsUncovered.career}
            changeSelected={this.changeSelected}
            info={SKYSCANNER}
          />
          <Heading
            visible={sectionsUncovered.careerB}
            onIntersection={this.changeSelected}
            pixelId="careerB"
            target="career"
            show={false}
          />
          <CareerEvent
            visible={sectionsUncovered.careerB}
            changeSelected={this.changeSelected}
            info={GLASGOW}
          />
          <Heading
            visible={sectionsUncovered.careerC}
            onIntersection={this.changeSelected}
            pixelId="careerC"
            target="career"
            show={false}
          />
          <CareerEvent
            visible={sectionsUncovered.careerC}
            changeSelected={this.changeSelected}
            info={WHITESTEIN}
          />
          <Heading
            onIntersection={this.changeSelected}
            pixelId="education"
            show
            visible={sectionsUncovered.education}
          />
          <Schooling visible={sectionsUncovered.education} />
          <Heading
            onIntersection={this.changeSelected}
            pixelId="contact"
            show
            visible={sectionsUncovered.contact}
          />
          <Contact visible={sectionsUncovered.contact} />
          <Footer
            scrollUp={this.scrollTo}
            visible={sectionsUncovered.contact}
          />
        </BpkGridContainer>
      </div>
    );
  }
}

export default Homepage;
