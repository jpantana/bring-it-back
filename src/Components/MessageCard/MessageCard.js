import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import moment from 'moment';
import messagesData from '../../helpers/data/messagesData';
import MessagesAbout from '../MessagesAbout/MessagesAbout';
import MessageRow from '../MessageRow/MessageRow';
import MessageHeader from '../MessageHeader/MessageHeader';
import msgShape from '../../helpers/propz/msgShape';
// STYLEs
import './MessageCard.scss';

const defaultNewMsg = {
  uid: '',
  otheruserid: '',
  timestamp: '',
  message: '',
  itemId: '',
  unread: true,
};

class MessageCard extends React.Component {
  // static propTypes = {
  //   convo: PropTypes.arrayOf(msgShape.msgShape).isRequired,
  //   // otherUsersId: PropTypes.arrayOf().isRequired,
  //   // itemIds: PropTypes.arrayOf().isRequired,
  //   getMyMessages: PropTypes.func.isRequired,
  // }

  state = {
    newMsg: defaultNewMsg,
    uid: '',
    ownersId: '',
    itemId: '',
    message: '',
    conversation: [],
    otherUsersId: [],
  }

  componentDidMount() {
    this.setState({
      conversation: this.props.conversation,
      uid: firebase.auth().currentUser.uid,
      ownersId: this.props.ownersId,
      itemId: this.props.itemId,
    });
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
    const { newMsg } = this.state;
    messagesData.newMessage(newMsg)
      .then(() => {
        this.props.getMyMessages(this.state.uid);
      })
      .catch(err => console.error('no new message', err));
    this.setState({ newMsg: defaultNewMsg });
  };

  render() {
    const {
      conversation,
      ownersId,
      uid,
      itemId,
      newMsg,
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

export default MessageCard;
