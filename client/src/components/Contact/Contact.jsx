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

import STYLES from './Contact.scss';

const AlignedBpkLargeUpIcon = withButtonAlignment(BpkLargeUpIcon);
const c = className => STYLES[className] || 'UNKNOWN';

const CONTACT = [
  {
    name: 'LinkedIn',
    linkText: '/in/benicek',
    url: 'https://www.linkedin.com/in/benicek',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/linkedin.svg',
  },
  {
    name: 'Instagram',
    linkText: '@benixek',
    url: 'https://www.instagram.com/benixek/',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/instagram.svg',
  },
  {
    name: 'Twitter',
    linkText: '@benixek',
    url: 'https://twitter.com/benixek',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/twitter.svg',
  },
  {
    name: 'Email',
    linkText: 'davidbenicek@hotmail.com',
    url: 'mailto:davidbenicek@hotmail.com',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/email.svg',
  },
  {
    name: 'Smoke Signal',
    linkText: 'Two puff signals',
    url: 'https://adventure.howstuffworks.com/survival/wilderness/how-to-send-smoke-signal1.htm',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/smoke.svg',
  },
];

class Contact extends React.Component {
  renderContactOption() {
    return CONTACT.map((contact, i) => (
      <BpkGridColumn
        width={2}
        offset={i === 0 ? 1 : 0}
        mobileWidth={12}
        mobileOffset={0}
        className={c('Contact__optionBox')}
        onClick={() => { window.location = contact.url; }}
      >
        <img className={c('Contact__logo')} src={contact.logo} alt={contact.name} />
        <BpkText tagName="h3" textStyle="lg" >{contact.name}</BpkText>
        <BpkLink blank href={contact.url} className={c('Contact__link')}>{contact.linkText}</BpkLink>
      </BpkGridColumn>
    ));
  }
  render() {
    return (
      <BpkGridRow className={c('Contact__row')}>
        <BpkGridColumn width={12} >
          <BpkGridRow className={c('Contact__blurb')}>
            <BpkText tagName="h2" textStyle="xl" className={c('Contact__prompt')}>Do you like what you see?<br />Are you finding one of my creations useful?<br />Just want a chat?</BpkText>
            <BpkText tagName="h2" textStyle="lg" className={c('Contact__reachOut')}>Reach out via these methods:</BpkText>
          </BpkGridRow>
          <BpkGridRow className={c('Contact__options')}>
            {this.renderContactOption()}
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

export default Contact;
