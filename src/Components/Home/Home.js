import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import usersData from '../../helpers/data/usersData';

import './Home.scss';

class Home extends React.Component {
  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.getUser(uid);
    console.error(this.props.username, 'username home');
  }

  getUser = (uid) => {
    usersData.getUsers(uid)
      .then((resp) => {
        if (resp.length === 0) {
          this.props.history.push('/signup');
        }
      }).catch(err => console.error(err, 'no such user exists'));
  };

  render() {
    return (
      <h1>Home</h1>
    );
  }
}

export default Home;
