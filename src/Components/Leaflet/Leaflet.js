import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import L from 'leaflet';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import mapKey from '../../helpers/mapquestApiKey.json';
import usersData from '../../helpers/data/usersData';
// STYLEs
import 'leaflet/dist/leaflet.css';
import './Leaflet.scss';

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

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  `;

export default class Map extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
  }

  state = {
    user: defaultUserState,
    lontLat: '',
  }

  componentDidMount() {
    this.pullUser();
    this.buildMap();
  }

  geoCodie = (addy) => {
    const address = addy;
    const apiKey = mapKey.mapKey;
    axios.get(`https://api.geocod.io/v1.3/geocode?q=${encodeURIComponent(address)}&api_key=${encodeURIComponent(apiKey)}`).then((response) => {
      // console.error(response.data.results[0].location);
      this.setState({ lontLat: response.data.results[0].location });
    });
  };

  buildMap = () => {
    const mymap = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      detectRetina: true,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoianBhbjI5ODkiLCJhIjoiY2p5bHZrY2R0MDQ4NjNjbzh0cTJtb2gwcSJ9._MF-w9xJPWakL9fB0YqGEQ',
    }).addTo(mymap);
    // const marker = L.marker([51.5, -0.09]).addTo(mymap);
    // const circle = L.circle([51.508, -0.11], {
    //   color: 'red',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    //   radius: 500,
    // }).addTo(mymap);
    // const polygon = L.polygon([
    //   [51.509, -0.08],
    //   [51.503, -0.06],
    //   [51.51, -0.047],
    // ]).addTo(mymap);
    // marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
    // circle.bindPopup('I am a circle.');
    // polygon.bindPopup('I am a polygon.');
    // let popup = L.popup()
    //   .setLatLng([51.5, -0.09])
    //   .setContent('I am a standalone popup.')
    //   .openOn(mymap);
    // popup = L.popup();
    // const onMapClick = (e) => {
    //   popup
    //     .setLatLng(e.latlng)
    //     .setContent(`You clicked the map at ${e.latlng.toString()}`)
    //     .openOn(mymap);
    // };
    // mymap.on('click', onMapClick);
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
      <Wrapper width="440px" height="180px" id="map"/>
    );
  }
}
