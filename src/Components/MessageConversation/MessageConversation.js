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
// SVGs
import userIcon from '../../SVGs/iconmonstr-user-circle-thin.svg';


class MessageConversation extends React.Component {
  static propTypes = {
    convo: PropTypes.arrayOf(msgShape.msgShape),
    i: PropTypes.number,
    getMyMessages: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    ownersId: PropTypes.string,
  }

  state = {
    convoWith: '',
    itemId: '',
    otherUsersId: '',
    itemOwnerId: '',
    userProfPic: '',
    uid: '',
    itemname: '',
    hideSmallCard: false,
    isClicked: false,
    isUnread: false,
    unreadMsgId: '',
  }

  componentDidMount() {
    if (typeof(this.props.ownersId) !== 'undefined') {
      this.setState({
        conversation: [],
        itemId: this.props.itemId,
        uid: firebase.auth().currentUser.uid,
        itemOwnerId: this.props.ownersId,
        otherUsersId: this.props.ownersId,
      });
      this.conversationStarter(this.props.itemId);
      this.whoIsTheOtherUser(this.props.ownersId);
      }
    if (typeof(this.props.ownersId) === 'undefined') {
      const userid = firebase.auth().currentUser.uid;
      const { convo } = this.props;
      const findOutItemId = convo[0].itemId;
      const findWhoOwnsItem = convo[0].itemOwnerId;
      const findWhoIsOtherUser = (convo[0].senderid !== userid ? convo[0].senderid : convo[0].receiverid);
      this.setState({
        uid: userid,
        conversation: this.props.convo,
        otherUsersId: findWhoIsOtherUser,
        itemId: findOutItemId,
        itemOwnerId: findWhoOwnsItem,
      });
      this.conversationStarter(findOutItemId);
      this.whoIsTheOtherUser(findWhoIsOtherUser);
      this.showButtonIfUnread(this.props.convo);
    }
  }

  conversationStarter = (itemId) => {
    itemsData.getSingleItem(itemId)
      .then((resp) => {
          this.setState({ itemname: resp.data.name })
    }).catch(err => console.error('no item found', err));
  };

  whoIsTheOtherUser = (otherUserId) => {
    usersData.getUsers(otherUserId)
      .then((res) => {
        this.setState({ convoWith: res[0].username, userProfPic: res[0].profile });
      }).catch(err => console.error('no other user found', err));
  };

  showThisMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ isClicked: !this.state.isClicked, hideSmallCard: !this.state.hideSmallCard });
  };

  showButtonIfUnread = (convo) => {
    convo.forEach((msg) => {
      console.error(msg.id);
      if (msg.unread === true) {
        console.error(msg, ' in the if');
        // only works, bc last msg will always be unread if any is
        this.setState({ isUnread: true, unreadMsgId: msg.id });
      }
    });
  };

  render() {
    return (
      <div className="MessageInboxLine">
        {this.state.hideSmallCard === true
          ? ''
          : <div onClick={this.showThisMessage} className="messageHeaderDivInbox">
        {this.state.isUnread === true ? <span className="fa fa-circle animated pulse blueButtonForUnread"></span>: ''}
              <div className="inboxCardGuts">
                <div className="profilePicMsgInbox">
                  {this.state.userProfPic !== ''
                    ? <img className="profilePicImgMsgInbox wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" />
                    : <img className="userIcon2" src={userIcon} alt="icon for a user"/>
                  }

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
        }
        <div>
          {this.state.isClicked === true
            ? <MessageCard
                key={`convoWith.${this.state.itemId}`}
                id={`mcardid.${this.state.itemId}`}
                conversation={this.state.conversation}
                itemId={this.state.itemId}
                itemOwnerId={this.state.itemOwnerId}
                otherUsersId={this.state.otherUsersId}
                uid={this.state.uid}
                getMyMessages={this.props.getMyMessages}
                showThisMessage={this.showThisMessage}
                convoWith={this.state.convoWith}
                isClicked={this.state.isClicked}
                hideSmallCard={this.state.hideSmallCard}
                ownersId={this.props.ownersId}
                showButtonIfUnread={this.showButtonIfUnread}
                unreadMsgId={this.state.unreadMsgId}
              />
            : ''}
        </div>
      </div>
    );
  }
}

export default MessageConversation;
