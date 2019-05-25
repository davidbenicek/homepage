import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Skycons from 'react-skycons';
import moment from 'moment';

import { BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import WeatherChart from './WeatherChart';

import STYLES from './Weather.scss';

const c = className =>className || 'UNKNOWN';

const ICONS = {
  'clear-day': 'CLEAR_DAY',
  'clear-night': 'CLEAR_NIGHT',
  'partly-cloudy-day': 'PARTLY_CLOUDY_DAY',
  'partly-cloudy-night': 'PARTLY_CLOUDY_NIGHT',
  cloudy: 'CLOUDY',
  rain: 'RAIN',
  sleet: 'SLEET',
  snow: 'SNOW',
  wind: 'WIND',
  fog: 'FOG',
};

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      success: false,
      weather: '',
    };
  }

  componentWillMount() {
    const {
      lat,
      lang,
    } = this.props;
    axios({
      url: `/weather?lat=${lat}&lang=${lang}`,
      method: 'get',
    }).then(({ data }) => {
      this.setState({
        loading: false,
        success: true,
        weather: data,
      });
      this.props.showTag((data.daily || {}).summary);
    }).catch((err) => {
      console.log('Failed to get weather...', err);
      this.setState({
        loading: false,
        success: false,
        weather: 'Sorry, chief - look out the window.',
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  formatDataForGraphing(forecast, variable) {
    return forecast.map((point) => {
      const date = moment(point.time * 1000);
      // if (variable === 'precipProbability')
      //   return [date, Math.random() * 50];
      return [date, point[variable]];
    });
  }


  // eslint-disable-next-line class-methods-use-this
  renderOneDay(forecast, type) {
    const date = moment(forecast.time * 1000);
    return (
      <BpkGridColumn width={3} className={c(`Weather__${type}DayColumn`)}>
        <BpkText tagName="h3" textStyle="lg" className={c('Weather__date')}>{date.format('ddd Do')}</BpkText>
        <Skycons
          className={c(`Weather__${type}Icon`)}
          color="#524c61"
          icon={ICONS[forecast.icon]}
          autoplay
        />
        <BpkText tagName="h3" textStyle="base" className={c('Weather__temperature')}>{forecast.temperature ? `${forecast.temperature}°` : `${forecast.apparentTemperatureLow}° - ${forecast.apparentTemperatureHigh}°`}</BpkText>
        {/* TODO: Move to tooltip */}
        {/* <BpkText tagName="h3" textStyle="base" className={c('Weather__state')}>{forecast.summary}</BpkText> */}
        <BpkText tagName="h3" textStyle="base" className={c('Weather__percip')}>{`Rain: ${forecast.precipProbability}%`}</BpkText>
      </BpkGridColumn>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderNextDays(forecast) {
    return (
      <BpkGridRow className={c('Weather__forecastRow')}>
        <BpkGridColumn width={12}>
          <BpkGridRow>
            {forecast.data.slice(0, 4).map(f => this.renderOneDay(f, 'forecast'))}
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderChart(forecast) {
    const temp = this.formatDataForGraphing(forecast.data, 'temperature');
    const percipProb = this.formatDataForGraphing(forecast.data, 'precipProbability');
    return (
      <WeatherChart
        data={[
          {
            label: 'Temperature (C°)',
            data: temp,
          },
          {
            label: 'Rain Probability (%)',
            data: percipProb,
          },
        ]}
        axes={[
          { primary: true, type: 'time', position: 'bottom' },
          {
            type: 'linear',
            id: 'Temperature (C°)',
            position: 'left',
          },
          {
            type: 'linear',
            id: 'Rain Probability (%)',
            min: 0,
            position: 'right',
          },
        ]}
      />
    );
  }

  render() {
    const {
      closed,
    } = this.props;
    const {
      loading,
      success,
      weather,
    } = this.state;
    const {
      currently,
      hourly,
      daily,
    } = weather;
    if (closed) {
      return null;
    }
    if (loading) {
      return 'Working on it, chief';
    }
    if (!success) {
      return weather;
    }
    return (
      <BpkGridRow padded={false}>
        <BpkGridColumn width={12} className={c('Weather__mainColumn')} padded={false}>
          <BpkGridRow className={c('Weather__localityRow')}>
            {this.renderOneDay(currently, 'current')}
            <BpkGridColumn width={9}>
              <BpkText tagName="h1" textStyle="lg" className={c('Weather__title')}>Barcelona, Spain</BpkText>
              {this.renderChart(hourly)}
            </BpkGridColumn>
          </BpkGridRow>
          {this.renderNextDays(daily)}
        </BpkGridColumn>
      </BpkGridRow>
    );
  }
}

Weather.propTypes = {
  closed: PropTypes.bool.isRequired,
  showTag: PropTypes.func.isRequired,
  lat: PropTypes.string,
  lang: PropTypes.string,
};

Weather.defaultProps = {
  lat: '41.3935114',
  lang: '2.1471763',
};

export default Weather;
