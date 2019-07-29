import React from 'react';
import PropTypes from 'prop-types';

// JSs
import messageShape from '../../helpers/propz/messageShape';
// STYLEs
import './ReceivedMessage.scss';

class ReceivedMessage extends React.Component {
  static propTypes = {
    message: messageShape.messageShape,
    userid: PropTypes.string.isRequired,
    paramOwnerId: PropTypes.string.isRequired,
  }

  state = {
    sentMessages: {},
    receivedMessages: {},
  }

  componentDidMount() {
    this.sortMessages();
  }

  sortMessages = () => {
    const { message, userid } = this.props;
    if (message.userid1 === userid) {
      this.setState({ sentMessages: message });
    }
    if (message.userid2 === userid) {
      this.setState({ receivedMessages: message });
    }
    // const msgsISent = resp.filter(m => m.userid1 === uid);
    // const msgsIGot = resp.filter(m => m.userid1 === this.state.paramOwnerId);
  };

  render() {
    const { receivedMessages, sentMessages } = this.state;
    console.error(receivedMessages);

    return (
      <div className="ReceivedMessage">
        {Object.keys(receivedMessages).length === 0 && receivedMessages.constructor === Object ? ''
          : <div className="receivedtMsg">
            <p className="textLeft">From {receivedMessages.username1}</p>
            <p className="textLeft">{receivedMessages.newMessage}</p>
          </div>
        }

        {Object.keys(sentMessages).length === 0 && sentMessages.constructor === Object ? ''
          : <div className="sentMsg">
              <p className="textRight">From {sentMessages.username1}</p>
              <p className="textRight">{sentMessages.newMessage}</p>
             </div>}

      </div>
    );
  }
}

export default ReceivedMessage;
