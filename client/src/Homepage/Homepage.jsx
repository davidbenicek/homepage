import React from "react";
import { BpkGridContainer } from "bpk-component-grid";

// Internal imports
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import Heading from "./components/Heading";
import CareerEvent from "./components/CareerEvent";
import Schooling from "./components/Schooling";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import STYLES from "./Homepage.scss";

const c = className => STYLES[className] || "UNKNOWN";

class Homepage extends React.Component {
  constructor() {
    super();
    this.changeSelected = this.changeSelected.bind(this);
    this.scrollTo = this.scrollTo.bind(this);

    this.state = {
      sectionInView: "top",
      skills: []
    };
  }

  changeSelected(sectionInView) {
    this.setState({
      sectionInView
    });
  }

  scrollTo(newSelected, where) {
    const elmnt = document.getElementById(newSelected);
    if (newSelected && elmnt) {
      elmnt.scrollIntoView({
        behavior: "smooth",
        block: where || "center",
        inline: "center"
      });
      this.changeSelected(newSelected);
    }
  }

  render() {
    return (
      <div className={c("App")}>
        <BpkGridContainer>
          <Hero changeSelected={this.changeSelected} scrollTo={this.scrollTo} />
          <NavBar
            selected={this.state.sectionInView}
            scrollTo={this.scrollTo}
          />
          <Heading onIntersection={this.changeSelected} id="profile" show />
          <Profile scrollTo={this.scrollTo} />
          <Heading onIntersection={this.changeSelected} id="projects" show />
          <Projects
            filters={this.state.skills}
            onFilterRemove={this.onFilter}
          />
          <Heading onIntersection={this.changeSelected} id="career" show />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://s3.eu-central-1.amazonaws.com/benicek/homepage/skyline.jpg"
            organisation="Skyscanner"
            position="Software Engineer"
            dates="June 2016 - Present"
            text={[
              "Working in the Modern Advertising team, focusing on optimising the delivery of ads throughout the Skyscanner product",
              "Working with integrations for Google Ad Manager, Media Alpha and helping develop the Skyscanner Ad Manager ecosystem",
              "Created branded content pages for numerous partners",
              "Previously, worked part time alongside university for two years (Glasgow, London office)",
              "Created bespoke systems for surfacing internal company organisation structure, goal alignment and service ownership",
              "Helped re-design the Skyscanner Jobs website",
              "Worked extensively with JIRA, Confluence and developed system engineering knowledge"
            ]}
          />
          <Heading
            onIntersection={this.changeSelected}
            id="career"
            show={false}
          />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://s3.eu-central-1.amazonaws.com/benicek/homepage/glasgow2.jpg"
            organisation="University Of Glasgow"
            position="Tutor/Agile Coach"
            dates="Sep 2016 - Jun 2017"
            text={[
              "Operated as a de facto Agile coach for teams completing their third year group project",
              "Mentored, guided and helped teams and individuals to work together and follow Agile principles",
              "Helped facilitate meetings with stakeholders and clients"
            ]}
          />
          <Heading
            onIntersection={this.changeSelected}
            id="career"
            show={false}
          />
          <CareerEvent
            changeSelected={this.changeSelected}
            bannerImage="https://s3.eu-central-1.amazonaws.com/benicek/homepage/myanmar.jpg"
            organisation="WhiteStein"
            position="Intern Software Engineer"
            dates="Dec 2012-Jan 2013"
            text={[
              "One month internship during final year of high school",
              "Extended a set of executable models for a Business Process Management platform",
              "Reimplemented demo programs and documentation that was presented to clients"
            ]}
          />
          <Heading onIntersection={this.changeSelected} id="education" show />
          <Schooling />
          <Heading onIntersection={this.changeSelected} id="contact" show />
          <Contact />
          <Footer scrollUp={this.scrollTo} />
        </BpkGridContainer>
      </div>
    );
  }
}

export default Homepage;
