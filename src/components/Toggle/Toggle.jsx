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

import STYLES from './Toggle.scss';
const c = className => STYLES[className] || 'UNKNOWN';



class Toggle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      checkedId: props.defaultId,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checkedId) {
    this.props.onChange(checkedId);
    this.setState({
      checkedId
    });
  }
  render() {
    const {
      option1,
      option2,
    } = this.props;
  
    const { checkedId } = this.state
    return (
        <BpkGridRow className={c('Toggle__row')}>
          <BpkGridColumn width={3} offset={3}
              className={`${c('Toggle__option')} ${(checkedId === option1.id) ? c('Toggle__selected') : ''}`}
              onClick={() => this.handleChange(option1.id)}
          >
            {option1.text}
          </BpkGridColumn>
          <BpkGridColumn width={3}
            className={`${c('Toggle__option')} ${(checkedId === option2.id) ? c('Toggle__selected') : ''}`}
            onClick={() => this.handleChange(option2.id)}
          >
            {option2.text}
          </BpkGridColumn>
        </BpkGridRow>
    );
  }
}
const option = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
})

Toggle.propTypes = {
  defaultId: PropTypes.string.isRequired,
  option1: option.isRequired,
  option2: option.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Toggle;
