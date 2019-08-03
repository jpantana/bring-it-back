import React from 'react';
// import PropTypes from 'prop-types';
// JSs
import msgShape from '../../helpers/propz/msgShape';

class MessageRow extends React.Component {
  static propTypes = {
    convo: msgShape.msgShape,
  }

  render() {
    const { convo } = this.props;

    return (
      <tr>
        <td>
          {convo.message}
        </td>
      </tr>
    );
  }
}

export default MessageRow;
