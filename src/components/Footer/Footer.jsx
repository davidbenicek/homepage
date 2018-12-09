import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import styled from 'styled-components';
import BpkLink from 'bpk-component-link';
import BpkButton from 'bpk-component-button';
import BpkLargeUpIcon from 'bpk-component-icon/lg/arrow-up';

import { withButtonAlignment } from 'bpk-component-icon';

const AlignedBpkLargeUpIcon = withButtonAlignment(BpkLargeUpIcon);

import STYLES from './Footer.scss';
const c = className => STYLES[className] || 'UNKNOWN';


class Footer extends React.Component {
  render() {
    return (
        <BpkGridRow className={c('Footer__row')}>
          <BpkText tagName="p" textStyle="base" className={c('Footer__thanks')}>Thank you for making it all the way down here - you're awesome!</BpkText>
          <BpkButton secondary className={c('Footer__buttonUp')}>
            <AlignedBpkLargeUpIcon/>
            <BpkText tagName="p" textStyle="base" onClick={() => {this.props.scrollUp('top')}}>Back to the top</BpkText>
          </BpkButton>
          <BpkText tagName="p" textStyle="base" className={c('Footer__credits')}>Made using <BpkLink href='https://backpack.github.io'>Backpack</BpkLink></BpkText>
        </BpkGridRow>
    );
  }
}

Footer.propTypes = {
  scrollUp: PropTypes.func.isRequired,
};

export default Footer;
