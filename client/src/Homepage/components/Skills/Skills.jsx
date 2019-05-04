import React from "react";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import BpkText from "bpk-component-text";
import BpkButton from "bpk-component-button";
import { withButtonAlignment, withRtlSupport } from "bpk-component-icon";
import BpkLargeChevronDownIcon from "bpk-component-icon/sm/chevron-down";
import BpkBreakpoint, { BREAKPOINTS } from "bpk-component-breakpoint";
import { LANG_SKILLS } from "../../data";

import STYLES from "./Skills.scss";

const c = className => STYLES[className] || "UNKNOWN";

const AlignedChevronDown = withButtonAlignment(
  withRtlSupport(BpkLargeChevronDownIcon)
);

class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
      closed: true
    };

    this.renderSkills = this.renderSkills.bind(this);
    this.toggleLevels = this.toggleLevels.bind(this);
  }

  toggleLevels(hidden) {
    this.setState({
      hidden
    });
  }

  renderSkills(mobile) {
    const { hidden } = this.state;
    return LANG_SKILLS.map(skill => (
      <div key={skill.title}>
        <BpkText tagName="h3" textStyle="lg">
          {skill.title}
        </BpkText>
        <div
          style={{ width: `${mobile && hidden ? 0 : skill.level}%` }}
          className={`
            ${c("Skills__bar")}
            ${mobile && hidden ? c("Skills__hiddenBar") : ""}
          `}
        >
          {skill.text}
        </div>
      </div>
    ));
  }

  toggleCollapse(closed) {
    this.setState({
      closed
    });
    setTimeout(() => this.toggleLevels(closed), 200);
  }

  render() {
    return (
      <BpkGridColumn
        className={c("Skills__section")}
        width={6}
        offset={0}
        mobileWidth={12}
        mobileOffset={0}
      >
        <BpkGridRow className={c("Skills__skill")}>
          <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
            <div className={c("Skills__controller")}>
              <BpkText
                tagName="p"
                textStyle="base"
                className={c("Skills__sectionTitle")}
              >
                Language skills:
              </BpkText>
              <BpkButton
                iconOnly
                secondary
                className={c("Skills__chevronButton")}
                onClick={() => {
                  this.toggleCollapse(!this.state.closed);
                }}
              >
                {
                  <AlignedChevronDown
                    className={`
                    ${c("Skills__chevron")}
                    ${this.state.closed ? "" : c("Skills__chevronDown")}
                  `}
                  />
                }
              </BpkButton>
            </div>
            {this.state.closed ? "" : this.renderSkills(true)}
          </BpkBreakpoint>
          <BpkBreakpoint query={BREAKPOINTS.ABOVE_MOBILE}>
            <BpkText tagName="p" textStyle="base">
              Language skills:
            </BpkText>
            {this.renderSkills(false)}
          </BpkBreakpoint>
        </BpkGridRow>
      </BpkGridColumn>
    );
  }
}

export default Skills;
