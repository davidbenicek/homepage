
import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';

import STYLES from './Intro.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Intro = props => (
  <BpkGridRow className={c('Intro__row')}>
    <BpkText tagName="p" textStyle="xl" className={c('Intro__welcome')}>Hey there!</BpkText>
    <span className={c('Intro__line')} />
    <BpkText tagName="p" textStyle="base" className={c('Intro__subtitle')}>I'm David, originally from the Czech Republic but currently living in Barcelona. I'm a software engineer, passionate traveller and I love to learn and experience new things. Welcome to my personal website, which serves as an online CV, mini porfolio and most of all, a fun project for me to work on. Thanks for coming here and feel free to get in touch, there's plenty of options in the <BpkButton link className={c('Intro__contact')} onClick={() => { props.scrollTo('contact', 'start'); }}>contact section</BpkButton>.</BpkText>
  </BpkGridRow>
);

Intro.propTypes = {
  scrollTo: PropTypes.func.isRequired,
};

export default Intro;
