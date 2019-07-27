import React from 'react';
import PropTypes from 'prop-types';
// import ReactLeaflet from 'react-leaflet';
import L from 'leaflet';
// STYLEs
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import './Leaflet.scss';

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  `;

export default class Map extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.map = L.map('map', {
      center: [58, 16],
      zoom: 6,
      zoomControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 19,
      maxNativeZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  render() {
    return (
      <Wrapper width="640px" height="360px" id="map"/>
    );
  }
}
