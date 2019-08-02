import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
// JSs
import messageShape from '../../helpers/propz/messageShape';
// STYLEs
import './SentMessages.scss';

const defaultMessageShape = {
  id: '',
  newMessage: '',
  username1: '',
  userid1: '',
  username2: '',
  userid2: '',
  timestamp: '',
};

class SentMessages extends React.Component {
  static propTypes = {
    message: messageShape.messageShape,
    uid: PropTypes.string.isRequired,
  }

  state = {
    uid: '',
    user1: defaultMessageShape,
    user2: defaultMessageShape,
  }

  componentDidMount() {
    this.sortConversations();
  }

  sortConversations = () => {
    const { message, uid } = this.props;
    if (message.userid1 === uid) {
      this.setState({ user1: message, whoSent: 'user1' });
    } else if (message.userid1 === uid) {
      this.setState({ user2: message, whoSent: 'user2' });
    }
  };

  render() {
    return (
      <div className="card" onClick={this.continueConversation}>
        <h4>Sent</h4>
        <p>From {this.props.message.username2}</p>
        <p>{this.props.message.newMessage}</p>
      </div>
    );
  }
}

export default SentMessages;
