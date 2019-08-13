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
import MessageCard from '../MessageCard/MessageCard';

class MyMessages extends React.Component {
  state = {
    uid: '',
    itemIds: [],
    conversations: [],
    otherUsersId: '',
    // the below if new message
    newConvo: false,
    ownersId: '',
    itemId: '',
    // for message card depending on where it gets called from
    isClicked: false,
    hideSmallCard: false,
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

  hideThisCard = () => {
    this.setState({ newConvo: false });
  };

  showThisMessage = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ isClicked: !this.state.isClicked, hideSmallCard: !this.state.hideSmallCard });
  };

  render() {
    const {
      itemIds,
      otherUsersId,
      conversations,
    } = this.state;

    // const singleMessage = conversations.map((convo, i) => (
    //   <MessageConversation
    //     key={`${i}.messageConversation`}
    //     convo={convo}
    //     itemIds={itemIds}
    //     otherUsersId={otherUsersId}
    //     getMyMessages={this.getMyMessages}
    //     i={i}
    //     // seeSingleMessage={this.seeSingleMessage}
    //     showThisMessage={this.showThisMessage}
    //     isClicked={this.state.isClicked}
    //     hideSmallCard={this.state.hideSmallCard}
    //   />
    // ));

    // const loadZLocs = load ? (
    //   <ZomatoLocation
    //   key={'zomato'}
    //   zomatoLocations={zomatoLocs}
    //   currentLocations={locations}
    //   addZomatoLocation={this.addZomatoLocation} />) : (
    //   <Spinner type="grow" className="zLocSpinner m-5" color="info" />);

    const singleMessage = !this.props.location.state ? (
      conversations.map((convo, i) => (
      <MessageConversation
        key={`${i}.messageConversation`}
        convo={convo}
        itemIds={itemIds}
        otherUsersId={otherUsersId}
        getMyMessages={this.getMyMessages}
        i={i}
        // seeSingleMessage={this.seeSingleMessage}
        showThisMessage={this.showThisMessage}
        isClicked={this.state.isClicked}
        hideSmallCard={this.state.hideSmallCard}
      />
      )))
      : (
        <MessageConversation
          key={`${otherUsersId}.messageConversation`}
          itemIds={itemIds}
          otherUsersId={otherUsersId}
          getMyMessages={this.getMyMessages}
          showThisMessage={this.showThisMessage}
          isClicked={this.state.isClicked}
          hideSmallCard={this.state.hideSmallCard}
          itemId={this.state.itemId}
          ownersId={this.state.ownersId}
      />);

    return (
      <div className="MyMessages">
        <h4 id="welcomeBanner" className="welcomeMsgCenterBanner wow bounceIn fadeInRight">Welcome to your message center</h4>
        {this.state.newConvo === true
          ? <div>
              <MessageCard
                id={`mcardid.${this.state.ownersId}`}
                key={`convoWith.${this.state.ownersId}`}
                conversation={this.state.conversation}
                itemId={this.state.itemId}
                ownersId={this.state.ownersId}
                uid={this.state.uid}
                getMyMessages={this.getMyMessages}
                hideThisCard={this.hideThisCard}
                isClicked={this.state.isClicked}
                hideSmallCard={this.state.hideSmallCard}
                showThisMessage={this.showThisMessage}
              />
            </div>
          : ''}

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
