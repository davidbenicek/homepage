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

import STYLES from './Contact.scss';
const c = className => STYLES[className] || 'UNKNOWN';

const CONTACT = [
  {
    name: 'LinkedIn',
    linkText: 'linkedin.com/in/benicek',
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
    name: 'Smoke Signal',
    linkText: 'Two puff signals',
    url: 'https://adventure.howstuffworks.com/survival/wilderness/how-to-send-smoke-signal1.htm',
    logo: 'https://s3.eu-central-1.amazonaws.com/benicek/homepage/smoke.svg',
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
]

class Contact extends React.Component {
  renderContactOption() {
    return CONTACT.map((contact, i) => (
      <BpkGridColumn width={2} offset={i===0 ? 1 : 0} mobileWidth={12} mobileOffset={0} className={c('Contact__optionBox')}>
        <img className={c('Contact__logo')} src={contact.logo} alt={contact.name} />
        <BpkText tagName="h3" textStyle="lg" >{contact.name}</BpkText>
        <BpkLink blank href={contact.url}>{contact.linkText}</BpkLink>
      </BpkGridColumn>
    ))
  }
  render() {
    return (
        <BpkGridRow className={c('Contact__row')}>
          <BpkGridColumn width={12} >
            <BpkGridRow className={c('Contact__blurb')}>
              <BpkText tagName="h2" textStyle="xl" >Do you like what you see? Are you finding one of my creations useful? Just want a chat?</BpkText>
              <BpkText tagName="h2" textStyle="lg" className={c('Contact__reachOut')}>Reach out via any of these methods:</BpkText>
            </BpkGridRow>            
            <BpkGridRow className={c('Contact__options')}>
              {this.renderContactOption()}
            </BpkGridRow>
            <BpkGridRow className={c('Contact__footer')}>
              <BpkText tagName="p" textStyle="base" className={c('Contact__thanks')}>Thank you for making it all the way down here!</BpkText>
              <BpkButton secondary className={c('Contact__buttonUp')}>
                <AlignedBpkLargeUpIcon/>
                <BpkText tagName="p" textStyle="base" onClick={() => {this.props.scrollUp('top')}}>Back to the top</BpkText>
              </BpkButton>
            </BpkGridRow>
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}

Contact.propTypes = {
  scrollUp: PropTypes.func.isRequired,
};

export default Contact;
