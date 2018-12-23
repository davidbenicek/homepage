import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import * as leaflet from 'leaflet';

import { BpkGridContainer } from 'bpk-component-grid';

class WorldMap extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     map: [],
  //   };
  // }
  // componentWillMount() {
  //   axios({
  //     url: '/locations',
  //     method: 'get',
  //   }).then((data) => {
  //     console.log(data);
  //     this.setState({ map: data.map });
  //   });
  // }

  constructor() {
    super();
    // console.log(this.state.map);
    // const OR = document.getElementById('ocean');
    // console.log(OR);
    // OR.fill = 'blue';
    this.state = {
      map: '',
    };
    console.log('constructor');
    // setTimeout(() => {  }, 500);
  }

  componentWillMount() {
    axios({
      url: '/char',
      method: 'get',
    }).then((data) => {
      console.log('xxx', data);
      this.setState({ map: data.data });
    });
  }

  // renderMap() {
  //   const mapData = this.state.map;
  //   console.log('renderMap');
  //   let map = leaflet.map('map').setView([15.433809, 100.755076], 5);
  //   console.log('map', map);
  //   console.log(this.state.map);
  //   // Add an SVG element to Leaflet’s overlay pane
  //   var svg = d3.select(map.getPanes().overlayPane).append("svg"),
  //       g = svg.append("g").attr("class", "leaflet-zoom-hide");
  //   console.log('yo', svg, g);
  //   //Import the plane
  //   // const svgMap = <object data="https://s3.eu-central-1.amazonaws.com/benicek/map/world_map.svg" type="image/svg+xml"></object>
  //   // const svgMap = document.createElement("object");
  //   // console.log(svgMap);
  //   // svgMap.data = "https://s3.eu-central-1.amazonaws.com/benicek/map/world_map.svg"
  //   // svgMap.onload = this.fillIn;
  //   console.log('xx', mapData, typeof mapData);
  //   // map.getPanes().overlayPane.appendChild(mapData);
  // }

  componentDidMount() {
    console.log('fillIn');
    const CA = d3.select('#path12678');
    console.log('ca',CA);
    CA.attr('fill','blue');
  }

  render() {
    const { map } = this.state;
    console.log('render', map, typeof map);
    return (
      <svg dangerouslySetInnerHTML={{ __html: map }} />
    );
  }
}

export default WorldMap;
