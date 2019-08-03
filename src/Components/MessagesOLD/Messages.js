import React from 'react';
import PropTypes from 'prop-types';

// JSs
import messageShape from '../../helpers/propz/messageShape';
import userShape from '../../helpers/propz/userShape';
import usersData from '../../helpers/data/usersData';
// STYLEs
import './Messages.scss';

class Messages extends React.Component {
  static propTypes = {
    message: messageShape.messageShape,
    userid: PropTypes.string.isRequired,
    paramOwnerId: PropTypes.string,
    owner: userShape.userShape,
    user: userShape.userShape,
  }

  state = {
    sentMessages: {},
    receivedMessages: {},
    otherPersonInfo: {},
    otherPersonId: '',
  }

  componentDidMount() {
    this.sortMessages();
    this.pickupOldConversations();
  }

  sortMessages = () => {
    const { message, userid } = this.props;
    if (message.userid1 === userid) {
      this.setState({ sentMessages: message });
    }
    if (message.userid2 === userid) {
      this.setState({ receivedMessages: message });
    }
  };

  // figures who you've messaged with and sets state w their id
  pickupOldConversations = () => {
    const { message, userid } = this.props;
    if (message.userid1 === userid || message.userid2 === userid) {
      if (userid !== message.userid2) {
        this.setState({ otherPersonId: message.userid2 });
      } else if (userid !== message.userid1) {
        this.setState({ otherPersonId: message.userid1 });
      }
    }
    setTimeout(() => {
      this.getThatUser();
    }, 300);
  };

  // takes above functions id and fetches that user
  getThatUser = () => {
    const { otherPersonId } = this.state;
    usersData.getUsers(otherPersonId)
      .then((resp) => {
        this.setState({ otherPersonInfo: resp[0] });
      })
      .catch(err => console.error('did not get reply user', err));
  };


  render() {
    const { receivedMessages, sentMessages } = this.state;

    return (
      <div className="ReceivedMessage">
        {Object.keys(receivedMessages).length === 0 && receivedMessages.constructor === Object ? ''
          : <div className="receivedtMsg">
            <p className="textLeft"><span className="from">From  {receivedMessages.username1}</span></p>
            <p className="textLeft">{receivedMessages.newMessage}</p>
          </div>
        }

        {Object.keys(sentMessages).length === 0 && sentMessages.constructor === Object ? ''
          : <div className="sentMsg">
              <p className="textRight"><span className="from">From  {sentMessages.username1}</span></p>
              <p className="textRight">{sentMessages.newMessage}</p>
             </div>}

      </div>
    );
  }
}

export default Messages;
