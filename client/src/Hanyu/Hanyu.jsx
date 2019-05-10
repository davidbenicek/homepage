
import React from 'react';
import styled from 'styled-components';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';
import { ALERT_TYPES, withBannerAlertState, BpkBannerAlertExpandable } from 'bpk-component-banner-alert';

// Internal imports
import ExerciseArea from './components/ExerciseArea';

import STYLES from './Hanyu.scss';

const BannerAlertExpandableState = withBannerAlertState(BpkBannerAlertExpandable);
const AlignedRightIcon = withButtonAlignment(BpkLongArrowRightIcon);

const c = className => STYLES[className] || 'UNKNOWN';
const StyledHeader = styled.header`
  background: url(https://s3.eu-central-1.amazonaws.com/benicek/kanhanzi/hero.jpg) center;
  background-size: cover;
`;

const Hanyu = () => (
  <div className={c('Hanyu')}>
    <StyledHeader className={c('Hanyu__header')}>
      <div className={c('Hanyu__header-inner')}>
        <BpkText tagName="h1" textStyle="xxl" className={c('Hanyu__heading')}>实践你的汉语</BpkText>
      </div>
    </StyledHeader>
    <main className={c('Hanyu__main')}>
      <BannerAlertExpandableState
        message="First time here? Find out how to use this page!"
        type={ALERT_TYPES.NEUTRAL}
        toggleButtonLabel="View more"
        className={c('Hanyu__info')}
      >
        <BpkText tagName="p" className={c('Hanyu__text')}>
          👆Click to turn the cards over
        </BpkText>
        <BpkText tagName="p" className={c('Hanyu__text')}>
          👀Hover over the blacked out box to find out the English translation!
        </BpkText>
        <BpkText tagName="p" className={c('Hanyu__text')}>
          🔀Change HSK levels with the checkboxes bellow ✅
        </BpkText>
        <BpkText tagName="p" className={c('Hanyu__text')}>
          🤔 Don't understand a card? See examples of usage at the bottom 👇
        </BpkText>
        <BpkText tagName="p" className={c('Hanyu__text')}>
          🤔 See something broken? <a href="mailto:davidbenicek@hotmail.com">Get in touch</a> 💌
        </BpkText>
      </BannerAlertExpandableState>
      <ExerciseArea />
      <BpkButton secondary href="https://www.beni.tech/" >See more of my work&nbsp;<AlignedRightIcon /></BpkButton>
    </main>
  </div>);

export default Hanyu;
