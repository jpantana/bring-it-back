import React from 'react';
import PropTypes from 'prop-types';
// JSs
import itemsData from '../../helpers/data/itemsData';
// STYLEs
import './MessagesAbout.scss';

class MessagesAbout extends React.Component {
  static propTypes = {
    itemId: PropTypes.string.isRequired,
  }

  state = {
    itemId: '',
    itemname: '',
  }

  componentDidMount() {
    this.showItemName();
  }

  showItemName = () => {
    const itmId = document.getElementById(`${this.props.itemId}`);
    itemsData.getAllItems()
      .then((res) => {
        const findItm = res.filter(itm => itm.id === itmId.id);
        this.setState({ itemname: findItm[0].name });
      })
      .catch(err => console.error('no convo about item', err));
  };

  render() {
    return (
      <div className="MessagesAbout">
        <p className="msgIsAbt" id={this.props.itemId} >{this.state.itemname}</p>
      </div>
    );
  }
}

export default MessagesAbout;
