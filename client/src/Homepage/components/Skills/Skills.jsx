import React from 'react';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import Toggle from '../Toggle';

import STYLES from './Skills.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const TECH_SKILLS = [
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

const LANG_SKILLS = [
  {
    title: 'English',
    level: 100,
  },
  {
    title: 'Czech',
    level: 100,
  },
  {
    title: 'German',
    level: 70,
  },
  {
    title: 'Chinese',
    level: 50,
  },
  {
    title: 'Spanish',
    level: 10,
  },
];


class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      skillset: 'tech',
    };

    this.renderSkills = this.renderSkills.bind(this);
    this.getSkills = this.getSkills.bind(this);
    this.onSkillsChange = this.onSkillsChange.bind(this);
    this.toggleLevelsOn = this.toggleLevelsOn.bind(this);
  }

  getSkills() {
    return (this.state.skillset === 'tech') ? TECH_SKILLS : LANG_SKILLS;
  }

  renderSkills() {
    const { hidden } = this.state;
    return this.getSkills().map(skill =>
      (<div key={skill.title}>
        <BpkText tagName="h3" textStyle="lg">{skill.title}</BpkText>
        <div style={{ width: `${hidden ? 0 : skill.level}%` }} className={`${c('Skills__bar')} ${this.state.hidden ? c('Skills__hiddenBar') : ''}`} />
       </div>),
    );
  }
  toggleLevelsOn() {
    this.setState({
      hidden: false,
    });
  }

  onSkillsChange(skillset) {
    this.setState({
      skillset,
      hidden: true,
    });

    setTimeout(this.toggleLevelsOn, 100);
  }

  render() {
    return (
      <BpkGridRow className={c('Skills__row')} >
        <BpkGridColumn width={10} offset={1} mobileWidth={12} mobileOffset={0}>
          <Toggle
            defaultId="tech"
            option1={{ id: 'tech', text: 'Technical skills' }}
            option2={{ id: 'lang', text: 'Language skills' }}
            onChange={this.onSkillsChange}
          />
          <BpkGridRow className={c('Skills__skill')}>
            {this.renderSkills()}
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

export default Skills;
