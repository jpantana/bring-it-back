import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';
import MessageCard from '../MessageCard/MessageCard';
import msgShape from '../../helpers/propz/msgShape';
// STYLEs
import './MessageConversation.scss';
import 'animate.css';

class MessageConversation extends React.Component {
  static propTypes = {
    convo: PropTypes.arrayOf(msgShape.msgShape).isRequired,
    // otherUsersId: PropTypes.arrayOf().isRequired,
    // itemIds: PropTypes.arrayOf().isRequired,
    getMyMessages: PropTypes.func.isRequired,
  }

  state = {
    convoWith: '',
    itemId: '',
    otherUsersId: [],
    ownersId: '',
    userProfPic: '',
    uid: '',
    itemname: '',
    isClicked: false,
  }

  componentDidMount() {
    this.setState({
      conversation: this.props.convo,
      uid: firebase.auth().currentUser.uid,
      otherUsersId: this.props.otherUsersId,
      itemId: this.props.itemIds[this.props.i],
      ownersId: this.props.otherUsersId[this.props.i],
    });
    this.conversationHeader(this.props.otherUsersId[this.props.i]);
    this.showItemName(this.props.itemIds[this.props.i]);
  }

  conversationHeader = (ownersId) => {
    this.setState({ ownersId });
    usersData.getUsers(ownersId)
      .then((res) => {
        this.setState({ convoWith: res[0].username, userProfPic: res[0].profile });
      }).catch(err => console.error('no users in msg header', err));
  };

  showItemName = (itmId) => {
    itemsData.getSingleItem(itmId)
      .then((res) => {
        this.setState({ itemname: res.data.name });
      })
      .catch(err => console.error('no convo about item', err));
  };

  showThisMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    return (
      <div className="MessageInboxLine">

        <div onClick={this.showThisMessage} className="messageHeaderDivInbox">
          <div className="inboxCardGuts">
            <div className="profilePicMsgInbox">
              <img className="profilePicImgMsgInbox wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" />
            </div>
            <div className="inboxItemDetails">
              <p className="wow bounceIn msgWithInbox">{this.state.convoWith}</p>
              <div className="aboutInboxDiv">
                <p className="aboutInbox">About...</p>
                <p className="msgIsAbtInbox" id={this.state.itemId} >{this.state.itemname}</p>
              </div>
            </div>
          </div>


        </div>

        <div>
          {this.state.isClicked === true
            ? <MessageCard
                key={`convoWith.${this.state.ownersId}`}
                id={`mcardid.${this.state.ownersId}`}
                conversation={this.state.conversation}
                itemId={this.state.itemId}
                ownersId={this.state.ownersId}
                uid={this.state.uid}
                getMyMessages={this.props.getMyMessages}
                showThisMessage={this.showThisMessage}
              />
            : ''}
        </div>
      </div>
    );
  }
}

export default MessageConversation;
