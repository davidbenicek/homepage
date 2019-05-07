import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BpkLargeChevronDownIcon from 'bpk-component-icon/sm/chevron-down';

import STYLES from './Harmonica.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const AlignedChevronDown = withButtonAlignment(
  withRtlSupport(BpkLargeChevronDownIcon),
);

class Harmonica extends React.Component {
  constructor() {
    super();
    this.state = {
      closed: true,
    };
  }

  toggleCollapse(closed) {
    this.setState({
      closed,
    });
  }


  render() {
    const { title, renderContent, className } = this.props;
    const { closed } = this.state;
    return (
          <div className={className}>
              <div className={c('Harmonica__controller')}>
                  <BpkText
                      tagName="p"
                      textStyle="base"
                      className={c('Harmonica__sectionTitle')}
                    >
                      {title}
                    </BpkText>
                  <BpkButton
                      iconOnly
                      secondary
                      className={c('Harmonica__chevronButton')}
                      onClick={() => {
                            this.toggleCollapse(!closed);
                        }}
                    >
                      {
                          <AlignedChevronDown
                              className={`
                                ${c('Harmonica__chevron')}
                                ${closed ? '' : c('Harmonica__chevronDown')}
                                `}
                            />
                        }
                    </BpkButton>
                </div>
              {closed ? '' : renderContent()}
            </div>

    );
  }
}

Harmonica.propTypes = {
  renderContent: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Harmonica;
