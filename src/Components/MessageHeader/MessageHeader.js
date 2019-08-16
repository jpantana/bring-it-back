import React from 'react';
import PropTypes from 'prop-types';
// JSs
import usersData from '../../helpers/data/usersData';
// STYLEs
import './MessageHeader.scss';
import 'animate.css';
// SVGs
import userIcon from '../../SVGs/iconmonstr-user-circle-thin.svg';

class MessageHeader extends React.Component {
  static propTypes = {
    showThisMessage: PropTypes.func,
    convoWith: PropTypes.string,
    otherUser: PropTypes.string,
    removedUnreadNotificatonInSmallCard: PropTypes.func.isRequired,
  }

  state = {
    convoWith: '',
    ownersId: '',
    otherUser: '',
    userProfPic: '',
  }

  componentDidMount() {
    this.setState({ otherUser: this.props.otherUser });
    this.conversationHeader(this.props.otherUser);
  }

  conversationHeader = (otherUser) => {
    this.setState({ otherUser });
    usersData.getUsers(otherUser)
      .then((res) => {
        this.setState({ convoWith: this.props.convoWith, userProfPic: res[0].profile });
      }).catch(err => console.error('no users in msg header', err));
  };

  hideThisMessage = (e) => {
    e.preventDefault();
    this.props.showThisMessage();
    this.props.removedUnreadNotificatonInSmallCard();
  };

  render() {
    return (
      <div onClick={this.hideThisMessage}>
        {this.state.convoWith !== ''
          ? <div className="messageHeaderDiv">
            <div className="profilePicMsg">
            {this.state.userProfPic !== ''
              ? <img className="profilePicImgMsg wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" />
              : <img className="userIcon3" src={userIcon} alt="icon for a user"/>
            }
              {/* <img className="profilePicImgMsg wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" /> */}
            </div>
            <p className="wow bounceIn msgWith">{this.state.convoWith}</p>
            {/* <p>{this.state.convoAbout}</p> */}
          </div>
          : <p className="startAConversation">break the ice with {this.props.convoWith}!</p>}
      </div>
    );
  }
}

export default MessageHeader;
