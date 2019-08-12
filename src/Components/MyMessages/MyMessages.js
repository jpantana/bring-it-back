import React from 'react';
import $ from 'jquery';
// JSs
import MessageConversation from '../MessageConversation/MessageConversation';
import messagesData from '../../helpers/data/messagesData';
import itemsData from '../../helpers/data/itemsData';
import Footer from '../Footer/Footer';
// STYLEs
import './MyMessages.scss';
import 'animate.css';

class MyMessages extends React.Component {
  state = {
    uid: '',
    itemIds: [],
    conversations: [],
    otherUsersId: '',
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
        const msgs = res.filter(m => m.otheruserid === uid || m.uid === uid);
        // now we've isolated messages that we're a part of
        const msgsItemIdsArr = [];
        msgs.forEach((m) => {
          msgsItemIdsArr.push(m.itemId);
        });
        this.setState({ itemIds: Array.from(new Set(msgsItemIdsArr)) });
        // now we have the unique item ids within the messages objects to group by
        const groupOfMsgs = [];
        const otherPerson = [];
        this.state.itemIds.forEach((itm) => {
          const msgsGroupedByItemId = msgs.filter(m => m.itemId === itm);
          groupOfMsgs.push(msgsGroupedByItemId);
          msgsGroupedByItemId.forEach((c, i) => {
            if (c.uid !== uid) {
              // you sent to
              otherPerson.push(c.uid);
            } else if (c.otheruserid !== uid) {
              // you received from
              otherPerson.push(c.otheruserid);
            }
          });
          this.setState({ otherUsersId: Array.from(new Set(otherPerson)) });
          // now we have an array of objects that constitute our had conversations
          itemsData.getSingleItem(itm)
            .then(() => {
              // here we return the item objects via resp
            }).catch(err => console.error('no such item found', err));
        });
        // here we set state with an array of objects that are our conversations
        // we can loop over this in the render and form a new component
        this.setState({ conversations: groupOfMsgs });
      })
      .catch(err => console.error('no group messages', err));
  };

  render() {
    const {
      itemIds,
      otherUsersId,
      conversations,
    } = this.state;

    const singleMessage = conversations.map((convo, i) => (
      <MessageConversation
        key={`${i}.messageConversation`}
        convo={convo}
        itemIds={itemIds}
        otherUsersId={otherUsersId}
        getMyMessages={this.getMyMessages}
        i={i}
        seeSingleMessage={this.seeSingleMessage}
      />
    ));

    return (
      <div className="MyMessages">
        <h4 id="welcomeBanner" className="welcomeMsgCenterBanner wow bounceIn fadeInRight">Welcome to your message center</h4>
        <div className="msgConvoDiv">
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
