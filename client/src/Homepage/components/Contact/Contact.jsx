import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkLink from 'bpk-component-link';

import STYLES from './Contact.scss';

import { CONTACT } from '../../data/contact';

const c = className => STYLES[className] || 'UNKNOWN';

class Contact extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  renderContactOption() {
    return CONTACT.map((contact, i) => (
      <BpkGridColumn
        width={2}
        offset={i === 0 ? 1 : 0}
        mobileWidth={12}
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
            {this.renderContactOption()}
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
