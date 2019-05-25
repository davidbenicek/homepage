import React from 'react';
import * as d3 from 'd3';
import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';

import { COUNTRIES, MAP_DATA, LEGEND } from './map_data';

import STYLES from './TravelMap.scss';

const AlignedRightIcon = withButtonAlignment(BpkLongArrowRightIcon);

const c = className => STYLES[className] || 'UNKNOWN';

function paintMap(countries, fill) {
  countries.forEach((country) => {
    d3.select(`#${COUNTRIES[country]}`).style('fill', fill);
  });
}

const renderLegend = () => LEGEND.map(item => (
  <div className={c('TravelMap__legend__item')}>
    {item.legend(item.fill)}
    <BpkText textStyle="lg" className={c('TravelMap__legend__title')} >{item.name} ({item.data.length})</BpkText><br />
    <BpkText textStyle="base" className={c('TravelMap__legend__subtitle')}>{item.description}</BpkText>
  </div>
));


function setTooltipText(id) {
  d3
    .select('#tooltipTitle')
    .text(MAP_DATA[id].name);
  d3
    .select('#tooltipStatus')
    .text(`Status: ${MAP_DATA[id].status}`);
}

function resetTooltip() {
  d3
    .select('#tooltip')
    .style('display', 'none')
    .style('position', 'initial');
  d3
    .select('#tooltipTitle')
    .text('');
  d3
    .select('#tooltipStatus')
    .text('');
}

function hideTooltip(id) {
  resetTooltip();
  d3
    .select(`#${id}`)
    .transition()
    .duration(100)
    .style('stroke', 'black')
    .style('stroke-width', '1.28908');
}

function hightlightCountry(id) {
  d3
    .select(`#${id}`)
    .transition()
    .duration(500)
    .style('stroke', '#DA2C38')
    .style('stroke-width', '5');
}

function renderTooltip(boundingRect, id) {
  const { top, left } = boundingRect;
  if (window.innerWidth < 516) {
    resetTooltip();
    setTooltipText(id);
    d3
      .select('#tooltip')
      .style('display', 'block');
    hightlightCountry(id);
  } else {
    d3
      .select('#tooltip')
      .style('position', 'absolute')
      .style('display', 'block')
      .style('top', `${top + 50}px`)
      .style('left', `${left}px`);
    hightlightCountry(id);
    setTooltipText(id);
  }
}

class WorldMap extends React.Component {
  componentDidMount() {
    const map = leaflet.map('image-map', {
      minZoom: 0,
      maxZoom: 5,
      center: [4000, 2000],
      zoom: window.innerWidth <= 516 ? 0 : 1,
      crs: leaflet.CRS.Simple,
    });
    const w = 8000;
    const h = 4000;
    const southWest = map.unproject([0, h], map.getMaxZoom() - 1);
    const northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
    const bounds = new leaflet.LatLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    d3.xml('/world.svg').then((svg) => {
      leaflet.svgOverlay(svg.documentElement, bounds, {
        interactive: true,
      }).addTo(map);
      // paint countries on map
      LEGEND.forEach(status => paintMap(status.data, status.fill));
      // add event listeners
      const paths = d3.select('svg').selectAll('path');
      paths.on('mouseover', (d, i) => {
        // TODO: resolve this nasty ass hack
        const target = paths._groups[0][i];
        renderTooltip(target.getBoundingClientRect(), target.id);
      }).on('mouseout', (d, i) => {
        const target = paths._groups[0][i];
        hideTooltip(target.id);
      });
    });
  }

  render() {
    return (
      <div className={c('TravelMap__container')} >
        <div id="image-map" className={c('TravelMap__map')} />
        <div id="tooltip" className={c('TravelMap__tooltip')}>
          <BpkText textStyle="base" id="tooltipTitle" className={c('TravelMap__tooltip__title')} /><br />
          <BpkText textStyle="sm" id="tooltipStatus" className={c('TravelMap__tooltip__status')} />
        </div>
        <div className={c('TravelMap__legend')}>
          {renderLegend()}
        </div>
        <BpkButton secondary href="https://www.beni.tech/" className={c('TravelMap__button')} > See more of my work&nbsp;<AlignedRightIcon /></BpkButton>
      </div >
    );
  }
}

export default WorldMap;
