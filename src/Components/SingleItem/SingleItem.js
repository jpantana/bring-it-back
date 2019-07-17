import React from 'react';
import PropTypes from 'prop-types';
// PROPs
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import checkIcon from '../../SVGs/iconmonstr-check-mark-6.svg';

class SingleItem extends React.Component {
  static propTypes = {
    singleItem: itemShape.itemShape,
    isClicked: PropTypes.bool.isRequired,
    unseeSingleItem: PropTypes.func.isRequired,
  }

  singleItemHide = (e) => {
    e.preventDefault();
    const { unseeSingleItem } = this.props;
    unseeSingleItem();
  };

  render() {
    // IDEAS: carousel of imgs; calculator for price booking; messaging users
    const { singleItem } = this.props;
    return (
      <div>
        <div className="card fullCard" onClick={this.singleItemHide}>
        <img className="card-img-top itemImg" src={singleItem.imageUrl} alt={(`${singleItem.name}`)} />
        <div className="card-body">
          <h5 className="card-title">{singleItem.name}</h5>
          <p className="card-text">{singleItem.description}</p>
          <p className="card-text">{singleItem.condition}</p>
          <p className="card-text">Per Day: ${singleItem.priceperhour}.00</p>
          <p className="card-text">Per Day: ${singleItem.priceperday}.00</p>
          <span>{singleItem.isAvailable === true ? <img src={checkIcon} alt="checkbox icon svg" /> : 'Rented' }</span>
        </div>
      </div>
      </div>
    );
  }
}

export default SingleItem;
