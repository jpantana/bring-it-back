import React from 'react';
import $ from 'jquery';
// JSs
import MessageConversation from '../MessageConversation/MessageConversation';
import messagesData from '../../helpers/data/messagesData';
// import itemsData from '../../helpers/data/itemsData';
import Footer from '../Footer/Footer';
// STYLEs
import './MyMessages.scss';
import 'animate.css';
// import MessageCard from '../MessageCard/MessageCard';

class MyMessages extends React.Component {
  state = {
    uid: '',
    itemIds: [],
    conversations: [],
    otherUsersId: '',
    ownersId: '',
    itemId: '',
    // cardIsDisplayed: false,
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    if (this.props.location.state) {
      const { ownersId, itemId } = this.props.location.state;
      this.setState({ ownersId, itemId });
    }
    this.setState({ uid });
    this.getMyMessages(uid);
    this.hideBanner();
  }

  hideBanner = () => {
    setTimeout(() => {
      $('#welcomeBanner').addClass(' fadeOutLeft');
    }, 2500);
    setTimeout(() => {
      $('#welcomeBanner').addClass(' hide');
    }, 3100);
  };


  getMyMessages = (uid) => {
    messagesData.getReceivedMessages()
      .then((res) => {
        const msgs = res.filter(m => m.receiverid === uid || m.senderid === uid);
        const msgsItemIdsArr = [];
        msgs.forEach((m) => {
          msgsItemIdsArr.push(m.itemId);
        });
        const uniqueItemIds = Array.from(new Set(msgsItemIdsArr));
        const groupOfMsgs = [];
        this.state.itemIds.forEach((itm) => {
          const msgsGroupedByItemId = msgs.filter(m => m.itemId === itm);
          groupOfMsgs.push(msgsGroupedByItemId);
          });
        const onlyTwoAtATime = [];
        msgs.forEach((m) => {
          onlyTwoAtATime.push(m.senderid);
          onlyTwoAtATime.push(m.receiverid);
        });
        const userIdsInConversations = Array.from(new Set(onlyTwoAtATime));
        const removeUid = userIdsInConversations.filter(id => id !== this.state.uid);
        const conversation = [];
        removeUid.forEach((unq) => {
          const uniqueUserConversations = [];
          msgs.forEach((msg) => {
            if (msg.senderid === unq || msg.receiverid === unq) {
              uniqueUserConversations.push(msg);
            }
          });
          conversation.push(uniqueUserConversations);
        });
        const convos = [];
        conversation.forEach((convo) => {
          uniqueItemIds.forEach((itmId) => {
            const loopArr1 = [];
            convo.forEach((c) => {
              if (c.itemId === itmId) {
                loopArr1.push(c);
              }
            });
            convos.push(loopArr1);
          });
        });
        const wholeConversation = [];
        convos.forEach((c) => {
          if (c.length !== 0) {
            wholeConversation.push(c);
          }
        });
        this.setState({ conversations: wholeConversation });
      })
      .catch(err => console.error('no group messages', err));
  };

  // hideAllSmallCards = () => {
  //   this.setState({ cardIsDisplayed: !this.state.cardIsDisplayed });
  // };

  render() {
    const {
      itemId,
      conversations,
    } = this.state;

    const singleMessage = !this.props.location.state ? (
      conversations.map((convo, i) => (
        <MessageConversation
          key={`${i}.messageConversation`}
          convo={convo}
          i={i}
          getMyMessages={this.getMyMessages}
          showThisMessage={this.showThisMessage}
          // hideAllSmallCards={this.hideAllSmallCards}
        />
      )))
      : (
        <MessageConversation
          key={`${itemId}.messageConversation`}
          getMyMessages={this.getMyMessages}
          showThisMessage={this.showThisMessage}
          itemId={itemId}
          ownersId={this.state.ownersId}
      />);

    return (
      <div className="MyMessages">
        <h4 id="welcomeBanner" className="welcomeMsgCenterBanner wow bounceIn fadeInRight">Welcome to your message center</h4>
          <div className="msgConvoDiv">
            {/* {this.state.cardIsDisplayed === false
              ? singleMessage
              : ''} */}
              {singleMessage}
          </div>
        <div className="footerDiv">
          <Footer key={'footer'} />
        </div>
      </div>
    );
  }
}

export default MyMessages;
