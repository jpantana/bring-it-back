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
    convo: PropTypes.arrayOf(msgShape.msgShape).isRequired,
    otherUsersId: PropTypes.array.isRequired,
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
    otherUsersId: [],
    ownersId: '',
    userProfPic: '',
    uid: '',
    itemname: '',
  }

  componentDidMount() {
    if (this.props.ownersId) {
      this.setState({
        ownersId: this.props.ownersId,
        itemId: this.props.itemId,
        uid: firebase.auth().currentUser.uid,
        otherUsersId: this.props.ownersId,
      });
      // look at the props of conversation on new message request
      // you need to request item for its name and username and profile pic from props.param
      this.conversationHeader(this.props.ownersId);
      this.showItemName(this.props.itemId);
    } else {
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

  showWholeMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.props.showThisMessage();
    // this.setState({ isClicked: !this.state.isClicked, hideSmallCard: !this.state.hideSmallCard });
  };

  // getAdditionalInfoForNewConvo = () => {

  // };

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
                key={`convoWith.${this.state.ownersId}`}
                id={`mcardid.${this.state.ownersId}`}
                conversation={this.state.conversation}
                itemId={this.state.itemId}
                ownersId={this.state.ownersId}
                uid={this.state.uid}
                getMyMessages={this.props.getMyMessages}
                showThisMessage={this.props.showThisMessage}
                sendNewMessage={this.sendNewMessage}
                isClicked={this.props.isClicked}
                hideSmallCard={this.props.hideSmallCard}
              />
            : ''}
        </div>
      </div>
    );
  }
}

export default MessageConversation;
