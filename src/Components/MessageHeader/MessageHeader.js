import React from 'react';
// JSs
import usersData from '../../helpers/data/usersData';
import './MessageHeader.scss';

class MessageHeader extends React.Component {
  static propTypes = {

  }

  state = {
    convoWith: '',
  }

  componentWillReceiveProps() {
    const { ownersId } = this.props;
    if (this.props.ownerId !== null) {
      usersData.getUsers(ownersId)
        .then((res) => {
          this.setState({ convoWith: res[0].username });
        }).catch(err => console.error('no users in msg header', err));
    }
  }

  conversationHeader = () => {
    const { ownersId } = this.props;
    if (this.props.ownerId !== null) {
      usersData.getUsers(ownersId)
        .then((res) => {
          console.error(res);
          // this.setState({ convoWith: res[0].username });
        }).catch(err => console.error('no users in msg header', err));
    }
  };

  render() {
    return (
      <div className="messageHeaderDiv">
        <p>{this.state.convoWith}</p>

      </div>
    );
  }
}

export default MessageHeader;
