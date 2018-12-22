import React from 'react';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import styled from 'styled-components';

import STYLES from './Projects.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const PROJECTS = [
  {
    name: 'KanHanZi',
    tagLine: 'Learn, practice and test your Chinese characters online',
    work: false,
    url: 'https://kanhanzi.herokuapp.com',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/hanyu.png',
    background: 'white',
  },
  {
    name: 'Lorin',
    tagLine: 'A travel chatbot that finds flight, hotels, attractions and tells (terrible) jokes!',
    work: false,
    url: 'https://benicek-travelbot.azurewebsites.net/',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/lorin.png',
    background: '#faefe6',
  },
  {
    name: 'FirstRep',
    tagLine: 'An augmented reality application to help take fitness beginners from their first rep to their goal',
    work: false,
    url: 'https://www.youtube.com/watch?v=s8n0jT1Xb4U',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/firstrep.png',
    background: '#faefe6',
  },
  {
    name: 'Content Labs*',
    tagLine: 'Customisable pages for Skyscanner partners',
    work: true,
    url: 'https://www.skyscanner.net/mp/lufthansa',
    logo: 'https://www.skyscanner.net/sttc/blackbird/opengraph_solid.png',
    background: 'rgb(1,178,214)',
  },
  {
    name: 'Skyscanner Jobs Website*',
    tagLine: 'A place to attract talent and familiarise users with life at Skyscanner',
    work: true,
    url: 'https://www.skyscanner.net/jobs',
    logo: 'https://www.skyscanner.net/sttc/blackbird/opengraph_solid.png',
    background: 'rgb(1,178,214)',
  },
  {
    name: '...and many other small projects and hacks that never made it live',
    tagLine: 'see some examples on my personal GitHub!',
    work: false,
    url: 'https://github.com/davidbenicek/',
    logo: 'https://image.flaticon.com/icons/png/512/25/25231.png',
    background: 'rgb(1,178,214)',
  },
];

class Projects extends React.Component {
  renderProjects() {
    return PROJECTS.map((proj) => {
      const LogoColumn = styled(BpkGridColumn)`
        background: url('${proj.logo}') no-repeat;
        background-size: contain;
        min-height: 70px;
        height: 100%
      `;
      return (<BpkGridRow padded={false} onClick={() => { window.location = proj.url; }} className={c('Projects__card')}>
        <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
          <LogoColumn width={2} />
          <BpkGridColumn width={10}>
            <BpkText tagName="h3" textStyle="xl" className={c('Projects__name')}>{proj.name}</BpkText>
            {proj.work ? <BpkText tagName="p" textStyle="xs" className={c('Projects__work')}>*A team effort from my time at Skyscanner</BpkText> : ''}
            <BpkText tagName="p" textStyle="base" className={c('Projects__tagLine')}>{proj.tagLine}</BpkText>
          </BpkGridColumn>
        </BpkBreakpoint>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          <BpkGridColumn width={12}>
            <BpkGridRow>
              <LogoColumn width={4} />
              <BpkGridColumn width={8}>
                <BpkText tagName="h3" textStyle="base" className={c('Projects__name')}>{proj.name}</BpkText>
              </BpkGridColumn>
            </BpkGridRow>
            <BpkGridRow className={c('Projects__detailRow')}>
              <BpkText tagName="p" textStyle="sm" className={c('Projects__tagLine')}>{proj.tagLine}</BpkText>
            </BpkGridRow>
            {proj.work ? (<BpkGridRow>
              <BpkText tagName="p" textStyle="xs" className={c('Projects__work')}>*A team effort from my time at Skyscanner</BpkText>
            </BpkGridRow>) : ''}
          </BpkGridColumn>
        </BpkBreakpoint>
      </BpkGridRow>);
    });
  }
  render() {
    return (
      <BpkGridRow className={c('Projects__row')}>
        <BpkGridColumn width={12} >
          {this.renderProjects()}
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}
export default Projects;
