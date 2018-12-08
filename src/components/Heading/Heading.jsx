import React from 'react';
import PropTypes from 'prop-types';
import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';
import BpkCard from 'bpk-component-card';
import styled from 'styled-components';
import BpkLink from 'bpk-component-link';

import STYLES from './Heading.scss';
const c = className => STYLES[className] || 'UNKNOWN';


class Heading extends React.Component {
  constructor(props) {
    super();
    this.interSectionCallback = this.interSectionCallback.bind(this);

  }
  componentDidMount() {
    let options = {
      root: null, // relative to document viewport 
      rootMargin: '-200px', // margin around root. Values are similar to css property. Unitless values not allowed
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
      text,
      show,
      onIntersection,
    } = this.props;
    return (
        <BpkGridRow id={id} className={c('Heading__row')} padded={false}>
          {show ? <BpkText tagName="h2" textStyle="xl" >{text}</BpkText> : <span />}
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
