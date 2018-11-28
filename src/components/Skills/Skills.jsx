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
  }
  renderSkills() {
    return SKILLS.map((skill) => 
      <div key={skill.title}>
        <BpkText tagName="h3" textStyle="lg">{skill.title}</BpkText>
        <div style={ {width: 800 * (skill.level/100) + 'px'} } className={`${c('Skills__bar')} ${this.state.hidden ? c('Skills__hiddenBar') : ''}`}></div>
      </div>
    )
  }

  render() {
    return (
        <BpkGridRow className={c('Skills__row')} onMouseEnter={() => {this.setState({hidden: false})}}>
          <BpkGridColumn width={7} >
            <BpkGridRow className={c('Skills__title')}>
              <BpkText tagName="h2" textStyle="xl">Technical Skills</BpkText>
            </BpkGridRow>
            <BpkGridRow className={c('Skills__skill')}>
              {this.renderSkills()}
            </BpkGridRow>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}
export default Skills;
