import React from 'react';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import STYLES from './Schooling.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const SCHOOLS = [
  {
    name: 'King`s College London',
    degree: 'Msc. Advanced Software Engineering w/ Management',
    grade: 'First Class Degree',
    period: '(Sep. 2017 - Sep. 2018)',
  },
  {
    name: 'Chinese University of Hong Kong',
    degree: 'Year Abroad',
    period: '(Aug. 2014 - Jun. 2015)',
  },
  {
    name: 'University of Glasgow',
    degree: 'Bsc. Business and Management and Computing Science',
    grade: 'First Class Degree',
    period: '(Sep. 2013 - Jun. 2017)',
  },
  {
    name: 'International School of Zug and Switzerland',
    degree: 'International Baccalaureate and Advance Placement courses',
    grade: 'IB: 37/45, 4/5 AP Comp. Sci.',
    period: '(Sep. 2008 - Jun. 2013)',
  },
  {
    name: 'Fudan University, Shangai',
    degree: 'Internationl Summer Session',
    period: '(Jul. 2018 - Aug. 2018)',
  },
];
const MOBILE_SCHOOLS = [
  {
    name: 'King`s College London',
    degree: 'Msc. Advanced Software Engineering w/ Management',
    grade: 'First Class Degree',
    period: '(Sep. 2017 - Sep. 2018)',
  },
  {
    name: 'Fudan University, Shangai',
    degree: 'Internationl Summer Session',
    period: '(Jul. 2018 - Aug. 2018)',
  },
  {
    name: 'University of Glasgow',
    degree: 'Bsc. Business and Management and Computing Science',
    grade: 'First Class Degree',
    period: '(Sep. 2013 - Jun. 2017)',
  },
  {
    name: 'Chinese University of Hong Kong',
    degree: 'Year Abroad',
    period: '(Aug. 2014 - Jun. 2015)',
  },
  {
    name: 'International School of Zug and Switzerland',
    degree: 'International Baccalaureate and Advance Placement courses',
    grade: 'IB: 37/45, 4/5 AP Comp. Sci.',
    period: '(Sep. 2008 - Jun. 2013)',
  },
];

class Schooling extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  getSchools() {
    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    return (width >= 512) ? SCHOOLS : MOBILE_SCHOOLS;
  }
  renderSchoolingOption() {
    return this.getSchools().map(school => (
      <BpkGridColumn width={6} mobileWidth={12} className={c('Schooling__box')}>
        <BpkText tagName="h3" textStyle="lg" >{school.name}</BpkText>
        <BpkText tagName="h4" textStyle="base" >{school.degree}</BpkText>
        {school.grade ? <BpkText tagName="span" textStyle="sm" className={c('Schooling__grade')}>{school.grade}</BpkText> : ''}
        {school.period ? <BpkText tagName="span" textStyle="sm" >{school.period}</BpkText> : ''}
      </BpkGridColumn>
    ));
  }
  render() {
    return (
      <BpkGridRow className={c('Schooling__row')}>
        <BpkGridColumn width={12} >
          <BpkGridRow className={c('Schooling__list')}>
            {this.renderSchoolingOption()}
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

export default Schooling;
