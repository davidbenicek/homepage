import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkLargeAwardIcon from 'bpk-component-icon/lg/award';
import BpkLargeBusinessIcon from 'bpk-component-icon/lg/business';
import BpkLargeMailIcon from 'bpk-component-icon/lg/mail';
import BpkLargeLandmarkIcon from 'bpk-component-icon/lg/landmark';
import BpkLargeFlaskIcon from 'bpk-component-icon/lg/flask';

import STYLES from './Heading.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const HEADINGS = {
  skills: {
    name: 'Skills',
    Icon: BpkLargeAwardIcon,
  },
  career: {
    name: 'Employment',
    Icon: BpkLargeBusinessIcon,
  },
  education: {
    name: 'Education',
    Icon: BpkLargeLandmarkIcon,
  },
  projects: {
    name: 'Projects',
    Icon: BpkLargeFlaskIcon,
  },
  contact: {
    name: 'Contact',
    Icon: BpkLargeMailIcon,
  },
};

class Heading extends React.Component {
  constructor() {
    super();
    this.interSectionCallback = this.interSectionCallback.bind(this);
  }
  componentDidMount() {
    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    const offset = (width >= 512) ? 200 : 0;
    const options = {
      root: null, // relative to document viewport
      rootMargin: `${offset}px`, // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.8, // visible amount of item shown in relation to root
    };

    const observer = new IntersectionObserver(this.interSectionCallback, options);
    observer.observe(document.querySelector(`#${this.props.id}`));
  }

  interSectionCallback(changes) {
    const {
      id,
    } = this.props;
    changes.forEach((change) => {
      if (change.intersectionRatio > 0.8) {
        this.props.onIntersection(id);
      }
    });
  }


  render() {
    const {
      id,
      show,
    } = this.props;
    const { Icon, name } = HEADINGS[id];
    return (
      <BpkGridRow id={id} className={c('Heading__row')} padded={false}>
        {show ? (<BpkText tagName="h2" textStyle="xl" ><Icon className={c('Heading__icon')} />{name}</BpkText>) : <span />}
      </BpkGridRow>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onIntersection: PropTypes.func.isRequired,
};

export default Heading;
