import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import styled from 'styled-components';

import STYLES from './CareerEvent.scss';
const c = className => STYLES[className] || 'UNKNOWN';

class CareerEvent extends React.Component {
  render() {
    const {
      sectionTitle,
      bannerImage,
      organisation,
      position,
      dates,
      text,
    } = this.props;
    const Banner = styled(BpkGridRow)`
      background: linear-gradient(45deg, rgba(191,117,135,0.639) 0%, rgba(214,255,255,0.631) 100%), url('${bannerImage}') center;
      background-size: cover;
    `
    return (
        <BpkGridRow className={c('CareerEvent__row')}>
          <BpkGridColumn width={12} >
            <Banner className={c('CareerEvent__banner')} />
            <BpkGridRow className={c('CareerEvent__content')}>
              <BpkGridColumn width={12} className={c('CareerEvent__left')}>
                <BpkGridRow>
                  <BpkGridColumn width={4} className={c('CareerEvent__left')}>
                    <BpkText tagName="p" textStyle="lg" className={c('CareerEvent__org')}>{organisation}</BpkText>
                  </BpkGridColumn>
                  <BpkGridColumn width={4} className={c('CareerEvent__left')}>
                  <BpkText tagName="p" textStyle="lg" className={c('CareerEvent__role')}>{position}</BpkText>
                  </BpkGridColumn>
                  <BpkGridColumn width={4} className={c('CareerEvent__left')}>
                    <BpkText tagName="p" textStyle="lg" className={c('CareerEvent__time')}>{dates}</BpkText>
                  </BpkGridColumn>
                </BpkGridRow>
                <BpkGridRow className={c('CareerEvent__textArea')}>
                <BpkText tagName="p" textStyle="base" className={c('CareerEvent__description')}>
                  {text}
                </BpkText>
                </BpkGridRow>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}

CareerEvent.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  bannerImage: PropTypes.string.isRequired,
  organisation: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CareerEvent;
