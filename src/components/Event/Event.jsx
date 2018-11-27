import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import STYLES from './Event.scss';
const c = className => STYLES[className] || 'UNKNOWN';

class Event extends React.Component {
  render() {
    return (
        <BpkGridRow className={c('Event__row')}>
          <BpkGridColumn width={12} >
            <BpkGridRow className={c('Event__banner')}>
            </BpkGridRow>
            <BpkGridRow className={c('Event__content')}>
              <BpkGridColumn width={12} className={c('Event__left')}>
                <BpkGridRow>
                  <BpkGridColumn width={3} className={c('Event__left')}>
                    <BpkText tagName="p" textStyle="lg" className={c('Event__org')}>Skyscanner</BpkText>
                  </BpkGridColumn>
                  <BpkGridColumn width={6} className={c('Event__left')}>
                  <BpkText tagName="p" textStyle="lg" className={c('Event__role')}>Software Engineer</BpkText>
                  </BpkGridColumn>
                  <BpkGridColumn width={3} className={c('Event__left')}>
                    <BpkText tagName="p" textStyle="lg" className={c('Event__time')}>June 2016 - Present</BpkText>
                  </BpkGridColumn>
                </BpkGridRow>
                <BpkGridRow className={c('Event__textArea')}>
                <BpkText tagName="p" textStyle="base" className={c('Event__description')}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </BpkText>
                </BpkGridRow>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}
export default Event;
