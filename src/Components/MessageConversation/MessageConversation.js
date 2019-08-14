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
    // otherUsersId: PropTypes.array.isRequired,
    itemIds: PropTypes.array.isRequired,
    getMyMessages: PropTypes.func.isRequired,
    isClicked: PropTypes.bool.isRequired,
    hideSmallCard: PropTypes.bool.isRequired,
    showThisMessage: PropTypes.func.isRequired,
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
      const findWhoOwnsItem = [];
      const findWhoIsOtherUser = [];
      const findOutItemId = [];
      this.props.convo.forEach((c) => {
        findWhoOwnsItem.push(c.itemOwnerId);
        findOutItemId.push(c.itemId);
        if (userid === c.sender) {
          findWhoIsOtherUser.push(c.otheruserid);
        } else {
          findWhoIsOtherUser.push(c.senderid);
        }
      });
      const whoOwnsItem = Array.from(new Set(findWhoOwnsItem));
      const whoIsOtherUser = Array.from(new Set(findWhoIsOtherUser));
      const whatsIsItemId = Array.from(new Set(findOutItemId))
      this.setState({
        uid: userid,
        conversation: this.props.convo,
        otherUsersId: whoIsOtherUser[0],
        itemId: whatsIsItemId[0],
        itemOwnerId: whoOwnsItem[0],
      });
      this.conversationStarter(whatsIsItemId[0]);
      this.whoIsTheOtherUser(whoIsOtherUser[0]);
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

  showWholeMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.props.showThisMessage();
    // all cards share the state of hideSmallCard so they all hide and show based on a single click
  };

  render() {
    return (
      <div className="MessageInboxLine">
        {this.props.hideSmallCard === true
          ? ''
          : <div onClick={this.showWholeMessage} className="messageHeaderDivInbox">
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
          {this.props.isClicked === true
            ? <MessageCard
                key={`convoWith.${this.state.itemId}`}
                id={`mcardid.${this.state.itemId}`}
                conversation={this.state.conversation}
                itemId={this.state.itemId}
                itemOwnerId={this.state.itemOwnerId}
                otherUsersId={this.state.otherUsersId}
                uid={this.state.uid}
                getMyMessages={this.props.getMyMessages}
                showThisMessage={this.props.showThisMessage}
                isClicked={this.props.isClicked}
                hideSmallCard={this.props.hideSmallCard}
                convoWith={this.state.convoWith}
              />
            : ''}
        </div>
      </div>
    );
  }
}

export default MessageConversation;
