import React from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import messagesData from '../../helpers/data/messagesData';
// import Conversations from '../Conversations/Conversations';
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
    itemIds: [],
    talkingTo: [],
    talkingAbout: [],
    stuff: [],
  }

  componentDidMount() {
    this.getMyMessages();
    this.getMyConversationInfo();
  }

  getMyMessages = () => {
    const { uid } = firebase.auth().currentUser;
    messagesData.getGroupedMessages(uid)
      .then((res) => {
        this.setState({ messages: res, uid });
      })
      .catch(err => console.error('no group messages', err));
  };

  getMyConversationInfo = () => {
    const convos = [];
    this.state.messages.forEach((m) => {
      convos.push(m.itemId);
    });
    // get unique ids only
    const filterConvos = convos.filter((item, index) => convos.indexOf(item) >= index);
    this.setState({ itemIds: filterConvos });
    // then pass those itemIds
    this.state.itemIds.forEach((item) => {
      itemsData.getAllItems()
        .then((res) => {
          const whichItems = res.filter(i => i.id === item);

          this.state.messages.forEach((m) => {
            this.state.itemIds.forEach((c) => {
              if (m.itemId === c) {
                usersData.getUsers(m.otheruserid)
                  .then((resp) => {
                    const tempItem = {};
                    tempItem.talkingTo = resp[0].username;
                    tempItem.talkingAbout = whichItems[0].name;
                    this.someFunction(tempItem);
                    // this.setState(prevstate => ({ stuff: `${prevstate.stuff}, tempItem` }));
                    // this.setState(prevstate => ({ talkingTo: `${prevstate.talkingTo}, ${resp[0].username}` }));
                    // this.setState({ talkingTo: resp[0].username });
                  }).catch();
              }
            });
          });
          // this.setState(prevstate => ({ talkingAbout: ` ${prevstate.talkingAbout}${whichItems[0].name}, ` }));
        }).catch(err => console.error('no item returned', err));
    });
  };

  // someFunction = obj => (<Conversations
  //   key={'whatever'}
  //   obj={obj}
  // />);


  render() {
    const {
      talkingAbout,
      // talkingTo,
      // itemIds,
    } = this.state;

    // const allMyConversations = talkingAbout.map((item, i) => (
    //  <Conversations
    //   key={`${i}.existingconversation`}
    //   talkingTo={talkingTo}
    //   takingAbout={talkingAbout}
    //   item={item}
    //  />
    // ));

    return (
      <div>
        <div>{talkingAbout.length !== ''
          ? ''
          // ? <Conversations
          //   key={`existingconversationwrapper`}
          //   talkingTo={talkingTo}
          //   talkingAbout={talkingAbout}
          //  />
          : ''
          }</div>
          <p>{talkingAbout}</p>
      </div>
    );
  }
}

export default MessagesNavRoute;
