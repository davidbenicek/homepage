import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-charts';

import STYLES from './WeatherChart.scss';

const c = className =>className || 'UNKNOWN';

class WeatherChart extends React.Component {
  constructor() {
    super();
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  render() {
    const {
      data,
      axes,
    } = this.props;
    return (
      <div
        className={c('WeatherChart__area')}
      >
        <Chart
          data={data}
          axes={axes}
          series={{ type: 'line' }}
          primaryCursor
          secondaryCursor
          tooltip
        />
      </div>
    );
  }
}

WeatherChart.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  axes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

// WeatherChart.defaultProps = {
//   selected: 'top',
//   attached: false,
// };

export default WeatherChart;
