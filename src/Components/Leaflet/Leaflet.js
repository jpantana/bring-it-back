/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import axios from 'axios';
import L from 'leaflet';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import mapKey from '../../helpers/mapquestApiKey.json';
import usersData from '../../helpers/data/usersData';
// STYLEs
import 'leaflet/dist/leaflet.css';
import './Leaflet.scss';
import 'animate.css';
// SVGs
import marker from '../../SVGs/map-marker.svg';

const defaultUserState = {
  firstname: '',
  lastname: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  uid: '',
  username: '',
};

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default class MyMap extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
  }

  state = {
    user: defaultUserState,
    latLong: {
      lat: 0,
      lng: 0,
    },
  }

  componentDidMount() {
    this.pullUser();
    // this.buildMap();
  }

  geoCodie = (addy) => {
    const address = addy;
    const apiKey = mapKey.mapKey;
    axios.get(`https://api.geocod.io/v1.3/geocode?q=${encodeURIComponent(address)}&api_key=${encodeURIComponent(apiKey)}`).then((response) => {
      this.setState({ latLong: response.data.results[0].location });
    });
  };

  pullUser = () => {
    const { uid } = firebase.auth().currentUser;
    usersData.getUsers(uid)
      .then((respUser) => {
        this.setState({ user: respUser[0] });
        const address = `${respUser[0].street} ${respUser[0].city} ${respUser[0].state}`;
        this.geoCodie(address);
      })
      .catch(err => console.error('no user for maps', err));
  };

  render() {
    return (
      <div>
        <Map zoom={10} center={this.state.latLong} >
          <TileLayer attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker key={'mapMarker1'} position={this.state.latLong} >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
        </Map>
      </div>
      // <Wrapper width="440px" height="180px" id="map"/>
    );
  }
}
