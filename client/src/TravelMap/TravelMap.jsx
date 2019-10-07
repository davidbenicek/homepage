import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';
import * as leaflet from 'leaflet';
import BpkHorizontalNav, { BpkHorizontalNavItem } from 'bpk-component-horizontal-nav';
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import BpkBannerAlert, { ALERT_TYPES } from 'bpk-component-banner-alert';
import BpkLongArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment } from 'bpk-component-icon';
import { BpkExtraLargeSpinner, BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkLargeEditIcon from 'bpk-component-icon/lg/edit';
import BpkLargeTickIcon from 'bpk-component-icon/lg/tick';
import BpkLargeSwapVertical from 'bpk-component-icon/lg/swap';
import { withLargeButtonAlignment } from 'bpk-component-icon';

import Flights from './Flights';
import Stats from './Stats';

import { COUNTRIES, CODES, LEGEND, STATUSES } from './map_data';

import STYLES from './TravelMap.scss';

const AlignedSwapVertical = withLargeButtonAlignment(BpkLargeSwapVertical);
const AlignedRightIcon = withButtonAlignment(BpkLongArrowRightIcon);

const c = className => className || 'UNKNOWN';


class WorldMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      stats: {},
      flights: [],
      loading: true,
      edit: false,
      collapsed: false,
      selectedNavSegment: 'stats',
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.queryApi = this.queryApi.bind(this);
    this.callApiToFetchData = this.callApiToFetchData.bind(this);
    this.paintMap = this.paintMap.bind(this);
    this.renderLegend = this.renderLegend.bind(this);
    this.setTooltipText = this.setTooltipText.bind(this);
    this.resetTooltip = this.resetTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.hightlightCountry = this.hightlightCountry.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
    this.decorateMap = this.decorateMap.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.render = this.render.bind(this);
    this.postToApi = this.postToApi.bind(this);
    this.addToMap = this.addToMap.bind(this);
    this.renderEditBanner = this.renderEditBanner.bind(this);
    this.onNavBarClick = this.onNavBarClick.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.drawMap = this.drawMap.bind(this);
    this.onNewSearch = this.onNewSearch.bind(this);
  }

  async callApiToFetchData(search) {
    let id = 'david';
    if (this.props.match) id = this.props.match.params.id;
    return await axios({
      url: `/api/map/${id}`,
      method: 'get',
      params: {
        ...search
      }
    });
  }

  async postToApi(countryCode, status) {
    let id = 'david';
    if (this.props.match) id = this.props.match.params.id;
    return await axios.post(`/api/map/${id}`, {
      countryCode,
      status,
    });
  }

  decorateMap() {
    // paint countries on map
    Object.keys(this.state.data).forEach(id => this.paintMap(id));
    // add event listeners
    const paths = d3.select('svg').selectAll('path');
    paths.on('mouseover', (d, i) => {
      // TODO: resolve this nasty ass hack
      const target = paths._groups[0][i];
      this.renderTooltip(target.getBoundingClientRect(), target.id);
    }).on('mouseout', (d, i) => {
      const target = paths._groups[0][i];
      this.hideTooltip(target.id);
    });
  }

  async queryApi(search) {
    const { data: response } = await this.callApiToFetchData(search);
    this.setState({
      data: response.data,
      flights: response.flights,
      stats: response.stats,
      loading: false,
    });
  }

  async componentDidMount() {
    await this.queryApi()
    this.drawMap();
  }

  async onNewSearch(search) {
    this.setState({
      flights: [],
    })
    this.queryApi(search);
  }

  drawMap() {
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

    d3.xml('/world.svg').then(svg => {
      leaflet.svgOverlay(svg.documentElement, bounds, {
        interactive: true,
      }).addTo(map);
      this.decorateMap();
    });
  }

  paintMap(country) {
    const { fill } = LEGEND[this.state.data[country]];
    d3.select(`#${country}`).style('fill', fill);
  }

  async addToMap(id) {
    this.setState({
      adding: true,
    })
    const { data } = this.state;
    let status = data[id] || 'TODO';
    const index = (STATUSES.indexOf(status) + 1) % 4;
    status = STATUSES[index];
    const response = await this.postToApi(id, status);
    this.setState({
      data: response.data.data,
      stats: response.data.stats,
      adding: false,
    })
    this.setTooltipText(id);
  }

  renderEditBanner() {
    return <BpkBannerAlert
      message="You are now editing the map! Please make sure it's your own"
      type={ALERT_TYPES.WARN}
      className={c('TravelMap__editBanner')}
      animateOnEnter
    />
  }

  toggleEdit() {
    const { edit } = this.state;
    console.log('xx', edit);
    if (!edit) {
      const paths = d3.select('svg').selectAll('path')
      paths.on('click', (d, i) => {
        // TODO: resolve this nasty ass hack
        const target = paths._groups[0][i];
        this.addToMap(target.id);
      })
    } else {
      d3.select('svg').selectAll('path').on('click', null);
    }
    this.setState({
      edit: !edit,
    })
  }

  toggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  renderLegend = () => Object.keys(LEGEND).map(item => (
    <div className={c('TravelMap__legend__item')}>
      {LEGEND[item].legend(LEGEND[item].fill)}
      <BpkText textStyle="lg" className={c('TravelMap__legend__title')} >{LEGEND[item].name} ({this.state.stats[item]})</BpkText><br />
      <BpkText textStyle="base" className={c('TravelMap__legend__subtitle')}>{LEGEND[item].description}</BpkText>
    </div>
  ));


  setTooltipText(id) {
    d3
      .select('#tooltipTitle')
      .text(CODES[id]);
    d3
      .select('#tooltipStatus')
      .text(`Status: ${this.state.data[id] || 'todo'}`);
  }

  resetTooltip() {
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

  hideTooltip(id) {
    this.resetTooltip();
    d3
      .select(`#${id}`)
      .transition()
      .duration(1000)
      .style('stroke', 'black')
      .style('stroke-width', '1.28908');
  }

  hightlightCountry(id) {
    d3
      .select(`#${id}`)
      .transition()
      .duration(100)
      .style('stroke', '#DA2C38')
      .style('stroke-width', '5');
  }

  renderTooltip(boundingRect, id) {
    const { top, left } = boundingRect;
    if (window.innerWidth < 516) {
      this.resetTooltip();
      this.setTooltipText(id);
      d3
        .select('#tooltip')
        .style('display', 'block');
      this.hightlightCountry(id);
    } else {
      d3
        .select('#tooltip')
        .style('position', 'absolute')
        .style('display', 'block')
        .style('top', `${top + 50}px`)
        .style('left', `${left}px`);
      this.hightlightCountry(id);
      this.setTooltipText(id);
    }
  }

  onNavBarClick = (e) => {
    this.setState({
      selectedNavSegment: e.target.name,
    });
  }

  renderNavBar() {
    const { selectedNavSegment } = this.state;
    return (
      <BpkHorizontalNav>
        <BpkHorizontalNavItem
          name="stats"
          selected={selectedNavSegment === 'stats'}
          onClick={this.onNavBarClick}
          spaceAround
        >
          Statistics
        </BpkHorizontalNavItem>
        <BpkHorizontalNavItem
          name="flights"
          selected={selectedNavSegment === 'flights'}
          onClick={this.onNavBarClick}
          spaceAround
        >
          Flights
        </BpkHorizontalNavItem>
      </BpkHorizontalNav>
    );
  }

  render() {
    const { loading, edit, adding, selectedNavSegment, stats, flights, collapsed } = this.state;
    this.decorateMap();
    return (
      <div className={c('TravelMap__container')} >
        <div id="image-map" className={`${!loading && c('TravelMap__map')} ${collapsed ? c('TravelMap__map__extended') : ''}`} />
        {loading && <div className={loading && c('TravelMap__map')}>
          <BpkExtraLargeSpinner className={c('TravelMap__spinner')} type={SPINNER_TYPES.dark} />
        </div>}
        <div id="tooltip" className={c('TravelMap__tooltip')}>
          <BpkText textStyle="base" id="tooltipTitle" className={c('TravelMap__tooltip__title')} /><br />
          <BpkText textStyle="sm" id="tooltipStatus" className={c('TravelMap__tooltip__status')} />
        </div>
        <div className={c('TravelMap__menu')} >
          {/* <BpkButton iconOnly secondary onClick={this.toggleCollapse} className={c('TravelMap__collapseButton')}>
            <AlignedSwapVertical />
          </BpkButton> */}
          {collapsed ? null : <div>
            <BpkButton secondary onClick={this.toggleEdit} className={c('TravelMap__editButton')}>
              {!edit ? <><p>Edit</p><BpkLargeEditIcon /></> : <>{adding && <BpkSpinner />}<p>Stop edit</p><BpkLargeTickIcon /></>}
            </BpkButton>
            {edit && this.renderEditBanner()}
            {!loading && (<div className={c('TravelMap__legend')}>
              {stats ? <div><BpkText textStyle="lg" >Total Countries Visited: {stats.Total} </BpkText><BpkText className={c('TravelMap__plusPlanned')} textStyle="sm">(+{stats.Planned} planned)</BpkText><br /></div> : null}
              {this.renderLegend()}
            </div>)}
            {!loading && this.renderNavBar()}
            {loading ? null : selectedNavSegment === 'stats' ? <Stats stats={stats} /> : <Flights flights={flights} onNewSearch={this.onNewSearch} />}
            <BpkButton secondary href="https://www.beni.tech/" className={c('TravelMap__button')} > See more of my work&nbsp;<AlignedRightIcon /></BpkButton>
          </div>}
        </div>
      </div >
    );
  }
}

export default WorldMap;
