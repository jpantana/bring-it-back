import React from 'react';
import moment from 'moment';
// JSs
import MessageRow from '../MessageRow/MessageRow';
import MessageHeader from '../MessageHeader/MessageHeader';
import messagesData from '../../helpers/data/messagesData';
import usersData from '../../helpers/data/usersData';

class MyMessages extends React.Component {
  state = {
    messages: [],
    uid: '',
    ownersId: '',
    convoRecip: '',
    itemId: '',
    myText: '',
    user1id: '',
    user2id: '',
    messagePostId: '',
    conversation: [],
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId, itemId } = this.props.location.state;
      this.setState({ ownersId, itemId, uid });
      // this.findOtherUser(this.props.location.state);
    }
    this.getMyMessages(uid);
  }

  // showAllMessages = (uid) => {
  //   messagesData.getMessages()
  //     .then((res) => {
  //       this.setState({ messages: res, uid });
  //     })
  //     .catch(err => console.error('nothing has been rented', err));
  // };

  // findOtherUser = (otherUser) => {
  //   usersData.getUsers(otherUser.ownersId)
  //     .then(res => this.setState({ convoRecip: res[0].username }))
  //     .catch(err => console.error('could not find user to have conversation', err));
  // };

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

  // receiveMessageDetails = (user) => {
  //   this.setState({
  //     user1id: user.userid1,
  //     user2id: user.userid2,
  //     // username1: user.username1,
  //     // username2: user.username2,
  //     singleConvo: user.messages,
  //   });
  // };

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
    this.setState({ conversation: findConvo });
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
      <div className="row justify-content-center">
        <MessageHeader
          key={'messageHeader'}
          ownersId={ownersId}
        />

        <table>
          <tbody>
            {conversation.length > 0
              ? myConversations
              : null
            }
          </tbody>
        </table>

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
