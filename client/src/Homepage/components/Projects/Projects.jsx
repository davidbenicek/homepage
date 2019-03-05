import React from 'react';
import Slider from 'react-slick';
import BpkButton from 'bpk-component-button';
import BpkText from 'bpk-component-text';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import styled from 'styled-components';

import STYLES from './Projects.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const PROJECTS = [
  {
    name: 'KanHanZi',
    tagLine: 'Learn, practice and test your Chinese characters online',
    work: false,
    url: '/kanhanzi',
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
    name: '...and many other small projects that never made it live',
    tagLine: 'see some examples on my personal GitHub!',
    work: false,
    url: 'https://github.com/davidbenicek/',
    logo: 'https://image.flaticon.com/icons/png/512/25/25231.png',
    background: 'rgb(1,178,214)',
  },
];

class Projects extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  renderProjects() {
    return PROJECTS.map((proj) => {
      const ProjectLogo = styled.div`
        background: url('${proj.logo}') no-repeat center;
        background-size: contain;
        height: 120px;
        width: 250px;
        margin: auto;
      `;
      return (
        <div className={c('Projects__tile')}>
          <a href={proj.url} rel="noopener noreferrer" target="_blank" >
            <ProjectLogo />
          </a>
          <BpkText tagName="h3" textStyle="xl" className={c('Projects__name')}>{proj.name}</BpkText>
          {proj.work ? <BpkText tagName="p" textStyle="xs" className={c('Projects__work')}>*A team effort from my time at Skyscanner</BpkText> : ''}
          <BpkText tagName="p" textStyle="base" className={c('Projects__tagLine')}>{proj.tagLine}</BpkText>
          <BpkButton secondary className={c('Projects__checkItOut')}>Check it out</BpkButton>
        </div>
      );
    });
  }
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    const mobileSettings = {
      ...settings,
      slidesToShow: 1,
    };
    return (
      <BpkGridRow className={c('Projects__row')}>
        <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
          <Slider {...settings} className={c('Projects__carousel')}>
            {this.renderProjects()}
          </Slider>
        </BpkBreakpoint>
        <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
          <Slider {...mobileSettings} className={c('Projects__carousel')}>
            {this.renderProjects()}
          </Slider>
        </BpkBreakpoint>
      </BpkGridRow>
    );
  }
}
export default Projects;
