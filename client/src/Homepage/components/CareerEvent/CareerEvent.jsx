import React from "react";
import PropTypes from "prop-types";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import BpkText from "bpk-component-text";
import styled from "styled-components";

import STYLES from "./CareerEvent.scss";

const c = className => STYLES[className] || "UNKNOWN";

class CareerEvent extends React.Component {
  renderBulletPoints() {
    return this.props.text.map(bullet => (
      <li className={c("CareerEvent__description")}>{bullet}</li>
    ));
  }
  render() {
    const { bannerImage, organisation, position, dates } = this.props;
    const Banner = styled(BpkGridRow)`
      background: linear-gradient(45deg, rgba(191,117,135,0.639) 0%, rgba(214,255,255,0.631) 100%), url('${bannerImage}') center;
      background-size: cover;
    `;
    return (
      <BpkGridRow
        className={
          this.props.visible
            ? c("CareerEvent__visible")
            : c("CareerEvent__invisible")
        }
      >
        <BpkGridColumn width={12}>
          <Banner className={c("CareerEvent__banner")} />
          <BpkGridRow className={c("CareerEvent__content")}>
            <BpkGridColumn width={12}>
              <BpkGridRow>
                <BpkGridColumn width={4} mobileWidth={12}>
                  <BpkText
                    tagName="p"
                    textStyle="lg"
                    className={c("CareerEvent__org")}
                  >
                    {organisation}
                  </BpkText>
                </BpkGridColumn>
                <BpkGridColumn width={4} mobileWidth={12}>
                  <BpkText
                    tagName="p"
                    textStyle="lg"
                    className={c("CareerEvent__role")}
                  >
                    {position}
                  </BpkText>
                </BpkGridColumn>
                <BpkGridColumn width={4} mobileWidth={12}>
                  <BpkText
                    tagName="p"
                    textStyle="lg"
                    className={c("CareerEvent__time")}
                  >
                    {dates}
                  </BpkText>
                </BpkGridColumn>
              </BpkGridRow>
              <BpkGridRow className={c("CareerEvent__textArea")}>
                {this.renderBulletPoints()}
              </BpkGridRow>
            </BpkGridColumn>
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

CareerEvent.propTypes = {
  bannerImage: PropTypes.string.isRequired,
  organisation: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CareerEvent;
