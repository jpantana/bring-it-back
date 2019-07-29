import React from 'react';
import PropTypes from 'prop-types';
import messagesData from '../../helpers/data/messagesData';
import itemsRentedData from '../../helpers/data/itemsRentedData';
import usersData from '../../helpers/data/usersData';

class Messages extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
  }

  state = {
    newMessage: {},
    canMessage: false,
    renterId: '',
    ownerId: '',
    ownerUsername: '',
    renterUsername: '',
    messagePostId: '',
    sentBy: '',
    isGetting: [],
    hasSent: [],
  }

  componentDidMount() {
    this.getItemsRented();
    this.getReceievedMessages();
  }

  getItemsRented = () => {
    itemsRentedData.getRentals()
      .then((res) => {
        const { renterId } = res[0];
        const { ownerId } = res[0];
        const { userid } = this.props;
        if (renterId === userid) {
          usersData.getUsers(userid).then((resp) => {
            this.setState({ renterUsername: resp[0].username });
            usersData.getUsers(ownerId).then((resp2) => {
              this.setState({ ownerUsername: resp2[0].username });
            });
          }).catch(err => console.error('no user in messages.js', err));
          this.setState({
            canMessage: true,
            renterId: res[0].renterId,
            ownerId: res[0].ownerId,
          });
        }
      })
      .catch(err => console.error('no items rented', err));
  };

  getReceievedMessages = () => {
    const { userid } = this.props;
    messagesData.getMessages()
      .then((resp) => {
        const isGettingMsg = resp.filter(message => userid !== this.state.sentBy);
        const hasSentMsg = resp.filter(message => userid === this.state.sentBy);
        this.setState({ isGetting: isGettingMsg, hasSent: hasSentMsg });
      })
      .catch(err => console.error('no messages for user', err));
  };

  // displayMessages = () => {
  //   // const { messagePostId } = this.state;
  //   const { userid } = this.props;
  //   messagesData.getMessages()
  //     .then((resp) => {
  //       const ownerMessages = resp.filter(m => m.ownerId === userid);
  //       const renterMessages = resp.filter(m => m.renterId === userid);
  //       console.error(ownerMessages, 'display messages owner');
  //       console.error(renterMessages, 'display messages renter');
  //     })
  //     .catch(err => console.error('no messages for user', err));
  // };

  myMessage = (e) => {
    e.preventDefault();
    const message = e.target.value;
    this.setState({ newMessage: { message } });
  };

  sendMessage = (e) => {
    e.preventDefault();
    if (this.state.canMessage === true) {
      const messagesBetweenObj = {
        newMessage: this.state.newMessage,
        renterId: this.state.renterId,
        ownerId: this.state.ownerId,
        ownerUsername: this.state.ownerUsername,
        renterUsername: this.state.renterUsername,
        sentBy: this.props.userid,
      };
      messagesData.newMessage(messagesBetweenObj)
        .then((res) => {
          this.setState({ messagePostId: res.data.name });
          console.error(res.data.name, 'send message');
        })
        .catch(err => console.error('no new message', err));
    }
  };

  showWholeMessage = (e) => {
    e.preventDefault();
  };

  render() {
    const { newMessage, isGetting } = this.state;

    const showMessagesReceived = isGetting.map(got => (
      <div>{got}</div>
    ));

    return (
      <div className="Messages">
        <h2>Messages</h2>
        <div className="displayMessagesDiv" onClick={this.showWholeMessage}>
          {this.messagesSmall}
        </div>
        <div className="displayMessagesDiv">
          {/* {showMessagesReceived} */}
        </div>
        <div>
          <label htmlFor="messageInput">Send Message</label>
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
