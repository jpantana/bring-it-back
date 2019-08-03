import React from 'react';
// JSs
import moment from 'moment';
import Messages from '../MessagesOLD/Messages';
import messagesData from '../../helpers/data/messagesData';
import usersData from '../../helpers/data/usersData';
// STYLEs
import './MessageBoard.scss';

class MessageBoard extends React.Component {
  state = {
    newMessage: '',
    paramOwnerId: '',
    messagePostId: '',
    user: {},
    userid: '',
    username: '',
    owner: {},
    messages: [],
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    console.error(uid, 'uid component message board');
    if (this.props.location.state) {
      const { ownersId } = this.props.location.state;
      console.error(ownersId, 'owner id MB');
      this.setState({ paramOwnerId: ownersId });
    }
    this.setState({ userid: uid });
    this.getUsersInfo(uid);
    this.showAllMessages(uid);
  }

  getUsersInfo = (uid) => {
    usersData.getUsers(uid)
      .then((res) => {
        this.setState({ user: res[0], username: res[0].username });
        usersData.getUsers(this.state.paramOwnerId)
          .then((resp) => {
            console.error(resp[0]);
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
        this.showAllMessages();
      })
      .catch(err => console.error('no new message', err));
  };

  render() {
    const {
      userid,
      newMessage,
      paramOwnerId,
      messages,
      owner,
      user,
    } = this.state;

    const showMessageConversation = messages.map(message => (
      <Messages
        key={message.id}
        message={message}
        userid={userid}
        paramOwnerId={paramOwnerId}
        owner={owner}
        user={user}
      />
    ));

    return (
      <div className="Messages">
        <h2 className="msgsHeader">Messages</h2>

        <div className="displayMessagesDiv">
          {showMessageConversation}
        </div>

          <div className="sendMessageForm">
            <label htmlFor="messageInput">Send</label>
            <input
            type="text"
            id="messageInput"
            defaultValue={newMessage.message}
            onChange={this.myMessage}
          />
          {paramOwnerId !== ''
            ? <button
                className="btn btn-primary sendMessageBtn"
                onClick={this.sendMessage}
              >Send</button>
            // : <button
            //   className="btn btn-primary sendMessageBtn"
            //   onClick={this.sendMessage}
            // >Reply</button>
            : ''
          }
            {/* <button
              className="btn btn-primary sendMessageBtn"
              onClick={this.sendMessage}
            >Send</button> */}
          </div>
      </div>
    );
  }
}

export default MessageBoard;
