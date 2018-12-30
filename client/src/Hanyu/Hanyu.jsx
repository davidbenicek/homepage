
import React from 'react';
import styled from 'styled-components';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';

// Internal imports
import ExerciseArea from './components/ExerciseArea';

import STYLES from './Hanyu.scss';

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
      <BpkText tagName="p" className={c('Hanyu__text')}>
        Click to turn the card over and then hover the blacked out box to find out the English translation!
      </BpkText>
      <BpkText tagName="p" className={c('Hanyu__text')}>
        Change HSK levels with the checkboxes bellow
      </BpkText>
      <BpkText tagName="p" className={c('Hanyu__text')}>
        Need a hint? Check out the examples
      </BpkText>
      <ExerciseArea />
      <BpkButton secondary href="https://www.beni.tech/" >See more of my work&nbsp;<AlignedRightIcon /></BpkButton>
    </main>
  </div>);

export default Hanyu;
