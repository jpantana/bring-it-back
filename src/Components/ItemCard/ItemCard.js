import React from 'react';
import PropTypes from 'prop-types';
// JSs
import itemShape from '../../helpers/propz/itemShape';
import RentItem from '../RentItem/RentItem';
// STYLEs
import './ItemCard.scss';
// SVGs
import checkIcon from '../../SVGs/iconmonstr-check-mark-6.svg';

class ItemCard extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    rentThisItem: PropTypes.func.isRequired,
  }

  render() {
    const { item, rentThisItem } = this.props;

    return (
      <div className="ItemCard card">
        <div className="card-body">
          <div className="imgContainer">
            <img src={item.imageUrl} alt={item.name} className="card-img-top itemImg" />
          </div>
          <h5 className="card-title">{item.name}</h5>
          <div className="cardDetails">
            <table>
              <tr>
                <th>Condition</th>
                <th>Price Per Hour</th>
                <th>Prce Per Day</th>
              </tr>
              <tr>
                <tb className="itemCondition">{item.condition}</tb>
                <tb className="itemPriceHour">${item.priceperhour}</tb>
                <tb className="itemPriceDay">${item.priceperday}</tb>
              </tr>
            </table>
          </div>
        </div>
        <div className="allCardIcons">
          <span>{item.isAvailable === true ? <img src={checkIcon} alt="checkbox icon svg" className="iconSvg" /> : 'Rented' }</span>
          <span className="editDeleteSpan">
          <RentItem
            key={item.id}
            item={item}
            rentThisItem={rentThisItem}
          />
          </span>
        </div>
      </div>
    );
  }
}

export default ItemCard;
