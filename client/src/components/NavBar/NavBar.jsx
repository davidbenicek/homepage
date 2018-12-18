import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkLargeUpIcon from 'bpk-component-icon/lg/arrow-up';
import BpkLargeAwardIcon from 'bpk-component-icon/lg/award';
import BpkLargeBusinessIcon from 'bpk-component-icon/lg/business';
import BpkLargeMailIcon from 'bpk-component-icon/lg/mail';
import BpkLargeLandmarkIcon from 'bpk-component-icon/lg/landmark';
import BpkLargeFlaskIcon from 'bpk-component-icon/lg/flask';
import { withButtonAlignment } from 'bpk-component-icon';

// import { styled } from 'styled-components';

import STYLES from './NavBar.scss';

const AlignedBpkLargeUpIcon = withButtonAlignment(BpkLargeUpIcon);
const AlignedBpkLargeBusinessIcon = withButtonAlignment(BpkLargeBusinessIcon);
const AlignedBpkLargeMailIcon = withButtonAlignment(BpkLargeMailIcon);
const AlignedBpkLargeLandmarkIcon = withButtonAlignment(BpkLargeLandmarkIcon);
const AlignedBpkLargeAwardIcon = withButtonAlignment(BpkLargeAwardIcon);
const AlignedBpkLargeFlaskIcon = withButtonAlignment(BpkLargeFlaskIcon);
const c = className => STYLES[className] || 'UNKNOWN';

const NAV_BAR = [
  {
    id: 'top',
    name: 'Top',
    icon: AlignedBpkLargeUpIcon,
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: AlignedBpkLargeAwardIcon,
  },
  {
    id: 'career',
    name: 'Employment',
    icon: AlignedBpkLargeBusinessIcon,
  },
  {
    id: 'education',
    name: 'Education',
    icon: AlignedBpkLargeLandmarkIcon,
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: AlignedBpkLargeFlaskIcon,
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: AlignedBpkLargeMailIcon,
  },
];

class NavBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      attached: props.attached,
    };
    this.interSectionCallback = this.interSectionCallback.bind(this);
  }

  componentDidMount() {
    const options = {
      root: null, // relative to document viewport
      rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 1, // visible amount of item shown in relation to root
    };

    const observer = new IntersectionObserver(this.interSectionCallback, options);
    observer.observe(document.querySelector(`.${c('NavBar__bar')}`));
  }

  interSectionCallback(changes, observer) {
    changes.forEach((change) => {
      if (change.intersectionRatio > 0) {
        if (change.boundingClientRect.y < 0) {
          this.props.attachNavBar(true);
        }
      }
    });
  }

  render() {
    return (
      <BpkGridRow className={`${c('NavBar__bar')} ${this.props.attached ? c('NavBar__barAttached') : ''}`}>
        {NAV_BAR.map(item => (
          <BpkGridColumn onClick={() => { this.props.scrollTo(item.id); }} width={12 / NAV_BAR.length} className={this.props.selected === item.id ? c('NavBar__selected') : c('NavBar__unselected')}>
            <item.icon className={c('NavBar__icon')} />
            <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
              <BpkText tagName="span" textStyle="base" >{item.name}</BpkText>
            </BpkBreakpoint>
          </BpkGridColumn>
      ))}
      </BpkGridRow>
    );
  }
}

NavBar.propTypes = {
  selected: PropTypes.string,
  scrollTo: PropTypes.func,
  detached: PropTypes.bool,
  attachNavBar: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  selected: 'top',
  attached: false,
};

export default NavBar;
