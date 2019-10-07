import React from 'react';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';
import BpkCheckbox from 'bpk-component-checkbox';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'bpk-component-input';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import { withButtonAlignment } from 'bpk-component-icon';
import { BpkExtraLargeSpinner, BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkLongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
import BpkLargeTickIcon from 'bpk-component-icon/lg/tick';
import { withLargeButtonAlignment } from 'bpk-component-icon';

import DatePicker from './DatePicker';

import STYLES from './Flights.scss';

const AlignedRightIcon = withButtonAlignment(BpkLongArrowRightIcon);

const c = className => className || 'UNKNOWN';


class Flights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outbound: null,
            inbound: null,
            filterVisitedPlaces: true,
            origin: ''
        };

        this.onDateSelect = this.onDateSelect.bind(this);
        this.onOriginChange = this.onOriginChange.bind(this);
        this.formIsValid = this.formIsValid.bind(this);
        this.renderOriginInput = this.renderOriginInput.bind(this);
        this.toggleShowingVisitedPlaces = this.toggleShowingVisitedPlaces.bind(this);
    }

    onDateSelect(key, newValue) {
        const newState = {};
        newState[key] = newValue;
        this.setState(newState);
    }

    renderDate(key) {
        return (<div className={c('Flights__date')} >
            <BpkText textStyle="sm" className={c('Flights__date__title')}>{key.replace(/^\w/, c => c.toUpperCase())}</BpkText>
            <DatePicker id={key} name={key} date={this.state[key] ? new Date(this.state[key]) : null} onDateSelect={({ target }) => this.onDateSelect(key, target.value)} />
            <BpkText textStyle="xs" className={c('Flights__date__clear')} onClick={() => this.onDateSelect(key, null)}>Clear</BpkText>
        </div>)
    }

    onOriginChange(newValue) {
        this.setState({
            origin: newValue,
        });
    }

    toggleShowingVisitedPlaces() {
        const showing = !this.state.filterVisitedPlaces;
        this.setState({
            filterVisitedPlaces: showing,
        });
    }

    renderOriginInput() {
        return (<div>
            <BpkText textStyle="sm" bold className={c('Flights__origin__title')}>Origin*</BpkText><br />
            <BpkInput
                className={c('Flights__origin')}
                id="origin"
                type={INPUT_TYPES.text}
                name="origin"
                value={this.state.origin}
                onChange={(e) => this.onOriginChange(e.target.value)}
                placeholder="Country, city or airport"
                clearButtonMode={CLEAR_BUTTON_MODES.always}
                clearButtonLabel="Clear"
                onClear={() => this.onOriginChange('')}
            />
        </div>
        )
    }

    formIsValid() {
        const { origin, outbound, inbound } = this.state;
        return origin && ((!outbound && !inbound) || (outbound & inbound));
    }


    render() {
        const { flights, onNewSearch } = this.props;
        const { filterVisitedPlaces, outbound, inbound } = this.state;
        if (!flights) return null;
        let filteredFlights = flights;
        if (filterVisitedPlaces) filteredFlights = flights.filter(f => !f.been);
        if (!filteredFlights) return "I can't find a flight to a place you've not been, you crazy world traveller!!!";
        const datesDontMatch = !outbound && inbound || outbound && !inbound;
        return (
            <div className={c('Flights__container')} >
                {this.renderOriginInput()}
                {this.renderDate('outbound')}
                {this.renderDate('inbound')}
                {<BpkBannerAlert
                    message={datesDontMatch ? 'Accuracy of dates cannot differ' : 'Leave dates blank for an "anytime" search'}
                    type={datesDontMatch ? ALERT_TYPES.ERROR : ALERT_TYPES.NEUTRAL}
                    className={c('Flights__alert')}
                    animateOnEnter
                />}
                <BpkButton secondary disabled={!this.formIsValid()} className={c('Flights__search')} onClick={() => onNewSearch(this.state)}>Search</BpkButton>
                <BpkCheckbox
                    className={c('Flights__toggle')}
                    name="visitedToggle"
                    label="Hide places I've already been to"
                    onChange={() => { this.toggleShowingVisitedPlaces(); }}
                    defaultChecked={this.state.filterVisitedPlaces}
                />
                <br />
                {
                    filteredFlights.length > 0 ?
                        <div>
                            <BpkText textStyle="base" className={c('Flights__summary')}>Flights from {filteredFlights[0].origin.name}:</BpkText><br />
                            {filteredFlights.map(flight =>
                                <BpkCard className={c('Flights__option')} onClick={() => { window.open(flight.url) }}>
                                    <div>{flight.destination.name}</div>
                                    <div className={c('Flights__price')}> {`from ${flight.currency.Symbol}${flight.price}`}</div>
                                    <BpkButton iconOnly ><AlignedRightIcon /></BpkButton>
                                </BpkCard>)}
                        </div>
                        :
                        <BpkCard className={c('Flights__option')}><BpkText textStyle="base">Why not make a search using the controls above?</BpkText></BpkCard>
                }
            </div >
        );
    }
}

export default Flights;
