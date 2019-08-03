import React from 'react';
import firebase from 'firebase/app';
// JSs
import firebaseMsgKey from '../../helpers/firebasemsgApiKey.json';

// const ref = firebase.database().reference().child('messages');
// const values = ({'text': e.target.value});


class Messages2 extends React.Component {
  componentDidMount() {
    // Retrieve Firebase Messaging object.
    const messaging = firebase.messaging();
    // Add the public key generated from the console here.
    messaging.usePublicVapidKey(firebaseMsgKey.firebaseMsgKey);

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.error('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
      } else {
        console.error('Unable to get permission to notify.');
      }
    });
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Messages2;
