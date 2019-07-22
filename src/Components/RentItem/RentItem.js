import React from 'react';
import PropTypes from 'prop-types';
// JSs
// STYLEs
import './RentItem.scss';
// PROPs
import itemShape from '../../helpers/propz/itemShape';

class RentItem extends React.Component {
  propTypes = {
    item: itemShape.itemShape,
    rentThisItem: PropTypes.func.isRequired,
  }

  rentItem = (e) => {
    e.preventDefault();
    this.props.rentThisItem(e);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="RentItem">
        <button className="btn btn-outline-dark" value={item.ownerId} onClick={this.rentItem}>Rent This Item</button>
      </div>
    );
  }
}

export default RentItem;
