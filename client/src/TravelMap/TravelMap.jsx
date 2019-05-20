import React from 'react';
import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BpkText from 'bpk-component-text';

// import { LEGEND } from './data.jsx';

import STYLES from './TravelMap.scss';

const c = className => STYLES[className] || 'UNKNOWN';

class WorldMap extends React.Component {
  componentDidMount() {
    const map = leaflet.map('image-map', {
      minZoom: 1,
      maxZoom: 4,
      center: [0, 0],
      zoom: 1,
      crs: leaflet.CRS.Simple,
    });
    const w = 2000;
    const h = 1001;
    const url = 'https://s3.eu-central-1.amazonaws.com/benicek/map/world.svg';
    const southWest = map.unproject([0, h], map.getMaxZoom() - 1);
    const northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
    const bounds = new leaflet.LatLngBounds(southWest, northEast);
    leaflet.imageOverlay(url, bounds).addTo(map);
    map.setMaxBounds(bounds);
  }

  render() {
    return (
      <div>
        <div id="image-map" className={c('TravelMap__main')} />
        <div className={c('TravelMap__legend')}>
          <div className={c('TravelMap__legend__item')}>
            <svg width="30" height="30">
              <rect width="30" height="30" fill="#D8973C" />
            </svg>
            <BpkText textStyle="lg" className={c('TravelMap__legend__title')} >Visited (43)</BpkText><br />
            <BpkText textStyle="base" className={c('TravelMap__legend__subtitle')}>Countries I've been to (no transfers)</BpkText>
          </div>
          <div className={c('TravelMap__legend__item')}>
            <svg width="30" height="30">
              <defs>
                <pattern id="stroke" patternUnits="userSpaceOnUse" width="15" height="15" patternTransform="rotate(45)">
                  <line x1="0" y="0" x2="0" y2="15" stroke="#A4243B" strokeWidth="28" />
                </pattern>
              </defs>
              <rect width="30" height="30" fill="url(#stroke)" />
            </svg>
            <BpkText textStyle="lg" className={c('TravelMap__legend__title')}>Planned (4)</BpkText><br />
            <BpkText textStyle="base" className={c('TravelMap__legend__subtitle')}>It's been booked and I'm going... soon</BpkText>
          </div>
          <div className={c('TravelMap__legend__item')}>
            <svg width="30" height="30">
              <rect width="30" height="30" fill="#273E47" />
            </svg>
            <BpkText textStyle="lg" className={c('TravelMap__legend__title')} >TODO</BpkText><br />
            <BpkText textStyle="base" className={c('TravelMap__legend__subtitle')}>I'll get there on day!</BpkText>
          </div>
        </div>
      </div>
    );
  }
}

export default WorldMap;
