import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import window from 'global'

import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import STYLES from './Favourites.scss';

const c = className => className || 'UNKNOWN';

const openInNewTab = (url) => {
  const win = window.open(url, '_blank');
  win.focus();
};

class Favourites extends React.Component {
  componentWillMount() {
    //   const {
    //     lat,
    //     lang,
    //   } = this.props;
    //   axios({
    //     url: `/weather?lat=${lat}&lang=${lang}`,
    //     method: 'get',
    //   }).then(({ data }) => {
    //     this.setState({
    //       loading: false,
    //       success: true,
    //       weather: data,
    //     });
    this.props.showTag(`Press '${this.props.shortcut}' to expand, then select by number`);
    //   }).catch((err) => {
    //     console.log('Failed to get weather...', err);
    //     this.setState({
    //       loading: false,
    //       success: false,
    //       weather: 'Sorry, chief - look out the window.',
    //     });
    //   });
  }

  renderFavourites() {
    return this.props.favourites.map((fave, i) => (
      <BpkGridColumn width={4} className={c('Favourites__block')} onClick={() => { openInNewTab(fave.link); }}>
        <BpkGridRow>
          <BpkGridColumn width={3} className={c('Favourites__icon')} padded={false}>
            <img src={fave.icon} alt={`Icon of ${fave.name}`} />
          </BpkGridColumn>
          <BpkGridColumn width={9}>
            <BpkText tagName="p" textStyle="xs" className={c('Favourites__index')}>{`${this.props.shortcut} + ${i + 1}`}</BpkText>
            <BpkText tagName="h2" textStyle="base" className={c('Favourites__name')}>{fave.name}</BpkText>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridColumn>
    ));
  }

  render() {
    const {
      closed,
    } = this.props;

    if (closed) {
      return null;
    }
    return (
      <BpkGridRow padded={false}>
        {this.renderFavourites()}
      </BpkGridRow>
    );
  }
}

const Favourite = PropTypes.shape({
  icon: '',
  name: '',
  link: '',
});

Favourites.propTypes = {
  closed: PropTypes.bool.isRequired,
  showTag: PropTypes.func.isRequired,
  shortcut: PropTypes.string,
  favourites: PropTypes.arrayOf(Favourite).isRequired,
};

Favourites.defaultProps = {
  shortcut: '',
};

export default Favourites;
