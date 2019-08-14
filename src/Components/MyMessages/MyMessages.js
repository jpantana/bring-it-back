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
    // the below if new message
    // newConvo: false,
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
        const msgs = res.filter(m => m.receiverid === uid || m.senderid === uid);
        const msgsItemIdsArr = [];
        msgs.forEach((m) => {
          msgsItemIdsArr.push(m.itemId);
        });
        const uniqueItemIds = Array.from(new Set(msgsItemIdsArr));
        this.setState({ itemIds: uniqueItemIds });
        const groupOfMsgs = [];
        this.state.itemIds.forEach((itm) => {
          const msgsGroupedByItemId = msgs.filter(m => m.itemId === itm);
          groupOfMsgs.push(msgsGroupedByItemId);
          // will return as many arrays as IDS which may be fewer than inteneded conversations
          });
        const onlyTwoAtATime = [];
        msgs.forEach((m) => {
          onlyTwoAtATime.push(m.senderid);
          onlyTwoAtATime.push(m.receiverid);
        });
        const userIdsInConversations = Array.from(new Set(onlyTwoAtATime));
        const removeUid = userIdsInConversations.filter(id => id !== this.state.uid);
        // trying to build arrays of objects for both itemids and unique user ids
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
        console.error(wholeConversation, 'loop arr');

        // now messages are sorted by unique user id
        // const wholeConvos = [];
        // uniqueItemIds.forEach((itmId) => {
        //   const uniqueItms = [];
        //   conversation.forEach((convo) => {
        //     convo.forEach((c) => {
        //       if (c.itemId === itmId) {
        //       uniqueItms.push(c);
        //       }
        //     });
        //     wholeConvos.push(uniqueItms);
        //   });
        //   this.setState({ something: wholeConvos });
        // });


        // uniqueItemIds.forEach((itemId) => {
        //   const uniqueConversations = [];
        //   removeUid.forEach((id) => {
        //     const assembleConvos = [];
        //     msgs.forEach((msg, i) => {
        //       if (msg.senderid === id || msg.receiverid === id) {
        //         assembleConvos.push(msg);
        //         // has to be in this if that isolates the user id and not the item id
        //       }
        //     });
        //     uniqueConversations.push(assembleConvos);
        //     this.setState({ conversations: uniqueConversations });
        //   });
        // });
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
      itemId,
      conversations,
    } = this.state;

    const test = '';

    const singleMessage = !this.props.location.state ? (
      conversations.map((convo, i) => (
        <MessageConversation
          key={`${i}.messageConversation`}
          convo={convo}
          itemIds={itemIds}
          i={i}
          getMyMessages={this.getMyMessages}
          showThisMessage={this.showThisMessage}
          isClicked={this.state.isClicked}
          hideSmallCard={this.state.hideSmallCard}
          test={test}
        />
      )))
      : (
        <MessageConversation
          key={`${itemId}.messageConversation`}
          itemIds={itemIds}
          getMyMessages={this.getMyMessages}
          showThisMessage={this.showThisMessage}
          isClicked={this.state.isClicked}
          hideSmallCard={this.state.hideSmallCard}
          itemId={itemId}
          ownersId={this.state.ownersId}
      />);

    return (
      <div className="MyMessages">
        <h4 id="welcomeBanner" className="welcomeMsgCenterBanner wow bounceIn fadeInRight">Welcome to your message center</h4>
          <div className="msgConvoDiv">
          {/* {this.state.startingConvo === true
            ? <p className="noConvosYet animated wow pulse">No conversations yet.</p>
            : <div>{singleMessage}</div>} */}
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
