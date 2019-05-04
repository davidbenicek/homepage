import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import BpkButton from 'bpk-component-button';
import BpkChip from 'bpk-component-chip';
import BpkText from 'bpk-component-text';
import { BpkGridRow } from 'bpk-component-grid';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import styled from 'styled-components';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import BpkBadge, { BADGE_TYPES } from 'bpk-component-badge';

import { TECH_SKILLS, PROJECTS } from '../../data';

import STYLES from './Projects.scss';

const c = className => STYLES[className] || 'UNKNOWN';

class Projects extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: TECH_SKILLS,
      activeFilters: [],
    };
  }

  onClick = (skillId) => {
    const { activeFilters } = this.state;
    const index = activeFilters.indexOf(skillId);
    if (index > -1) {
      activeFilters.splice(index, 1);
    } else {
      activeFilters.push(skillId);
    }
    this.setState({
      activeFilters,
    });
  };

  renderSkillBadge(title, id, active) {
    return (
      <BpkBadge
        className={`
        ${c('Projects__skill')}
        ${id ? c('Projects__clickableSkill') : ''}
        ${active ? c('Projects__clicked') : ''}
        `}
        onClick={() => {
          id ? this.onClick(id) : () => {};
        }}
        type={BADGE_TYPES.inverse}
      >
        {title}
      </BpkBadge>
    );
  }

  renderSkills = () =>
    Object.keys(this.state.skills).map(id =>
      this.renderSkillBadge(
        this.state.skills[id].title, // title
        id, // id
        this.state.activeFilters.includes(id), // active
      ),
    );

  removeFilter(skillId) {
    const activeFilters = [...this.state.activeFilters];
    const index = activeFilters.indexOf(skillId);
    if (index > -1) {
      activeFilters.splice(index, 1);
    } else {
      activeFilters.push(skillId);
    }
    this.setState({ activeFilters });
  }

  filterProjects() {
    return PROJECTS.filter(proj =>
      proj.skills.some(usedSkill =>
        this.state.activeFilters.includes(usedSkill),
      ),
    );
  }

  projectSkills(skills) {
    if (skills.length > 0) {
      return (
        <BpkText tagName="p" textStyle="base" className={c('Projects')}>
          This project was made using:{' '}
          <div>
            {skills.map(s =>
              this.renderSkillBadge(TECH_SKILLS[s] ? TECH_SKILLS[s].title : s),
            )}
          </div>
        </BpkText>
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderProjects(projects = PROJECTS, card = true) {
    if (projects.length === 0) {
      return (
        <BpkBannerAlert
          className={c('Projects__noResults')}
          animateOnEnter
          message="No projects to show off 😢 Remove some filters"
          type={ALERT_TYPES.ERROR}
        />
      );
    }
    if (card) {
      return projects.map((proj) => {
        const ProjectLogo = styled.div`
        background: url('${proj.logo}') no-repeat center;
        background-size: contain;
        height: 120px;
        width: 250px;
        margin: auto;
      `;
        return (
          <div className={c('Projects__tile')}>
            <a href={proj.url} rel="noopener noreferrer" target="_blank">
              <ProjectLogo />
            </a>
            <BpkText
              tagName="h3"
              textStyle="xl"
              className={c('Projects__name')}
            >
              {proj.name}
            </BpkText>
            {proj.work ? (
              <BpkText
                tagName="p"
                textStyle="xs"
                bold
                className={c('Projects__work')}
              >
                {proj.workExplanation}
              </BpkText>
            ) : (
              ''
            )}
            {this.projectSkills(proj.skills)}
            <BpkText
              tagName="p"
              textStyle="base"
              className={c('Projects__tagLine')}
            >
              {proj.tagLine}
            </BpkText>
            <BpkButton
              secondary
              className={c('Projects__checkItOut')}
              onClick={() => window.open(proj.url, '_blank')}
            >
              Check it out
            </BpkButton>
          </div>
        );
      });
    }
    return projects.map((proj) => {
      const ProjectLogo = styled.div`
      background: url('${proj.logo}') no-repeat center left;
      background-size: contain;
      height: 150px;
      width: 200px;
      float: left;
    `;
      return (
        <div className={c('Projects__skillCard')}>
          <a
            href={proj.url}
            rel="noopener noreferrer"
            target="_blank"
            className={c('Projects__row__logo')}
          >
            <ProjectLogo />
          </a>
          <BpkText
            tagName="h3"
            textStyle="xl"
            className={c('Projects__row__name')}
          >
            {proj.name}
          </BpkText>
          {this.projectSkills(proj.skills)}
          {proj.work ? (
            <BpkText
              tagName="p"
              textStyle="xs"
              className={c('Projects__row__work')}
              bold
            >
              {proj.workExplanation}
            </BpkText>
          ) : (
            ''
          )}
          <BpkText
            tagName="p"
            textStyle="base"
            className={c('Projects__row__tagLine')}
          >
            {proj.tagLine}
          </BpkText>
          <BpkButton
            secondary
            className={c('Projects__row__checkItOut')}
            onClick={() => window.open(proj.url, '_blank')}
          >
            Check it out
          </BpkButton>
        </div>
      );
    });
  }

  renderFilters() {
    return (
      <div>
        <BpkText tagName="p" textStyle="lg" className={c('Projects__filters')}>
          Filter projects by skills:
        </BpkText>
        {this.renderSkills()}
      </div>
    );
  }

  renderActiveFilters() {
    return (
      <div className={c('Projects__activeFilters')}>
        <BpkText tagName="p" textStyle="base">
          Active Filters:
        </BpkText>
        {this.state.activeFilters.map(filter => (
          <BpkChip
            className={c('Projects__chip')}
            closeLabel="Close"
            onClose={() => this.removeFilter(filter)}
          >
            {TECH_SKILLS[filter].title}
          </BpkChip>
        ))}
      </div>
    );
  }

  renderFilteredProjects() {
    return (
      <BpkGridRow className={c('Projects__row')}>
        {this.renderFilters()}
        {this.renderActiveFilters()}
        {this.renderProjects(this.filterProjects(), false)}
      </BpkGridRow>
    );
  }
  renderProjectCarousel() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    const tabletSettings = {
      ...settings,
      slidesToShow: 2,
    };
    const mobileSettings = {
      ...settings,
      slidesToShow: 1,
    };
    return (
      <div>
        {this.renderFilters()}
        <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
          <div className={c('Projects__container')}>
            <Slider {...settings} className={c('Projects__carousel')}>
              {this.renderProjects()}
            </Slider>
          </div>
        </BpkBreakpoint>
        <BpkBreakpoint query={BREAKPOINTS.TABLET_ONLY}>
          <div className={c('Projects__container')}>
            <Slider {...tabletSettings} className={c('Projects__carousel')}>
              {this.renderProjects()}
            </Slider>
          </div>
        </BpkBreakpoint>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          <div className={c('Projects__container')}>
            <Slider {...mobileSettings} className={c('Projects__carousel')}>
              {this.renderProjects()}
            </Slider>
          </div>
        </BpkBreakpoint>
      </div>
    );
  }
  render() {
    return (
      <BpkGridRow
        className={`
        ${c('Projects__row')}
        ${
          this.props.visible ? c('Projects__visible') : c('Projects__invisible')
        }
      `}
      >
        {this.state.activeFilters.length > 0
          ? this.renderFilteredProjects()
          : this.renderProjectCarousel()}
      </BpkGridRow>
    );
  }
}

Projects.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Projects;
