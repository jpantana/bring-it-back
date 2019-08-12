import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import moment from 'moment';
import MessagesAbout from '../MessagesAbout/MessagesAbout';
import MessageRow from '../MessageRow/MessageRow';
import MessageHeader from '../MessageHeader/MessageHeader';
import msgShape from '../../helpers/propz/msgShape';
// STYLEs
import './MessageConversation.scss';

const defaultNewMsg = {
  uid: '',
  otheruserid: '',
  timestamp: '',
  message: '',
  itemId: '',
  unread: true,
};

class MessageConversation extends React.Component {
  static propTypes = {
    convo: PropTypes.arrayOf(msgShape.msgShape).isRequired,
    // otherUsersId: PropTypes.arrayOf().isRequired,
    // itemIds: PropTypes.arrayOf().isRequired,
    sendMessage: PropTypes.func.isRequired,
  }

  state = {
    newMsg: defaultNewMsg,
    uid: '',
    ownersId: '',
    itemId: '',
    message: '',
    conversation: [],
    otherUsersId: [],
  }

  componentWillMount() {
    this.removeListener = this.setState({
      conversation: this.props.convo,
      uid: firebase.auth().currentUser.uid,
      otherUsersId: this.props.otherUsersId,
      itemId: this.props.itemIds[this.props.i],
      ownersId: this.props.otherUsersId[this.props.i],
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  makeMsg = (e) => {
    const buildNewMsg = {
      uid: this.state.uid,
      message: e.target.value,
      otheruserid: this.state.ownersId,
      timestamp: moment().format('x'),
      itemId: this.state.itemId,
      unread: true,
    };
    this.setState({ newMsg: buildNewMsg });
  };

  sendMessage = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.newMsg);
  };

  // sendMessage = (e) => {
  //   e.preventDefault();
  //   if (this.state.itemId !== '') {
  //     const messageObj = {
  //       uid: this.state.uid,
  //       otheruserid: this.state.ownersId,
  //       timestamp: moment().format('x'),
  //       message: this.state.myText,
  //       itemId: this.state.itemId,
  //       unread: true,
  //     };
  //     messagesData.newMessage(messageObj)
  //       .then((res) => {
  //         this.setState({ messagePostId: res.data.name, myText: '' });
  //         this.getMyMessages(this.state.uid);
  //       })
  //       .catch(err => console.error('no new message', err));
  //   }
  // };

  render() {
    const {
      conversation,
      ownersId,
      uid,
      itemId,
      newMsg,
      // message,
    } = this.state;

    const myConversations = conversation.map((convo, i) => (
        <MessageRow
          key={`${i}.messageRow`}
          convo={convo}
          uid={uid}
        />
    ));

    return (
      <div className="MyMessages">
        <div className="msgHeaderCompDiv">
          <MessageHeader
            key={`messageHeader${ownersId}`}
            ownersId={ownersId}
          />
          {itemId !== ''
            ? <MessagesAbout
              key={`messagesAbout.${itemId}`}
              itemId={itemId}
            />
            : ''}
        </div>
        <div className="msgTableDiv">
          <div>{conversation.length > 0
            ? myConversations
            : null
          }</div>
        </div>

        <div className="Messages">
            <div className="sendMessageForm">
            {ownersId !== ''
              ? <div className="msgInputDiv">
                  <input
                  type="text"
                  id="messageInput"
                  placeholder=" say something kind..."
                  value={newMsg.message}
                  onChange={this.makeMsg}
                />
                <label className="msgLabel" htmlFor="messageInput">
                  <button
                      className="btn sendMessageBtn"
                      onClick={this.sendMessage}
                    >Send
                  </button>
                </label>
                </div>
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MessageConversation;
