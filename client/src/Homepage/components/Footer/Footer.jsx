import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLargeUpIcon from 'bpk-component-icon/lg/arrow-up';

import { withButtonAlignment } from 'bpk-component-icon';

import STYLES from './Footer.scss';

const AlignedBpkLargeUpIcon = withButtonAlignment(BpkLargeUpIcon);
const c = className => STYLES[className] || 'UNKNOWN';


const Footer = props => (
  <BpkGridRow className={c('Footer__row')}>
    <BpkText tagName="p" textStyle="base" className={c('Footer__thanks')}>Thank you for making it all the way down here - you are awesome!</BpkText>
    <BpkButton secondary className={c('Footer__buttonUp')}>
      <AlignedBpkLargeUpIcon />
      <BpkText tagName="p" textStyle="base" onClick={() => { props.scrollUp('top'); }}>Back to the top</BpkText>
    </BpkButton>
  </BpkGridRow>
);

Footer.propTypes = {
  scrollUp: PropTypes.func.isRequired,
};

export default Footer;