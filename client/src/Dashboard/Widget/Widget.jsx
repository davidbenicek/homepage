import React from "react";
import PropTypes from "prop-types";

import BpkText from "bpk-component-text";
import BpkButton from "bpk-component-button";
import { BpkGridRow, BpkGridColumn } from "bpk-component-grid";
import { withButtonAlignment, withRtlSupport } from "bpk-component-icon";
import BpkLargeChevronDownIcon from "bpk-component-icon/sm/chevron-down";
import { BpkLargeSpinner, SPINNER_TYPES } from "bpk-component-spinner";

import STYLES from "./Widget.scss";

const c = className => STYLES[className] || "UNKNOWN";

const AlignedChevronDown = withButtonAlignment(
  withRtlSupport(BpkLargeChevronDownIcon)
);

// eslint-disable-next-line react/prefer-stateless-function
class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: props.closed,
      tag: ""
    };
    this.updateTag = this.updateTag.bind(this);
    this.renderChevron = this.renderChevron.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse(newValue) {
    this.setState({
      closed: newValue
    });
  }

  updateTag(tag) {
    this.setState({
      tag
    });
  }

  renderChevron() {
    const { closed } = this.state;
    return (
      <BpkButton
        iconOnly
        secondary
        onClick={() => {
          this.toggleCollapse(!closed);
        }}
      >
        {
          <AlignedChevronDown
            className={
              closed
                ? c("Widget__chevron")
                : `${c("Widget__chevron")} ${c("Widget__chevronDown")}`
            }
          />
        }
      </BpkButton>
    );
  }

  render() {
    const { tag, closed } = this.state;
    return (
      <BpkGridColumn
        width={this.props.width}
        offset={this.props.offset}
        className={c("Widget__main")}
      >
        <BpkGridRow
          className={c("Widget__titleRow")}
          onClick={() => {
            this.toggleCollapse(!closed);
          }}
        >
          <BpkText
            tagName="p"
            textStyle="base"
            bold
            className={c("Widget__title")}
          >
            {this.props.title}
          </BpkText>
        </BpkGridRow>
        <BpkGridRow
          className={c("Widget__toggleRow")}
          onClick={() => {
            this.toggleCollapse(!closed);
          }}
        >
          <BpkGridColumn width={2}>{this.renderChevron()}</BpkGridColumn>
          <BpkGridColumn width={10} className={c("Widget__tag")}>
            {!tag ? (
              <BpkLargeSpinner type={SPINNER_TYPES.primary} />
            ) : (
              <BpkText tagName="p" textStyle="base">
                {tag}
              </BpkText>
            )}
          </BpkGridColumn>
        </BpkGridRow>
        <BpkGridRow
          className={c("Widget__lineRow")}
          onClick={() => {
            this.toggleCollapse(!closed);
          }}
        >
          <hr />
        </BpkGridRow>
        {React.cloneElement(this.props.children, {
          ...this.props,
          closed: this.state.closed,
          showTag: this.updateTag
        })}
      </BpkGridColumn>
    );
  }
}
Widget.propTypes = {
  width: PropTypes.number,
  offset: PropTypes.number,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closed: PropTypes.bool // eslint-disable-line react/no-unused-prop-types
};

Widget.defaultProps = {
  width: 12,
  offset: 0,
  closed: true
};

export default Widget;
