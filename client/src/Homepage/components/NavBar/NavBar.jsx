import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';

import { NAV_BAR } from '../../data';

import STYLES from './NavBar.scss';

const c = className => STYLES[className] || 'UNKNOWN';

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends React.Component {
  render() {
    return (
      <BpkGridRow className={c('NavBar__bar')}>
        {NAV_BAR.map(item => (
          <BpkGridColumn
            onClick={() => {
              this.props.scrollTo(item.id);
            }}
            width={12 / NAV_BAR.length}
            className={
              this.props.selected.indexOf(item.id) > -1
                ? c('NavBar__selected')
                : c('NavBar__unselected')
            }
          >
            <item.icon className={c('NavBar__icon')} />
            <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
              <BpkText tagName="span" textStyle="base">
                {item.name}
              </BpkText>
            </BpkBreakpoint>
          </BpkGridColumn>
        ))}
      </BpkGridRow>
    );
  }
}

NavBar.propTypes = {
  selected: PropTypes.string,
  scrollTo: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  selected: 'top',
};

export default NavBar;
