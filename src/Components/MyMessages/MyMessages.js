import React from 'react';
import moment from 'moment';
// JSs
import MessagesAbout from '../MessagesAbout/MessagesAbout';
import MessagesNavRoute from '../MessagesNavRoute/MessagesNavRoute';
import MessageRow from '../MessageRow/MessageRow';
import MessageHeader from '../MessageHeader/MessageHeader';
import messagesData from '../../helpers/data/messagesData';
// STYLEs
import './MyMessages.scss';

class MyMessages extends React.Component {
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

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId, itemId } = this.props.location.state;
      this.setState({ ownersId, itemId, uid });
    } else {
      this.setState({ uid });
    }
    this.getMyMessages(uid);
  }

  getNotifications = (uid) => {
    messagesData.getReceivedMessages()
      .then((res) => {
        const msgReceived = res.filter(m => m.otheruserid === uid);
        this.setState({ msgsReceived: msgReceived });
      }).catch();
  };

  myMessage = (e) => {
    e.preventDefault();
    const myTextMsg = e.target.value;
    this.setState({ myText: myTextMsg });
  };

  getMyConversations = (uid) => {
    if (this.state.itemId !== '') {
      const findConvo = this.state.messages.filter(m => m.itemId === this.state.itemId);
      this.setState({ conversation: findConvo });
    }
    const msgReceived = this.state.messages.filter(m => m.otheruserid === uid);
    this.setState({ msgsReceived: msgReceived });
    this.showThisConvo(msgReceived);
  };

  getMyMessages = (uid) => {
    // messagesData.getGroupedMessages(uid)
    messagesData.getReceivedMessages()
      .then((res) => {
        this.setState({ messages: res });
        this.getMyConversations(uid);
      })
      .catch(err => console.error('no group messages', err));
  };

  showThisConvo =(msgs) => {
    msgs.forEach((m, i) => {
      messagesData.getReceivedMessages()
        .then((res) => {
          const convos = res.filter(r => r.itemId === m.itemId);
          this.setState({ conversation: convos, ownersId: m.uid, itemId: m.itemId });
        })
        .catch(err => console.error('no msg returned', err));
    });
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
      ownersId,
      myText,
      uid,
      itemId,
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
            key={'messageHeader'}
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
              : <MessagesNavRoute
                  key={'msgNavRoute'}
                // ownersId={ownersId}
                // uid={uid}
            />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MyMessages;
