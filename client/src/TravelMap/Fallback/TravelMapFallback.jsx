import React from 'react';
import axios from 'axios';
import crypto from 'crypto';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import BpkAccountIcon from 'bpk-component-icon/sm/account';
import { withButtonAlignment } from 'bpk-component-icon';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'bpk-component-input';



import STYLES from './TravelMapFallback.scss';

const AlignedRightIcon = withButtonAlignment(BpkLongArrowRightIcon);
const AlignedPersonIcon = withButtonAlignment(BpkAccountIcon);

const c = className => className || 'UNKNOWN';


class TravelMapFallback extends React.Component {
    state = {
        value: '',
        valid: null,
        mapNames: [],
    };

    componentDidMount = async () => {
        const { data: mapNames } = await axios({
            url: `/api/allMaps`,
            method: 'get',
        });
        this.setState({ mapNames });
    }

    onNameChange = (e) => {
        const candidateMapName = e.target.value
        const hash = crypto.createHash('sha1').update(candidateMapName).digest('hex')
        this.setState({
            value: candidateMapName,
            valid: candidateMapName && !this.state.mapNames.includes(hash),
        });

    }

    render = () => {
        return (
            <div className={c('TravelMapFallback__container')} >
                <div className={c('TravelMapFallback__blurb')}>
                    <BpkText tagName="h1" textStyle="xxl" >Hello,</BpkText>
                    <BpkText tagName="p" textStyle="lg" >welcome to my travel maps page!</BpkText>
                    <BpkText tagName="p" textStyle="lg" >You can document your journeys here - just choose your own unique URL by changing it in the address bar!</BpkText>
                    <BpkText tagName="p" textStyle="lg" >From there, start editing the map and click around to add places you've been, lived or plan to go!</BpkText>
                </div>
                <div className={c('TravelMapFallback__navigation')} >
                    <BpkInput
                        id="name"
                        type={INPUT_TYPES.text}
                        name="name"
                        value={this.state.value}
                        onChange={this.onNameChange}
                        placeholder="Pick a unique username"
                        valid={this.state.valid}
                    />
                    <BpkButton disabled={!this.state.valid} secondary href={`/map/${this.state.value}`}> Create your own map <AlignedRightIcon /></BpkButton>
                    <BpkButton className={c('TravelMapFallback__myMap')} secondary href="/map/david"> Check out my map! <AlignedPersonIcon /></BpkButton>
                </div>
            </div >
        );
    }
}

export default TravelMapFallback;
