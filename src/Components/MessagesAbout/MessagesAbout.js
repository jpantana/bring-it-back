import React from 'react';
import PropTypes from 'prop-types';
// PROPs
// import msgShape from '../../helpers/propz/msgShape';

class MessagesAbout extends React.Component {
  static propTypes = {
    m: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="MessagesAbout">
       {this.props.m}
      </div>
    );
  }
}

export default MessagesAbout;
