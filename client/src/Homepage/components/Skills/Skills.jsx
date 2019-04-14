import React from 'react';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import { LANG_SKILLS } from '../../data';

import STYLES from './Skills.scss';

const c = className => STYLES[className] || 'UNKNOWN';

class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
    };

    this.renderSkills = this.renderSkills.bind(this);
    this.toggleLevelsOn = this.toggleLevelsOn.bind(this);
  }

  toggleLevelsOn() {
    this.setState({
      hidden: false,
    });
  }

  renderSkills() {
    const { hidden } = this.state;
    return LANG_SKILLS.map(skill => (
      <div key={skill.title}>
        <BpkText tagName="h3" textStyle="lg">{skill.title}</BpkText>
        <div style={{ width: `${hidden ? 0 : skill.level}%` }} className={`${c('Skills__bar')} ${this.state.hidden ? c('Skills__hiddenBar') : ''}`}>
          {skill.text}
        </div>
      </div>),
    );
  }

  render() {
    return (
      <BpkGridColumn className={c('Skills__section')} width={6} offset={0} mobileWidth={12} mobileOffset={0}>
        <BpkGridRow className={c('Skills__skill')}>
          <BpkText tagName="p" textStyle="base">Language skills:</BpkText>
          {this.renderSkills()}
        </BpkGridRow>
      </BpkGridColumn>
    );
  }
}

export default Skills;
