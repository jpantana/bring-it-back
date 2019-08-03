import React from 'react';
// import PropTypes from 'prop-types';
// JSs
import msgShape from '../../helpers/propz/msgShape';
// STYLEs
import './MessageRow.scss';

class MessageRow extends React.Component {
  static propTypes = {
    convo: msgShape.msgShape,
  }

  render() {
    const { convo } = this.props;

    return (
      <div className="MessageRow">
        <p className="messageP">{convo.message}</p>
      </div>
    );
  }
}

export default MessageRow;
