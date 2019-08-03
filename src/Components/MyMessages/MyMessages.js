import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// JSs
import SentMessages from '../SentMessages/SentMessages';
import messagesData from '../../helpers/data/messagesData';
import usersData from '../../helpers/data/usersData';
// import ReceivedMessages from '../ReceivedMessages/ReceivedMessages';

class MyMessages extends React.Component {
  state = {
    messages: [],
    uid: '',
    ownersId: '',
    convoRecip: '',
    itemId: '',
    // conversationsWith: [],
    myText: '',
    user1id: '',
    user2id: '',
    username1: '',
    username2: '',
    singleConvo: '',
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId, itemId } = this.props.location.state;
      this.setState({ ownersId, itemId });
      this.findOtherUser(this.props.location.state);
    }
    messagesData.getMessages()
      .then((res) => {
        this.setState({ messages: res, uid });
      })
      .catch(err => console.error('nothing has been rented', err));
  }

  findOtherUser = (otherUser) => {
    usersData.getUsers(otherUser.ownersId)
      .then(res => this.setState({ convoRecip: res[0].username }))
      .catch(err => console.error('could not find user to have conversation', err));
  };

  // seeConversationRecips = (user, msg) => {
  //   this.setState(prevstate => ({ conversationsWith: `${prevstate.conversationsWith}, ${user}` }));
  //   this.filterUsersArr();
  // };

  // filterUsersArr = () => {
  //   const wat = this.state.conversationsWith;
  //   for (let i = 0; i <= wat.length; i += 1) {
  //     console.error(wat[i]);
  //   }
  // };

  myMessage = (e) => {
    e.preventDefault();
    const myTextMsg = e.target.value;
    this.setState({ myText: myTextMsg });
  };

  receiveMessageDetails = (user) => {
    this.setState({
      user1id: user.userid1,
      user2id: user.userid2,
      username1: user.username1,
      username2: user.username2,
      singleConvo: user.newMessage,
    });
  };

  render() {
    const {
      messages,
      uid,
      ownersId,
      myText,
    } = this.state;
    const sentMessages = messages.map(message => (
      <SentMessages
        uid={uid}
        key={message.id}
        message={message}
        // seeConversationRecips={this.seeConversationRecips}
        receiveMessageDetails={this.receiveMessageDetails}
      />
    ));

    return (
      <div className="row justify-content-center">
        <p></p>
        <div className="col-4">{ sentMessages }</div>

        <div className="Messages">
          <h2 className="msgsHeader">Messages</h2>

            <div className="sendMessageForm">
              <label htmlFor="messageInput">Send</label>
              <input
              type="text"
              id="messageInput"
              defaultValue={myText.message}
              onChange={this.myMessage}
            />
            {ownersId !== ''
              ? <button
                  className="btn btn-primary sendMessageBtn"
                  onClick={this.sendMessage}
                >Send</button>
              : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default MyMessages;
