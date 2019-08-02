import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import SentMessages from '../SentMessages/SentMessages';
import messagesData from '../../helpers/data/messagesData';
// import ReceivedMessages from '../ReceivedMessages/ReceivedMessages';

class MyMessages extends React.Component {
  state = {
    messages: [],
    uid: '',
    user1: [],
    user2: [],
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    messagesData.getMessages()
      .then((res) => {
        this.setState({ messages: res, uid });
      })
      .catch(err => console.error('nothing has been rented', err));
  }

  render() {
    const { messages, uid } = this.state;
    const sentMessages = messages.map(message => (
      <SentMessages
        uid={uid}
        key={message.id}
        message={message}
      />
    ));

    const conversations = messages.filter(message => message.userid1 !== uid);
    const conversations2 = messages.filter(message => message.userid2 !== uid);
    console.error(conversations);

    return (
      <div className="row justify-content-center">
        <p></p>
        <div className="col-4">{ sentMessages }</div>
      </div>
    );
  }
}

export default MyMessages;
