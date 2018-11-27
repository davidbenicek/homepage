import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
// import { styled } from 'styled-components';

import hero from './hero.jpg'
import STYLES from './Hero.scss';
const c = className => STYLES[className] || 'UNKNOWN';

class Hero extends React.Component {
  render() {
    return (
        <BpkGridRow className={c('Hero__box')}>
          <BpkGridColumn width={6} className={c('Hero__left')}>
            <div className={c('Hero__textContainer')}>
              <BpkText tagName="h1" textStyle="xxl" className={c('Hero__heading')}>David Beníček</BpkText>
              <BpkText tagName="h2" textStyle="xl" className={c('Hero__subheading')}>Software Engineer at Skyscanner</BpkText>
            </div>
          </BpkGridColumn>
          <BpkGridColumn width={6} className={c('Hero__right')}>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}
export default Hero;
