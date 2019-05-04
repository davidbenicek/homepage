import React from "react";
import PropTypes from "prop-types";
import { BpkGridRow } from "bpk-component-grid";
import BpkText from "bpk-component-text";

import { HEADINGS } from "../../data";

import STYLES from "./Heading.scss";

const c = className => STYLES[className] || "UNKNOWN";

class Heading extends React.Component {
  constructor() {
    super();
    this.interSectionCallback = this.interSectionCallback.bind(this);
  }
  componentDidMount() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const offset = width >= 512 ? 200 : 0;
    const options = {
      root: null, // relative to document viewport
      rootMargin: `${offset}px`, // margin around root. Values are similar to css property. Unitless values not allowed
      threshold: 0.8 // visible amount of item shown in relation to root
    };

    const observer = new IntersectionObserver(
      this.interSectionCallback,
      options
    );
    const { target, id } = this.props;
    observer.observe(document.querySelector(`#${id}`));
  }

  interSectionCallback(changes) {
    const { id, target } = this.props;
    changes.forEach(change => {
      if (change.intersectionRatio > 0.8) {
        this.props.onIntersection(id);
      }
    });
  }

  render() {
    const { id, target, show } = this.props;
    const { Icon, name } = HEADINGS[target || id];
    return (
      <BpkGridRow
        id={id}
        className={`
          ${c("Heading__row")}
          ${
            this.props.visible ? c("Heading__visible") : c("Heading__invisible")
          }
        `}
        padded={false}
      >
        {show ? (
          <BpkText tagName="h2" textStyle="xl">
            <Icon className={c("Heading__icon")} />
            {name}
          </BpkText>
        ) : (
          <span />
        )}
      </BpkGridRow>
    );
  }
}

Heading.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onIntersection: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Heading;
