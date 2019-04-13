import React from "react";
import PropTypes from "prop-types";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import BpkText from "bpk-component-text";
import BpkButton from "bpk-component-button";
import BpkLabel from "bpk-component-label";
import BpkBadge, { BADGE_TYPES } from "bpk-component-badge";
import BpkLargeBusinessIcon from "bpk-component-icon/lg/information-circle";
import BpkTooltip from "bpk-component-tooltip";
import TECH_SKILLS from "../../data/techSkills";
import Skills from "../Skills";

import STYLES from "./Profile.scss";

const c = className => STYLES[className] || "UNKNOWN";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: TECH_SKILLS,
    };
  }

  onClick = skillId => {
    const { selected } = this.props;
    const index = selected.indexOf(skillId);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(skillId);
    }
    this.props.onFilter(selected);
  };

  renderSkills = () =>
    Object.keys(this.state.skills).map(skillId => (
      <BpkBadge
        className={`${c("Profile__skill")} ${
          this.props.selected.includes(skillId) ? c("Profile__clicked") : ""
        }`}
        onClick={() => this.onClick(skillId)}
        type={BADGE_TYPES.inverse}
      >
        {this.state.skills[skillId].title}
      </BpkBadge>
    ));

  render() {
    return (
      <BpkGridRow className={c("Profile__row")} padded={false}>
        <BpkGridColumn width={6} mobileWidth={12}>
          <BpkLabel htmlFor="name">Who are you?</BpkLabel>
          <BpkText tagName="p" textStyle="base" id="name">
            David Beníček
          </BpkText>
          <BpkLabel htmlFor="employment">What are you doing now?</BpkLabel>
          <BpkText tagName="p" textStyle="base" id="employment">
            Software Engineer at Skyscanner
          </BpkText>
          <BpkLabel htmlFor="home">Where's home?</BpkLabel>
          <BpkText tagName="p" textStyle="base" id="home">
            Prague, Czech Republic
          </BpkText>
          <BpkLabel htmlFor="location">Where are you now?</BpkLabel>
          <BpkText tagName="p" textStyle="base" id="location">
            Barcelona, Catalunya
          </BpkText>
          <BpkLabel htmlFor="location">How do I get in touch?</BpkLabel>
          <BpkText tagName="p" textStyle="base" id="location">
            <BpkButton
              link
              className={c("Profile__contact")}
              onClick={() => {
                this.props.scrollTo("contact", "start");
              }}
            >
              See the contact section
            </BpkButton>
          </BpkText>
          <BpkLabel htmlFor="employment">
            What can you do?
            <BpkTooltip
              id="my-tooltip"
              target={<BpkLargeBusinessIcon className={c("Profile__info")} />}
            >
              Click skills and scroll down to see what project these have been
              demonstrated in
            </BpkTooltip>
          </BpkLabel>
          {this.renderSkills()}
        </BpkGridColumn>
        <Skills />
      </BpkGridRow>
    );
  }
}

Profile.propTypes = {
  scrollTo: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilter: PropTypes.func.isRequired
};

export default Profile;
