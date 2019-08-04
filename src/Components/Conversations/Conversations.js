import React from 'react';
// import PropTypes from 'prop-types';
// JSs
// import MessagesAbout from '../MessagesAbout/MessagesAbout';
// PROPs
// import msgShape from '../../helpers/propz/msgShape';

class Conversations extends React.Component {
  static propTypes = {
    // item: msgShape.msgShape,
    // talkingTo: PropTypes.arrayOf().isRequired,
    // talkingAbout: PropTypes.string.isRequired,
  }

  render() {
    const { talkingTo } = this.props;
    // const talkAbout = talkingAbout.map((m, i) => (
    //   <MessagesAbout
    //     key={`${i}.messageabout`}
    //     m={m}
    //   />
    // ));

    return (
      <div className="MessageRow">
        <p className="messageP">{talkingTo}hisfsdf</p>
        {/* <p className="messageP">{talkAbout}</p> */}
      </div>
    );
  }
}

export default Conversations;
