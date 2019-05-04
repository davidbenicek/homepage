import React from "react";
import PropTypes from "prop-types";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import BpkText from "bpk-component-text";

import STYLES from "./Schooling.scss";

const c = className => STYLES[className] || "UNKNOWN";

import { SCHOOLS, MOBILE_SCHOOLS } from "../../data/schools";

class Schooling extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  getSchools() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    return width >= 512 ? SCHOOLS : MOBILE_SCHOOLS;
  }
  renderSchoolingOption() {
    return this.getSchools().map(school => (
      <BpkGridColumn width={6} mobileWidth={12} className={c("Schooling__box")}>
        <BpkText tagName="h3" textStyle="lg">
          {school.name}
        </BpkText>
        <BpkText tagName="h4" textStyle="base">
          {school.degree}
        </BpkText>
        {school.grade ? (
          <BpkText
            tagName="span"
            textStyle="sm"
            className={c("Schooling__grade")}
          >
            {school.grade}
          </BpkText>
        ) : (
          ""
        )}
        {school.period ? (
          <BpkText tagName="span" textStyle="sm">
            {school.period}
          </BpkText>
        ) : (
          ""
        )}
      </BpkGridColumn>
    ));
  }
  render() {
    return (
      <BpkGridRow
        className={`
          ${c("Schooling__row")}
          ${
            this.props.visible
              ? c("Schooling__visible")
              : c("Schooling__invisible")
          }
        `}
      >
        <BpkGridColumn width={12}>
          <BpkGridRow className={c("Schooling__list")}>
            {this.renderSchoolingOption()}
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

Schooling.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default Schooling;
