import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLabel from 'bpk-component-label';
import BpkBadge, { BADGE_TYPES } from 'bpk-component-badge';
import BpkLargeBusinessIcon from 'bpk-component-icon/lg/information-circle';
import BpkTooltip from 'bpk-component-tooltip';
import Skills from '../Skills';

import { TECH_SKILLS } from '../../data';

import STYLES from './Profile.scss';

const c = className => className || 'UNKNOWN';

const Profile = props => (
  <BpkGridRow
    className={`
          ${c('Profile__row')}
          ${
      props.visible ? c('Profile__visible') : c('Profile__invisible')
      }
        `}
    padded={false}
  >
    <BpkGridColumn width={6} mobileWidth={12}>
      <BpkLabel htmlFor="name">Who are you?</BpkLabel>
      <BpkText tagName="p" textStyle="base" id="name">
        David Beníček
      </BpkText>
      <BpkLabel htmlFor="employment">What are you doing now?</BpkLabel>
      <BpkText tagName="p" textStyle="base" id="employment">
        Software Engineer II at Skyscanner
      </BpkText>
      <BpkLabel htmlFor="home">Where's home?</BpkLabel>
      <BpkText tagName="p" textStyle="base" id="home">
        Prague, Czech Republic
      </BpkText>
      <BpkLabel htmlFor="location">Where are you now?</BpkLabel>
      <BpkText tagName="p" textStyle="base" id="location">
        Barcelona, Catalunya
      </BpkText>
      <BpkLabel htmlFor="location">What are your qualifications?</BpkLabel>
      <BpkButton
        link
        className={c('Profile__link')}
        onClick={() => {
          props.scrollTo('education', 'start');
        }}
      >
        See the education section
      </BpkButton>
      <BpkLabel htmlFor="location">What are you looking for?</BpkLabel>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <BpkTooltip
        target={
          <div className={c('Profile__employmentAsterix')}>
            <BpkBadge
              className={c('Profile__employedBadge')}
              type={BADGE_TYPES.success}
              id="location"
            >
              Freelance work
            </BpkBadge>
            <BpkText
              tagName="p"
              textStyle="base"
              bold
              className={c('Profile__employmentAsterix')}
            >
              *
            </BpkText>
          </div>
        }
        id="employmentAsterix"
      >
        I'm open to hear part-time / freelance offers but otherwise
        happily employed 😄
      </BpkTooltip>
      <BpkLabel htmlFor="location">How do I get in touch?</BpkLabel>
      <BpkButton
        link
        className={c('Profile__link')}
        onClick={() => {
          props.scrollTo('contact', 'center');
        }}
      >
        See the contact section
      </BpkButton>
    </BpkGridColumn>
    <Skills />
  </BpkGridRow>
);

Profile.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Profile;
