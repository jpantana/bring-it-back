import React from 'react';
// JSs
import usersData from '../../helpers/data/usersData';
// STYLEs
import './MessageHeader.scss';
import 'animate.css';

class MessageHeader extends React.Component {
  static propTypes = {

  }

  state = {
    convoWith: '',
    ownersId: '',
    convoAbout: '',
    userProfPic: '',
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.ownersId !== this.props.ownersId) {
      this.setState({ ownersId: prevProps.ownersId });
      this.conversationHeader(prevProps.ownersId);
    }
  }

  conversationHeader = (ownersId) => {
    this.setState({ ownersId });
    usersData.getUsers(ownersId)
      .then((res) => {
        this.setState({ convoWith: res[0].username, userProfPic: res[0].profile });
      }).catch(err => console.error('no users in msg header', err));
  };

  render() {
    return (
      <div className="messageHeaderDiv">
        <div className="profilePicMsg">
          <img className="profilePicImgMsg wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" />
        </div>
        <p className="wow bounceIn msgWith">{this.state.convoWith}</p>
        <p>{this.state.convoAbout}</p>

      </div>
    );
  }
}

export default MessageHeader;
