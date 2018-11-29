import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
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
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.01 // visible amount of item shown in relation to root
    };
    
    let observer = new IntersectionObserver(this.interSectionCallback, options);
    observer.observe(document.querySelector(`.${c('Hero__box')}`));
  }

  interSectionCallback(changes, observer) {
    changes.forEach(change => {
        if (change.intersectionRatio > 0) {
            this.props.attachNavBar(false)
            this.props.changeSelected('top');
          }
    });
  }
  render() {
    return (
        <BpkGridRow className={c('Hero__box')}>
          <BpkGridColumn width={6} className={c('Hero__left')}>
            <div className={c('Hero__textContainer')}>
              <BpkText tagName="h1" textStyle="xxl" className={c('Hero__heading')}>David Beníček</BpkText>
              <BpkText tagName="h2" textStyle="xl" className={c('Hero__subheading')}>Software Engineer at Skyscanner</BpkText>
              <div className={c('Hero__more')}>
                <BpkText tagName="p" textStyle="md" >Find out more</BpkText>
                <BpkLargeChevrovIcon className={c('Hero__chevron')} />
              </div>
            </div>
          </BpkGridColumn>
          <BpkGridColumn width={6} className={c('Hero__right')}>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}

Hero.propTypes = {
  attachNavBar: PropTypes.func.isRequired,
  changeSelected: PropTypes.func.isRequired,
};

export default Hero;
