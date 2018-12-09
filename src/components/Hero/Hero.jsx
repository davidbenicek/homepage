import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkLargeChevrovIcon from 'bpk-component-icon/lg/chevron-down';

// import { styled } from 'styled-components';

import hero from './hero.jpg'
import STYLES from './Hero.scss';
const c = className => STYLES[className] || 'UNKNOWN';

class Hero extends React.Component {
  constructor(){
    super();
    this.interSectionCallback = this.interSectionCallback.bind(this);
  }

  componentDidMount() {
    let options = {
      root: null, // relative to document viewport 
      rootMargin: '-100px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.5 // visible amount of item shown in relation to root
    };
    
    let observer = new IntersectionObserver(this.interSectionCallback, options);
    observer.observe(document.querySelector(`.${c('Hero__box')}`));
  }

  interSectionCallback(changes, observer) {
    changes.forEach(change => {
        if (change.intersectionRatio > 0.5) {
            this.props.attachNavBar(false)
            this.props.changeSelected('top');
          }
    });
  }

  renderHeroImage() {
    return (<BpkGridColumn width={6} mobileWidth={12} className={c('Hero__imageBlock')} />);
  }

  renderHeroText() {
    return (
      <BpkGridColumn width={6} mobileWidth={12} className={c('Hero__textBlock')}>
        <div className={c('Hero__textContainer')}>
          <BpkText tagName="h1" textStyle="xxl" className={c('Hero__heading')}>David Beníček</BpkText>
          <BpkText tagName="h2" textStyle="xl" className={c('Hero__subheading')}>Software Engineer at Skyscanner</BpkText>
          <div className={c('Hero__more')} onClick={()=> {this.props.scrollTo('career')}}>
            <BpkText tagName="p" textStyle="base" >Find out more</BpkText>
            <BpkLargeChevrovIcon className={c('Hero__chevron')} />
          </div>
        </div>
      </BpkGridColumn>
    );
  }
  render() {
    return (
        <BpkGridRow id="top" className={c('Hero__box')}>
          <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
            {this.renderHeroText()}
            {this.renderHeroImage()}
          </BpkBreakpoint>
          <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
            {this.renderHeroImage()}
            {this.renderHeroText()}
          </BpkBreakpoint>
        </BpkGridRow>
    );
  }
}

Hero.propTypes = {
  attachNavBar: PropTypes.func.isRequired,
  changeSelected: PropTypes.func.isRequired,
  scrollTo: PropTypes.func.isRequired,
};

export default Hero;
