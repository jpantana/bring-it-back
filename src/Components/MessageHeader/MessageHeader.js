import React from 'react';
import PropTypes from 'prop-types';
// JSs
import usersData from '../../helpers/data/usersData';
// STYLEs
import './MessageHeader.scss';
import 'animate.css';

class MessageHeader extends React.Component {
  static propTypes = {
    showThisMessage: PropTypes.func,
  }

  state = {
    convoWith: '',
    ownersId: '',
    // convoAbout: '',
    userProfPic: '',
  }

  componentDidMount() {
    this.setState({ ownersId: this.props.ownersId });
    this.conversationHeader(this.props.ownersId);
  }

  conversationHeader = (ownersId) => {
    this.setState({ ownersId });
    usersData.getUsers(ownersId)
      .then((res) => {
        this.setState({ convoWith: res[0].username, userProfPic: res[0].profile });
      }).catch(err => console.error('no users in msg header', err));
  };

  // hideThisMessage = (e) => {
  //   e.preventDefault();
  //   this.props.showThisMessage();
  // };

  render() {
    return (
      <div onClick={this.hideThisMessage}>
        {this.state.convoWith !== ''
          ? <div className="messageHeaderDiv">
            <div className="profilePicMsg">
              <img className="profilePicImgMsg wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" />
            </div>
            <p className="wow bounceIn msgWith">{this.state.convoWith}</p>
            {/* <p>{this.state.convoAbout}</p> */}
          </div>
          : <p className="noConvosYet">You haven't started any conversations.</p>}
      </div>
    );
  }
}

export default MessageHeader;
