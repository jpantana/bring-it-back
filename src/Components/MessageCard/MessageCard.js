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
  senderid: '',
  receiverid: '',
  timestamp: '',
  message: '',
  itemId: '',
  itemOwnerId: '',
  unread: true,
};

class MessageCard extends React.Component {
  static propTypes = {
    conversation: PropTypes.arrayOf(msgShape.msgShape),
    uid: PropTypes.string.isRequired,
    ownersId: PropTypes.string,
    itemId: PropTypes.string.isRequired,
    showThisMessage: PropTypes.func,
    getMyMessages: PropTypes.func.isRequired,
    hideThisCard: PropTypes.func,
    itemOwnerId: PropTypes.string,
    otherUsersId: PropTypes.string,
    convoWith: PropTypes.string,
  }

  state = {
    newMsg: defaultNewMsg,
    uid: '',
    ownersId: '',
    itemId: '',
    conversation: [],
    msgPostId: '',
    otherUser: '',
  }

  componentDidMount() {
    if (this.props.conversation.length < 1) {
      this.setState({
        uid: firebase.auth().currentUser.uid,
        ownersId: this.props.ownersId,
        itemId: this.props.itemId,
      });
    } else {
      const findOtherUser= [];
      const findItemOwner = [];
      const useruid = firebase.auth().currentUser.uid;
      this.props.conversation.forEach((c) => {
        findItemOwner.push(c.itemOwnerId);
        if (c.senderid === useruid) {
          findOtherUser.push(c.receiverid);
        } else if (c.receiverid === useruid) {
          findOtherUser.push(c.senderid);
        }
      });
      const otherUser = Array.from(new Set(findOtherUser));
      const itemOwner = Array.from(new Set(findItemOwner));
      this.setState({
        uid: firebase.auth().currentUser.uid,
        conversation: this.props.conversation,
        otherUser: otherUser[0],
        ownersId: itemOwner[0],
        itemId: this.props.itemId,
      });
    }
    this.markAsRead();
  }

  makeMsg = (e) => {
    if (typeof(this.props.otherUsersId) !== 'undefined') {
      this.setState({ receiver: this.props.otherUsersId });
    } else {
      this.setState({ receiver: this.state.otherUser });
    }
    const buildNewMsg = {
      senderid: this.state.uid,
      message: e.target.value,
      receiverid: this.state.receiver,
      timestamp: moment().format('x'),
      itemId: this.state.itemId,
      unread: true,
      itemOwnerId: this.props.itemOwnerId,
    };
    this.setState({ newMsg: buildNewMsg });
  };

  sendMessage = (e) => {
    e.preventDefault();
    const { newMsg } = this.state;
    const tempItem = [...this.state.conversation];
    tempItem.push(newMsg);
    this.setState({ conversation: tempItem });
    messagesData.newMessage(newMsg)
      .then((res) => {
        this.setState({ msgPostId: res.data.name });
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
      otherUser,
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
            otherUser={otherUser}
            showThisMessage={this.props.showThisMessage}
            convoWith={this.props.convoWith}
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
