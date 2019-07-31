import React from 'react';
import PropTypes from 'prop-types';

// JSs
import messageShape from '../../helpers/propz/messageShape';
import userShape from '../../helpers/propz/userShape';
import usersData from '../../helpers/data/usersData';
// STYLEs
import './Messages.scss';

class ReceivedMessage extends React.Component {
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
  }

  componentDidMount() {
    this.sortMessages();
    this.findCorrespondent();
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

  findCorrespondent = () => {
    const { message, userid } = this.props;
    const conversationsIds = [];
    if (message.userid1 === userid && message.userid2 !== userid) {
      conversationsIds.push(message.userid2);
    }
    if (message.userid2 === userid && message.userid1 !== userid) {
      conversationsIds.push(message.userid1);
    }
    this.getThatUser(conversationsIds);
  };

  getThatUser = (id) => {
    usersData.getUsers(id)
      .then((resp) => {
        this.setState({ otherPersonInfo: resp[0] });
        const replyObj = {
          // // newMessage: '',
          // // timestamp: '',
          // userid1: '',
          userid2: '',
          username1: '',
          username2: '',
        };
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

export default ReceivedMessage;
