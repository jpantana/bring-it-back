import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';
// import moment from 'moment';
// import messagesData from '../../helpers/data/messagesData';
// import MessagesAbout from '../MessagesAbout/MessagesAbout';
// import MessageRow from '../MessageRow/MessageRow';
// import MessageHeader from '../MessageHeader/MessageHeader';
import msgShape from '../../helpers/propz/msgShape';
// STYLEs
import './MessageConversation.scss';
import MessageCard from '../MessageCard/MessageCard';

const defaultNewMsg = {
  uid: '',
  otheruserid: '',
  timestamp: '',
  message: '',
  itemId: '',
  unread: true,
};

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
    // newMsg: defaultNewMsg,
    // ownersId: '',
    // itemId: '',
    // message: '',
    // conversation: [],
    // otherUsersId: [],
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

  // makeMsg = (e) => {
  //   const buildNewMsg = {
  //     uid: this.state.uid,
  //     message: e.target.value,
  //     otheruserid: this.state.ownersId,
  //     timestamp: moment().format('x'),
  //     itemId: this.state.itemId,
  //     unread: true,
  //   };
  //   this.setState({ newMsg: buildNewMsg });
  // };

  // sendMessage = (e) => {
  //   e.preventDefault();
  //   const { newMsg } = this.state;
  //   messagesData.newMessage(newMsg)
  //     .then(() => {
  //       this.props.getMyMessages(this.state.uid);
  //     })
  //     .catch(err => console.error('no new message', err));
  //   this.setState({ newMsg: defaultNewMsg });
  // };

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
    e.preventDefault();
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    // const {
    //   conversation,
    //   ownersId,
    //   uid,
    //   itemId,
    //   newMsg,
    // } = this.state;

    // const myConversations = conversation.map((convo, i) => (
    //     <MessageRow
    //       key={`${i}.messageRow`}
    //       convo={convo}
    //       uid={uid}
    //     />
    // ))


    return (
      <div onClick={this.showThisMessage} className="MessageInboxLine">

        <div className="messageHeaderDiv">
            <div className="profilePicMsgInbox">
              <img className="profilePicImgMsgInbox wow bounceIn" src={this.state.userProfPic} alt="conversation recipient profile" />
            </div>
            <p className="wow bounceIn msgWith">{this.state.convoWith}</p>
            <p className="msgIsAbt" id={this.state.itemId} >{this.state.itemname}</p>
        </div>

        <div>
          {this.state.isClicked === true
            ? <MessageCard
                key={`convoWith.${this.state.ownersId}`}
                conversation={this.state.conversation}
                itemId={this.state.ownersId}
                ownersId={this.state.ownersId}
                uid={this.state.uid}
                showThisMessage={this.showThisMessage}
              />
            : ''}
        </div>
        {/* <div className="msgHeaderCompDiv">
          <MessageHeader
            key={`messageHeader${ownersId}`}
            ownersId={ownersId}
          />
          {itemId !== ''
            ? <MessagesAbout
              key={`messagesAbout.${itemId}`}
              itemId={itemId}
            />
            : ''}
        </div>
        <div className="msgTableDiv">
          <div>{conversation.length > 0
            ? myConversations
            : null
          }</div>
        </div>

        <div className="Messages">
            <div className="sendMessageForm">
            {ownersId !== ''
              ? <div className="msgInputDiv">
                  <input
                  type="text"
                  id="messageInput"
                  placeholder=" say something kind..."
                  value={newMsg.message}
                  onChange={this.makeMsg}
                />
                <label className="msgLabel" htmlFor="messageInput">
                  <button
                      className="btn sendMessageBtn"
                      onClick={this.sendMessage}
                    >Send
                  </button>
                </label>
                </div>
              : ''
            }
          </div>
        </div> */}
      </div>
    );
  }
}

export default MessageConversation;
