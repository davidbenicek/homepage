import React from 'react';
import BpkTicket from 'bpk-component-ticket';
import BpkText from 'bpk-component-text';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import STYLES from './App.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const events = [{
  title: 'Fudan University, Shaghai',
  subTitle: 'Summer school',
  dates: {
    start: 'July 2018',
    end: 'August 2018',
  },
}, {
  title: 'Skyscanner',
  subTitle: 'Software Engineer',
  dates: {
    start: 'June 2016',
    end: 'Present',
  },
}, {
  title: 'University of Glasgow',
  subTitle: '1st Class Honours, Bsc. Computer Science w/ Management',
  dates: {
    start: 'September 2013',
    end: 'June 2017',
  },
}, {
  title: 'Chinese University of Hong Kong',
  subTitle: 'Exchange Year',
  dates: {
    start: 'September 2014',
    end: 'June 2015',
  },
}, {
  title: 'International School of Zug and Luzern',
  subTitle: 'High School, International Baccalaureate (IB) 37/45',
  dates: {
    start: 'September 2008',
    end: 'June 2013',
  },
},
];

const getTickets = () => events.map(event => (
  <BpkGridRow>
    <BpkGridColumn width={12}>
      <BpkTicket stub={`${event.dates.start} - ${event.dates.end}`}>
        <BpkText textStyle="lg">{event.title}</BpkText><br />
        <BpkText textStyle="base">{event.subTitle}</BpkText>
      </BpkTicket>
    </BpkGridColumn>
  </BpkGridRow>));

const App = () => (
  <div className={c('App')}>
    <header className={c('App__header')}>
      <BpkGridContainer>
        <BpkGridRow>
          <BpkGridColumn width={12}>
            <BpkText tagName="h1" textStyle="xxl" className={c('App__heading')}>David Beníček</BpkText>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
    </header>
    <main className={c('App__main')}>
      <BpkGridContainer className={c('App__container')}>
        {getTickets()}
      </BpkGridContainer>
    </main>
  </div>
);


export default App;
