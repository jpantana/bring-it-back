import React from 'react';
import PropTypes from 'prop-types';
// PROPs
import msgShape from '../../helpers/propz/msgShape';

class Conversations extends React.Component {
  static propTypes = {
    convo: msgShape.msgShape,
    talkingTo: PropTypes.string.isRequired,
  }

  componentDidMount() {
    // const { otheruserid } = this.props;
    // usersData.getUsers(otheruserid).then((res) => {
    // }).catch(err => console.error('no user in convo', err));
  }

  render() {
    const { convo } = this.props;

    return (
      <div className="MessageRow">
        <p className="messageP">{convo.user}</p>
      </div>
    );
  }
}

export default Conversations;
