import React from 'react';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';



import STYLES from './TravelMapFallback.scss';

const AlignedRightIcon = withButtonAlignment(BpkLongArrowRightIcon);

const c = className => className || 'UNKNOWN';


class TravelMapFallback extends React.Component {

    render() {
        return (
            <div className={c('TravelMapFallback__container')} >
                <div className={c('TravelMapFallback__blurb')}>
                    <BpkText tagName="h1" textStyle="xxl" >Hello,</BpkText>
                    <BpkText tagName="p" textStyle="lg" >welcome to my travel maps page!</BpkText>
                    <BpkText tagName="p" textStyle="lg" >You can document your journeys here - just choose your own unique URL by changing it in the address bar!</BpkText>
                    <BpkText tagName="p" textStyle="lg" >From there, start editing the map and click around to add places you've been, lived or plan to go!</BpkText>
                </div>
                <BpkButton secondary href="/map/david" className={c('TravelMapFallback__button')} > Check out my map! <AlignedRightIcon /></BpkButton>
            </div >
        );
    }
}

export default TravelMapFallback;
