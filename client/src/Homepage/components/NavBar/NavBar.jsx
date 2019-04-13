import React from "react";
import PropTypes from "prop-types";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import BpkText from "bpk-component-text";
import BpkBreakpoint, { BREAKPOINTS } from "bpk-component-breakpoint";
import BpkLargeUpIcon from "bpk-component-icon/lg/arrow-up";
import BpkLargeAccountIcon from "bpk-component-icon/lg/account";
import BpkLargeBusinessIcon from "bpk-component-icon/lg/business";
import BpkLargeMailIcon from "bpk-component-icon/lg/mail";
import BpkLargeLandmarkIcon from "bpk-component-icon/lg/landmark";
import BpkLargeFlaskIcon from "bpk-component-icon/lg/flask";
import { withButtonAlignment } from "bpk-component-icon";

import STYLES from "./NavBar.scss";

const AlignedBpkLargeUpIcon = withButtonAlignment(BpkLargeUpIcon);
const AlignedBpkLargeBusinessIcon = withButtonAlignment(BpkLargeBusinessIcon);
const AlignedBpkLargeMailIcon = withButtonAlignment(BpkLargeMailIcon);
const AlignedBpkLargeLandmarkIcon = withButtonAlignment(BpkLargeLandmarkIcon);
const AlignedBpkLargeAccountIcon = withButtonAlignment(BpkLargeAccountIcon);
const AlignedBpkLargeFlaskIcon = withButtonAlignment(BpkLargeFlaskIcon);
const c = className => STYLES[className] || "UNKNOWN";

const NAV_BAR = [
  {
    id: "top",
    name: "Top",
    icon: AlignedBpkLargeUpIcon
  },
  {
    id: "profile",
    name: "Profile",
    icon: AlignedBpkLargeAccountIcon
  },
  {
    id: "projects",
    name: "Projects",
    icon: AlignedBpkLargeFlaskIcon
  },
  {
    id: "career",
    name: "Career",
    icon: AlignedBpkLargeBusinessIcon
  },
  {
    id: "education",
    name: "Education",
    icon: AlignedBpkLargeLandmarkIcon
  },
  {
    id: "contact",
    name: "Contact",
    icon: AlignedBpkLargeMailIcon
  }
];
// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends React.Component {
  render() {
    return (
      <BpkGridRow className={c("NavBar__bar")}>
        {NAV_BAR.map(item => (
          <BpkGridColumn
            onClick={() => {
              this.props.scrollTo(item.id);
            }}
            width={12 / NAV_BAR.length}
            className={
              this.props.selected === item.id
                ? c("NavBar__selected")
                : c("NavBar__unselected")
            }
          >
            <item.icon className={c("NavBar__icon")} />
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
  scrollTo: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  selected: "top"
};

export default NavBar;
