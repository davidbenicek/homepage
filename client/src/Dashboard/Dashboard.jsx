import React from 'react';
import axios from 'axios';
import moment from 'moment';

import { BpkGridContainer, BpkGridColumn, BpkGridRow } from 'bpk-component-grid';
import BpkText from 'bpk-component-text';

import Widget from './Widget';
import Weather from './Weather';
import Favourites from './Favourites';

import STYLES from './Dashboard.scss';

const c = className =>className || 'UNKNOWN';

const WORK_FAVOURITES = [
  {
    icon: 'http://www.egg3.eu/wp-egg/uploads/2016/06/jira.png',
    name: 'JIRA',
    link: 'https://gojira.skyscanner.net/secure/RapidBoard.jspa?rapidView=2869',
  },
  {
    icon: 'https://image.flaticon.com/icons/png/512/25/25231.png',
    name: 'ADS GIT',
    link: 'https://github.skyscannertools.net/adverts',
  },
  {
    icon: 'https://cdn-images-1.medium.com/max/672/1*7kV9WVW69Pol5NclrTgvsA.png',
    name: 'CONFLUENCE',
    link: 'https://confluence.skyscannertools.net/display/AP/Ad+Products',
  },
  {
    icon: 'https://alternative.me/icons/grafana.jpg',
    name: 'DASHBOARDS',
    link: 'https://grafana.prod.aws.skyscnr.com/dashboard/db/ads-sponsored-platform-services?refresh=1m&orgId=1',
  },
];

const PERSONAL_FAVOURITES = [
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png',
    name: 'FACEBOOK',
    link: 'https://www.facebook.com/',
  },
  {
    icon: 'http://pngimg.com/uploads/youtube/youtube_PNG18.png',
    name: 'YOUTUBE',
    link: 'https://youtube.com',
  },
  {
    icon: 'https://i1.wp.com/obeygiant.com/images/2017/01/cnn-logo-square.png?ssl=1',
    name: 'CNN',
    link: 'https://cnn.com',
  },
  {
    icon: 'https://img.freepik.com/free-vector/instagram-icon_1057-2227.jpg?size=338&ext=jpg',
    name: 'INSTAGRAM',
    link: 'https://instagram.com',
  },
  {
    icon: 'https://www.vojtechkral.cz/wp-content/uploads/2018/08/Seznam-logo.jpeg',
    name: 'SEZNAM',
    link: 'https://seznam.cz',
  },
  {
    icon: 'https://i.guim.co.uk/img/media/02c5fc2b42591243e6292fc83f8a97ed78807b57/200_0_2000_1200/master/2000.jpg?width=300&quality=85&auto=format&fit=max&s=3c3e960d81e9b7d16920d50897ebb778',
    name: 'REDDIT',
    link: 'https://redit.com',
  },
];

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: 'x',
      time: '',
    };
  }

  componentWillMount() {
    axios({
      url: 'https://api.kanye.rest',
      method: 'get',
    }).then(({ data }) => {
      this.setState({ quote: `"${data.quote}"` });
    });
    setInterval(() => { this.renderClocks([]); }, 1000);
  }

  // TODO: Add timezone support
  renderClocks() {
    this.setState({
      time: moment().format('HH:mm'),
    });
  }

  render() {
    const {
      quote,
      time,
    } = this.state;

    return (
      <BpkGridContainer className={c('Dashboard__grid')}>
        <BpkGridColumn width={12}>
          <BpkGridRow className={c('Dashboard__titleRow')}>
            <BpkText tagName="h1" textStyle="xxl" className={c('Dashboard__title')}>Hey dude,</BpkText>
          </BpkGridRow>
          <BpkGridRow className={c('Dashboard__clock')}>
            <BpkText tagName="h1" textStyle="xl" >{time}</BpkText>
          </BpkGridRow>
          {/* TODO: Make this optional / changeable */}
          <BpkGridRow className={c('Dashboard__quoteRow')}>
            <BpkText tagName="span" textStyle="base" >{quote}</BpkText>
            <BpkText tagName="span" textStyle="xs" > - ye</BpkText>
            <hr className={c('Dashboard__quote')} />
          </BpkGridRow>
          {/* TODO: Change this to dynamic */}
          <BpkGridRow className={c('Dashboard__row')}>
            <Widget width={5} title="Weather">
              <Weather lat="41.3935114" lang="2.1471763" width={6} />
            </Widget>
            <Widget width={5} offset={2} title="Work Favourites">
              <Favourites favourites={WORK_FAVOURITES} shortcut="s" />
            </Widget>
          </BpkGridRow>
          <BpkGridRow className={c('Dashboard__row')}>
            <Widget width={5} title="Personal Favourites">
              <Favourites favourites={PERSONAL_FAVOURITES} shortcut="p" />
            </Widget>
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridContainer>
    );
  }
}

export default Dashboard;
