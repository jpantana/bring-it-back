import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// JSs
import SentMessages from '../SentMessages/SentMessages';
import messagesData from '../../helpers/data/messagesData';
// import ReceivedMessages from '../ReceivedMessages/ReceivedMessages';

class MyMessages extends React.Component {
  state = {
    messages: [],
    uid: '',
    ownersId: '',
    itemId: '',
    conversationsWith: [],
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId, itemId } = this.props.location.state;
      this.setState({ ownersId, itemId });
    }
    messagesData.getMessages()
      .then((res) => {
        this.setState({ messages: res, uid });
      })
      .catch(err => console.error('nothing has been rented', err));
  }

  seeConversationRecips = (user, msg) => {
    this.setState(prevstate => ({ conversationsWith: `${prevstate.conversationsWith}, ${user}` }));
    this.filterUsersArr();
  };

  filterUsersArr = () => {
    const wat = this.state.conversationsWith;
    for (let i = 0; i <= wat.length; i += 1) {
      console.error(wat[i]);
    }
  };

  render() {
    const { messages, uid } = this.state;
    const sentMessages = messages.map(message => (
      <SentMessages
        uid={uid}
        key={message.id}
        message={message}
        seeConversationRecips={this.seeConversationRecips}
      />
    ));

    // const conversations = messages.filter(message => message.userid1 !== uid);
    // const conversations2 = messages.filter(message => message.userid2 !== uid);
    // console.error(conversations, conversations2);

    return (
      <div className="row justify-content-center">
        <p></p>
        <div className="col-4">{ sentMessages }</div>
      </div>
    );
  }
}

export default MyMessages;
