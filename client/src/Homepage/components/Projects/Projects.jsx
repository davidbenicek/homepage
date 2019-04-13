import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import BpkButton from "bpk-component-button";
import BpkChip from "bpk-component-chip";
import BpkText from "bpk-component-text";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import BpkBreakpoint, { BREAKPOINTS } from "bpk-component-breakpoint";
import styled from "styled-components";

import STYLES from "./Projects.scss";

import TECH_SKILLS from "../../data/techSkills";
import PROJECTS from "../../data/projects";

const c = className => STYLES[className] || "UNKNOWN";

class Projects extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  renderProjects(proj = PROJECTS) {
    if (proj.length === 0) {
      return 'No projects to show off 😢'
    }
    return proj.map(proj => {
      const ProjectLogo = styled.div`
        background: url('${proj.logo}') no-repeat center;
        background-size: contain;
        height: 120px;
        width: 250px;
        margin: auto;
      `;
      return (
        <div className={c("Projects__tile")}>
          <a href={proj.url} rel="noopener noreferrer" target="_blank">
            <ProjectLogo />
          </a>
          <BpkText tagName="h3" textStyle="xl" className={c("Projects__name")}>
            {proj.name}
          </BpkText>
          {proj.work ? (
            <BpkText tagName="p" textStyle="xs" className={c("Projects__work")}>
              *A team effort from my time at Skyscanner
            </BpkText>
          ) : (
            ""
          )}
          <BpkText
            tagName="p"
            textStyle="base"
            className={c("Projects__tagLine")}
          >
            {proj.tagLine}
          </BpkText>
          <BpkButton secondary className={c("Projects__checkItOut")}>
            Check it out
          </BpkButton>
        </div>
      );
    });
  }

  removeFilter(skillId) {
    const filters = [...this.props.filters];
    const index = filters.indexOf(skillId);
    if (index > -1) {
      filters.splice(index, 1);
    } else {
      filters.push(skillId);
    }
    this.props.onFilterRemove(filters);
  }

  filterProjects() {
    return PROJECTS.filter(proj =>
      proj.skills.some(usedSkill => this.props.filters.includes(usedSkill))
    );
  }

  renderFilters() {
    return (
      <BpkGridRow className={c("Projects__row")}>
        <BpkText tagName="p" textStyle="base">
          Filtering for project that demonstrate:
        </BpkText>
        <BpkText tagName="p" textStyle="base">
          This is a work in progress btw!
        </BpkText>
        {this.props.filters.map(filter => (
          <BpkChip
            className={c("Projects__chip")}
            closeLabel="Close"
            onClose={() => this.removeFilter(filter)}
          >
            {TECH_SKILLS[filter].title}
          </BpkChip>
        ))}
        {this.renderProjects(this.filterProjects())}
      </BpkGridRow>
    );
  }
  renderCarousel() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    const tabletSettings = {
      ...settings,
      slidesToShow: 2
    };
    const mobileSettings = {
      ...settings,
      slidesToShow: 1
    };
    return (
      <BpkGridRow className={c("Projects__row")}>
        <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
          <div className={c("Projects__container")}>
            <Slider {...settings} className={c("Projects__carousel")}>
              {this.renderProjects()}
            </Slider>
          </div>
        </BpkBreakpoint>
        <BpkBreakpoint query={BREAKPOINTS.TABLET_ONLY}>
          <div className={c("Projects__container")}>
            <Slider {...tabletSettings} className={c("Projects__carousel")}>
              {this.renderProjects()}
            </Slider>
          </div>
        </BpkBreakpoint>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          <div className={c("Projects__container")}>
            <Slider {...mobileSettings} className={c("Projects__carousel")}>
              {this.renderProjects()}
            </Slider>
          </div>
        </BpkBreakpoint>
      </BpkGridRow>
    );
  }
  render() {
    if (this.props.filters.length) {
      return this.renderFilters();
    }
    return this.renderCarousel();
  }
}

Projects.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterRemove: PropTypes.func.isRequired
};

export default Projects;
