import React from 'react';
import PropTypes from 'prop-types';
// JSs
import msgShape from '../../helpers/propz/msgShape';
// STYLEs
import './MessageRow.scss';
import 'animate.css';

class MessageRow extends React.Component {
  static propTypes = {
    convo: msgShape.msgShape,
    uid: PropTypes.string.isRequired,
  }

  state = {
    received: false,
  }

  componentDidMount() {
    if (this.props.uid === this.props.convo.senderid) {
      this.setState({ received: !this.state.received });
    }
  }

  render() {
    const { convo } = this.props;

    return (
      <div className="MessageRow">
      {/* {this.state.isUnread === true ? <span className="fa fa-circle blueButtonForUnread"></span>: ''} */}
        <p className={`messageP wow bounceIn ${this.state.received === true ? 'sentMessage fadeInRight' : 'receivedMessage fadeInLeft'}`}>{convo.message}</p>
      </div>
    );
  }
}

export default MessageRow;
