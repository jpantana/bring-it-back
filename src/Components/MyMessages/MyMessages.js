import React from 'react';
import moment from 'moment';
// JSs
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
    receivedMsg: {},
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId, itemId } = this.props.location.state;
      this.setState({ ownersId, itemId, uid });
    }
    this.getMyMessages(uid);
  }

  myMessage = (e) => {
    e.preventDefault();
    const myTextMsg = e.target.value;
    this.setState({ myText: myTextMsg });
  };

  sendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      uid: this.state.uid,
      otheruserid: this.state.ownersId,
      timestamp: moment().format('x'),
      message: this.state.myText,
      itemId: this.state.itemId,
    };
    messagesData.newMessage(messageObj)
      .then((res) => {
        this.setState({ messagePostId: res.data.name });
        this.getMyMessages(this.state.uid);
      })
      .catch(err => console.error('no new message', err));
  };

  getMyConversations = () => {
    const findConvo = this.state.messages.filter(m => m.itemId === this.state.itemId);
    const msgReceived = this.state.messages.filter(m => m.otheruserid === this.state.uid);
    this.setState({ conversation: findConvo, receivedMsg: msgReceived });
  };

  getMyMessages = (uid) => {
    messagesData.getGroupedMessages(uid)
      .then((res) => {
        this.setState({ messages: res });
        this.getMyConversations();
      })
      .catch(err => console.error('no group messages', err));
  };

  render() {
    const {
      conversation,
      ownersId,
      myText,
    } = this.state;

    const myConversations = conversation.map((convo, i) => (
        <MessageRow
          key={`${i}.messageRow`}
          convo={convo}
        />
    ));

    return (
      <div className="MyMessages justify-content-center">
        <div className="msgHeaderCompDiv">
          <MessageHeader
            key={'messageHeader'}
            ownersId={ownersId}
          />
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
              ? <div>
                  <label htmlFor="messageInput">Send</label>
                  <input
                  type="text"
                  id="messageInput"
                  defaultValue={myText.message}
                  onChange={this.myMessage}
                />
                  <button
                      className="btn btn-primary sendMessageBtn"
                      onClick={this.sendMessage}
                    >Send</button>
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
