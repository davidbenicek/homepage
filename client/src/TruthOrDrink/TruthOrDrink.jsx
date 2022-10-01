
import React from 'react';
import styled from 'styled-components';
import BpkCard from 'bpk-component-card';
import BpkText from 'bpk-component-text';
import axios from 'axios';


import STYLES from './TruthOrDrink.scss';


const c = className => className || 'UNKNOWN';
const StyledHeader = styled.header`
  background: url(https://www.ecopetit.cat/iconpics/f/27/272087/party-wallpaper.jpg) center;
  background-size: cover;
`;

class TruthOrDrink extends React.Component {
  constructor(props) {
    super(props);

    this.fetchQuestion = this.fetchQuestion.bind(this);


    this.state = {
      cat: "",
      m: "",
    };
  }

  componentDidMount() {
    this.fetchQuestion('HAPPY_HOUR');
  }

  async fetchQuestion(level) {
    const { data } = await axios({
      url: `/api/truthOrDrink${level ? `/${level}` : ''}`,
      method: 'get',
    });
    this.setState({
      ...data,
    });
  }

  render() {
    const CATEGORIES = [
      {
        name: "Extra Dirty",
        value: "EXTRA_DIRTY",
        image: "",
        tagLine: "NSFW. Cringeworthy, adult-themed questions that pair nicely with adult beverages.",
      },
      {
        name: "Happy Hour",
        value: "HAPPY_HOUR",
        image: "",
        tagLine: "Only good times allowed with these feel-good questions for you and your drinking buddies.",
      },
      {
        name: "On The Rocks",
        value: "ON_THE_ROCKS",
        image: "",
        tagLine: "Chill questions for mixed company—with just enough of a bite to help you loosen up together.",
      },
      {
        name: "Last Call",
        value: "LAST_CALL",
        image: "",
        tagLine: "NSFW. Warning: do not play these questions unless it’s very late and you’ve got nothing left to lose.",
      },
    ]
    return (<div className={c('TruthOrDrink')}>
      <StyledHeader className={c('TruthOrDrink__header')}>
        <div className={c('TruthOrDrink__header-inner')}>
          <BpkText tagName="h1" textStyle="xxl" className={c('TruthOrDrink__heading')}>Truth or Drink</BpkText>
        </div>
      </StyledHeader>
      <main className={c('TruthOrDrink__main')}>
        <div className={c('TruthOrDrink__category__container')}>
          {CATEGORIES.map(cat => (
            <BpkCard className={c('TruthOrDrink__category__card')} onClick={() => this.fetchQuestion(cat.value)}>
              <BpkText bold tagName="h3" textStyle="xl" className={c('TruthOrDrink__category__title')}>{cat.name}</BpkText>
              <BpkText tagName="p" textStyle="base" className={c('TruthOrDrink__category__subtitle')}>{cat.tagLine}</BpkText>
            </BpkCard>
          ))}
        </div>
        <div className={c('TruthOrDrink__question__container')}>
          <BpkText tagName="h4" textStyle="lg" className={c('TruthOrDrink__question__prompt')}>The question is...</BpkText>
          <BpkText bold tagName="h3" textStyle="xl" className={c('TruthOrDrink__question__question')}>"{this.state.m}"</BpkText>
        </div>
      </main>
    </div>);
  }
};

export default TruthOrDrink;
