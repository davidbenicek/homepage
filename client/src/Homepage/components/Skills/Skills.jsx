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
    text: 'Advanced',
  },
  {
    title: 'NodeJS',
    level: 98,
    text: 'Advanced',
  },
  {
    title: 'Python',
    level: 70,
    text: 'Profficient',
  },
  {
    title: 'AWS',
    level: 70,
    text: 'Profficient',
  },
  {
    title: 'Java',
    level: 60,
    text: 'Intermidiate',
  },
  {
    title: 'Database',
    level: 50,
    text: 'Intermidiate',
  },
];

const LANG_SKILLS = [
  {
    title: 'English',
    level: 100,
    text: 'Native',
  },
  {
    title: 'Czech',
    level: 100,
    text: 'Native',
  },
  {
    title: 'German',
    level: 70,
    text: 'Fluent',
  },
  {
    title: 'Chinese',
    level: 50,
    text: 'Semi-fluent',
  },
  {
    title: 'Spanish',
    level: 15,
    text: 'Beginner',
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

  onSkillsChange(skillset) {
    this.setState({
      skillset,
      hidden: true,
    });

    setTimeout(this.toggleLevelsOn, 100);
  }

  getSkills() {
    return (this.state.skillset === 'tech') ? TECH_SKILLS : LANG_SKILLS;
  }

  toggleLevelsOn() {
    this.setState({
      hidden: false,
    });
  }

  renderSkills() {
    const { hidden } = this.state;
    return this.getSkills().map(skill => (
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
