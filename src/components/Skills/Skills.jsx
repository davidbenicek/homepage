import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import STYLES from './Skills.scss';
const c = className => STYLES[className] || 'UNKNOWN';

const SKILLS = [
  {
    title: 'React',
    level: 100,
  },
  {
    title: 'NodeJS',
    level: 90,
  },
  {
    title: 'Python',
    level: 70,
  },
  {
    title: 'AWS',
    level: 70,
  },
  {
    title: 'Java',
    level: 60,
  },
  {
    title: 'Database',
    level: 50,
  },
];


class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
    }
    this.renderSkills = this.renderSkills.bind(this);
    this.interSectionCallback = this.interSectionCallback.bind(this);
  }

  componentDidMount() {
    let options = {
      root: null, // relative to document viewport 
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.4 // visible amount of item shown in relation to root
    };
     
    let observer = new IntersectionObserver(this.interSectionCallback, options);
    observer.observe(document.querySelector(`.${c('Skills__row')}`));
  }

  interSectionCallback(changes, observer) {
    changes.forEach(change => {
        if (change.intersectionRatio > 0.3) {
          this.setState({hidden: false})
        }
    });
  }

  renderSkills() {
    return SKILLS.map((skill) => 
      <div key={skill.title}>
        <BpkText tagName="h3" textStyle="lg">{skill.title}</BpkText>
        <div style={{ width: `${skill.level}%` }} className={`${c('Skills__bar')} ${this.state.hidden ? c('Skills__hiddenBar') : ''}`}></div>
      </div>
    )
  }

  render() {
    return (
        <BpkGridRow className={c('Skills__row')} >
          <BpkGridColumn width={10} offset={1} mobileWidht={12} mobileOffset={0}>
            <BpkGridRow className={c('Skills__skill')}>
              {this.renderSkills()}
            </BpkGridRow>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}

export default Skills;
