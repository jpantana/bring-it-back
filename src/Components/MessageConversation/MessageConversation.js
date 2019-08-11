import React from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// JSs
// import MessagesAbout from '../MessagesAbout/MessagesAbout';
import MessageRow from '../MessageRow/MessageRow';
// import MessageHeader from '../MessageHeader/MessageHeader';
import messagesData from '../../helpers/data/messagesData';
// STYLEs
import './MessageConversation.scss';

class MessageConversation extends React.Component {
  // static propTypes = {
  //   itemId: PropTypes.string.isRequired,
  //   uid: PropTypes.string.isRequired,
  //   ownersId: PropTypes.string.isRequired,
  // }

  state = {
    messages: [],
    uid: '',
    ownersId: '',
    convoRecip: '',
    itemId: '',
    myText: '',
    messagePostId: '',
    conversation: [],
    msgsReceived: [],
  }

  componentWillMount() {
    this.setState({ conversation: this.props.convo });
  }

  myMessage = (e) => {
    e.preventDefault();
    const myTextMsg = e.target.value;
    this.setState({ myText: myTextMsg });
  };

  getMyMessages = (uid) => {
    messagesData.getReceivedMessages()
      .then((res) => {
        const msgReceived = res.filter(m => m.otheruserid === uid);
        msgReceived.forEach((m, i) => {
          const convos = res.filter(r => r.itemId === m.itemId);
          this.setState({
            messages: res,
            msgsReceived: msgReceived,
            conversation: convos,
            ownersId: m.uid,
            itemId: m.itemId,
          });
        });
      })
      .catch(err => console.error('no group messages', err));
  };

  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.itemId !== '') {
      const messageObj = {
        uid: this.state.uid,
        otheruserid: this.state.ownersId,
        timestamp: moment().format('x'),
        message: this.state.myText,
        itemId: this.state.itemId,
        unread: true,
      };
      messagesData.newMessage(messageObj)
        .then((res) => {
          this.setState({ messagePostId: res.data.name, myText: '' });
          this.getMyMessages(this.state.uid);
        })
        .catch(err => console.error('no new message', err));
    }
  };

  render() {
    const {
      conversation,
      // ownersId,
      // myText,
      uid,
      // itemId,
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
      test test
        <div className="msgHeaderCompDiv">
          {/* <MessageHeader
            key={'messageHeader'}
            ownersId={ownersId}
          />
          {itemId !== ''
            ? <MessagesAbout
              key={`messagesAbout.${itemId}`}
              itemId={itemId}
            />
            : ''}
        </div> */}
        <div className="msgTableDiv">
          <div>{conversation.length > 0
            ? myConversations
            : null
          }</div>
        </div>
{/*
        <div className="Messages">
            <div className="sendMessageForm">
            {ownersId !== ''
              ? <div className="msgInputDiv">
                  <input
                  type="text"
                  id="messageInput"
                  placeholder=" say something kind..."
                  value={myText}
                  onChange={this.myMessage}
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
          </div> */}
        </div>
      </div>
    );
  }
}

export default MessageConversation;
