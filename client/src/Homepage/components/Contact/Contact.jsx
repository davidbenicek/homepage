import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkLink from 'bpk-component-link';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import STYLES from './Contact.scss';

import { CONTACT } from '../../data/contact';

const c = className => STYLES[className] || 'UNKNOWN';

class Contact extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  renderContactOption(mobile) {
    return CONTACT.map((contact, i) => (
      mobile && contact.hideOnMobile ?
        ''
        :
        <BpkGridColumn
          width={2}
          offset={i === 0 ? 1 : 0}
          mobileWidth={6}
          mobileOffset={0}
          className={c('Contact__optionBox')}
          onClick={() => {
            window.location = contact.url;
          }}
        >
          <img
            className={c('Contact__logo')}
            src={contact.logo}
            alt={contact.name}
          />
          <BpkText tagName="h3" textStyle="lg">
            {contact.name}
          </BpkText>
          <BpkLink blank href={contact.url} className={c('Contact__link')}>
            {contact.linkText}
          </BpkLink>
        </BpkGridColumn>
    ));
  }
  render() {
    return (
      <BpkGridRow
        className={`
          ${c('Contact__row')}
          ${
          this.props.visible ? c('Contact__visible') : c('Contact__invisible')
          }
        `}
      >
        <BpkGridColumn width={12}>
          <BpkGridRow className={c('Contact__blurb')}>
            <BpkText
              tagName="h2"
              textStyle="xl"
              className={c('Contact__prompt')}
            >
              Do you like what you see?
              <br />
              Are you finding one of my creations useful?
              <br />
              Just want a chat?
            </BpkText>
            <BpkText
              tagName="h2"
              textStyle="lg"
              className={c('Contact__reachOut')}
            >
              Reach out via these methods:
            </BpkText>
          </BpkGridRow>
          <BpkGridRow className={c('Contact__options')}>
            <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
              {this.renderContactOption(true)}
            </BpkBreakpoint>
            <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
              {this.renderContactOption(false)}
            </BpkBreakpoint>
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

Contact.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Contact;
