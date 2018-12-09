import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import styled from 'styled-components';
import BpkLink from 'bpk-component-link';
import BpkLargeAwardIcon from 'bpk-component-icon/lg/award';
import BpkLargeBusinessIcon from 'bpk-component-icon/lg/business';
import BpkLargeMailIcon from 'bpk-component-icon/lg/mail';
import BpkLargeLandmarkIcon from 'bpk-component-icon/lg/landmark';
import BpkLargeFlaskIcon from 'bpk-component-icon/lg/flask';
import { withButtonAlignment } from 'bpk-component-icon';



import STYLES from './Heading.scss';
const c = className => STYLES[className] || 'UNKNOWN';

const HEADINGS = {
  'skills': {
    name: 'Skills',
    Icon: BpkLargeAwardIcon,
  },
  'career': {
    name: 'Employement',
    Icon: BpkLargeBusinessIcon,
  },
  'education': {
    name: 'Education',
    Icon: BpkLargeLandmarkIcon,
  },
  'projects': {
    name: 'Projects',
    Icon: BpkLargeFlaskIcon,
  },
  'contact': {
    name: 'Contact',
    Icon: BpkLargeMailIcon,
  },
}

class Heading extends React.Component {
  constructor(props) {
    super();
    this.interSectionCallback = this.interSectionCallback.bind(this);

  }
  componentDidMount() {
    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    const offset = (width >= 512) ? 200 : 0;
    let options = {
      root: null, // relative to document viewport 
      rootMargin: `${offset}px`, // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.8 // visible amount of item shown in relation to root
    };
     
    let observer = new IntersectionObserver(this.interSectionCallback, options);
    observer.observe(document.querySelector(`#${this.props.id}`));
  }

  interSectionCallback(changes, observer) {
    const {
      id,
    } = this.props;
    changes.forEach(change => {
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
    console.log('id', id);
    console.log('id', HEADINGS);
    console.log('id', HEADINGS[id]);
    const {Icon, name} = HEADINGS[id]
    return (
        <BpkGridRow id={id} className={c('Heading__row')} padded={false}>
          {show ? (<BpkText tagName="h2" textStyle="xl" ><Icon className={c('Heading__icon')}/>{name}</BpkText>) : <span />}
        </BpkGridRow>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onIntersection: PropTypes.func.isRequired,
};

export default Heading;
