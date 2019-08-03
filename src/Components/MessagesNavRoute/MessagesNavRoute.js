import React from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import messagesData from '../../helpers/data/messagesData';
import Conversations from '../Conversations/Conversations';
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';

class MessagesNavRoute extends React.Component {
  static propTypes = {
    // ownersId: PropTypes.string.isRequired,
    // uid: PropTypes.string.isRequired,
  }

  state = {
    uid: '',
    messages: [],
    conversation: [],
    talkingTo: [],
    talkingAbout: [],
  }

  componentDidMount() {
    this.getMyMessages();
  }

  getMyMessages = () => {
    const { uid } = firebase.auth().currentUser;
    messagesData.getGroupedMessages(uid)
      .then((res) => {
        this.setState({ messages: res, uid });
        this.getMyConversations();
      })
      .catch(err => console.error('no group messages', err));
  };

  getMyConversations = () => {
    const convos = [];
    this.state.messages.forEach((m) => {
      convos.push(m.itemId);
    });
    const filterConvos = convos.filter((item, index) => convos.indexOf(item) >= index);
    this.setState({ conversation: filterConvos });
    this.state.messages.forEach((m) => {
      this.state.conversation.forEach((c) => {
        if (m.itemId === c) {
          usersData.getUsers(m.otheruserid)
            .then((res) => {
              this.setState(prevstate => ({ talkingTo: `${prevstate.talkingTo}, ${res[0].username}` }));
              this.setState({ talkingTo: res[0].username });
            }).catch();
        }
      });
    });
    this.setState({ itemIds: filterConvos });
    this.state.itemIds.forEach((item) => {
      itemsData.getAllItems()
        .then((res) => {
          const whichItems = res.filter(i => i.id === item);
          this.setState(prevstate => ({ talkingAbout: `${prevstate.talkingAbout}, ${whichItems[0].name}` }));
        }).catch(err => console.error('no item returned', err));
    });
  };

  render() {
    const {
      uid,
      talkingAbout,
      talkingTo,
    } = this.state;

    const allMyConversations = talkingAbout.map((convo, i) => (
     <Conversations
      key={`${i}.existingconversation`}
      talkingTo={talkingTo}
      convo={convo}
     />
    ));

    return (
      <div>
        {uid}
        <div>{talkingAbout.length !== ''
          ? allMyConversations
          : ''
          }</div>
      </div>
    );
  }
}

export default MessagesNavRoute;
