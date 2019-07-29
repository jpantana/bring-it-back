import React from 'react';
// JSs
import moment from 'moment';
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage';
import messagesData from '../../helpers/data/messagesData';
import usersData from '../../helpers/data/usersData';
// STYLEs
import './Messages.scss';

class Messages extends React.Component {
  state = {
    newMessage: '',
    canMessage: false,
    paramOwnerId: '',
    messagePostId: '',
    sentBy: '',
    // receivedMessages: [],
    // sentMessages: [],
    userid: '',
    user: {},
    owner: {},
    messages: [],
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId } = this.props.location.state;
      this.setState({ paramOwnerId: ownersId });
    }
    this.setState({ userid: uid, sentBy: uid });
    this.getItemsRented(uid);
    this.showAllMessages(uid);
  }

  getItemsRented = (uid) => {
    usersData.getUsers(uid)
      .then((res) => {
        this.setState({ user: res[0] });
        usersData.getUsers(this.state.paramOwnerId)
          .then((resp) => {
            this.setState({ owner: resp[0] });
          });
      })
      .catch(err => console.error('no items rented', err));
  };

  showAllMessages = (uid) => {
    messagesData.getMessages()
      .then((resp) => {
        this.setState({ messages: resp });
      })
      .catch(err => console.error('no messages for user', err));
  };

  myMessage = (e) => {
    e.preventDefault();
    const message = e.target.value;
    this.setState({ newMessage: message });
  };

  sendMessage = (e) => {
    e.preventDefault();
    const messagesBetweenObj = {
      userid1: this.state.user.uid,
      username1: this.state.user.username,
      userid2: this.state.owner.uid,
      username2: this.state.owner.username,
      newMessage: this.state.newMessage,
      timestamp: moment().format('x'),
    };

    messagesData.newMessage(messagesBetweenObj)
      .then((res) => {
        this.setState({ messagePostId: res.data.name });
      })
      .catch(err => console.error('no new message', err));
  };

  render() {
    const {
      userid,
      newMessage,
      paramOwnerId,
      messages,
    } = this.state;

    const showMessageConversation = messages.map(message => (
      <ReceivedMessage
        key={message.id}
        message={message}
        userid={userid}
        paramOwnerId={paramOwnerId}
      />
    ));

    return (
      <div className="Messages">
        <h2 className="msgsHeader">Messages</h2>

        <div className="displayMessagesDiv">
          {showMessageConversation}
        </div>

          <div className="sendMessageForm">
            <label htmlFor="messageInput">Send Message{paramOwnerId !== '' ? paramOwnerId : ''}</label>
            <input
            type="text"
            id="messageInput"
            defaultValue={newMessage.message}
            onChange={this.myMessage}
          />
            <button
              className="btn btn-primary sendMessageBtn"
              onClick={this.sendMessage}
            >Send</button>
          </div>


      </div>
    );
  }
}

export default Messages;
