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

const defaultConversation = [{
  uid: '',
  otheruserid: '',
  timestamp: '',
  message: '',
  itemId: '',
  unread: true,
}];


class MessageCard extends React.Component {
  static propTypes = {
    conversation: PropTypes.arrayOf(msgShape.msgShape),
    uid: PropTypes.string.isRequired,
    ownersId: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    showThisMessage: PropTypes.func,
    getMyMessages: PropTypes.func.isRequired,
    hideThisCard: PropTypes.func,
  }

  state = {
    newMsg: defaultNewMsg,
    uid: '',
    ownersId: '',
    itemId: '',
    message: '',
    conversation: defaultConversation,
    otherUsersId: [],
  }

  componentDidMount() {
    if (this.props.conversation === undefined) {
      this.setState({
        conversation: [1],
        uid: firebase.auth().currentUser.uid,
        ownersId: this.props.ownersId,
        itemId: this.props.itemId,
      });
    } else {
      this.setState({
        conversation: this.props.conversation,
        uid: firebase.auth().currentUser.uid,
        ownersId: this.props.ownersId,
        itemId: this.props.itemId,
      });
    }
    this.markAsRead();
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
        this.props.hideThisCard();
        this.props.getMyMessages(this.state.uid);
      })
      .catch(err => console.error('no new message', err));
    this.setState({ newMsg: defaultNewMsg });
  };

  markAsRead = () => {
    const wholeConvo = this.props.conversation;
    if (wholeConvo !== undefined) {
      wholeConvo.forEach((msg) => {
        if (msg.unread === true) {
          messagesData.markAsRead(msg.id, false)
            .then()
            .catch(err => console.error('still marked as unread', err));
        }
      });
    }
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
      <div className="MessageCard">
        <div className="msgHeaderCompDiv">
          <MessageHeader
            key={`messageHeader${ownersId}`}
            ownersId={ownersId}
            showThisMessage={this.props.showThisMessage}
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
