import React from 'react';
import PropTypes from 'prop-types';
// JSs
import itemShape from '../../helpers/propz/itemShape';
import RentItem from '../RentItem/RentItem';
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// STYLEs
import './ItemCard.scss';
// SVGs
import checkIcon from '../../SVGs/iconmonstr-check-mark-6.svg';

class ItemCard extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    rentThisItem: PropTypes.func.isRequired,
    itemsRented: PropTypes.arrayOf(itemsRentedShape.itemsRentedShape).isRequired,
    useruid: PropTypes.string.isRequired,
    messageUserRedirect: PropTypes.func.isRequired,
  }

  rentedInfo = () => {
    const returnTime = [];
    this.props.itemsRented.forEach((i) => {
      if (i.itemId === this.props.item.id) {
        returnTime.push(i.returnTime);
      }
    });
    return returnTime;
  };

  messageThisUser = (e) => {
    e.preventDefault();
    this.props.messageUserRedirect(e.target.value, this.props.item.id);
  };

  render() {
    const { item, rentThisItem } = this.props;

    return (
      <div className="ItemCard card">
        <div className="card-body">
          <div className="imgContainer">
            {/* <img src={item.imageUrl} alt={item.name} className="card-img-top itemImg" /> */}
            <img src="https://via.placeholder.com/300x300" alt="placeholder img" />
          </div>
          <h5 className="card-title allCardsTitle">{item.name}</h5>
          <div className="cardDetails">
            <table>
              <tbody>
                <tr>
                  <th className="thCondition">Condition</th>
                  <th className="thPriceHour">Hourly</th>
                  <th className="thPriceDay">Daily</th>
                </tr>
                <tr>
                  <td className="itemCondition">{item.condition}</td>
                  <td className="itemPriceHour">${item.priceperhour}</td>
                  <td className="itemPriceDay">${item.priceperday}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="allCardIconsHome">
          <span>{item.isAvailable === true
            ? <img src={checkIcon} alt="checkbox icon svg" className="iconSvg" />
            : <p className="availableAgainDate">Available after {this.rentedInfo()}</p> }</span>
          <span className="editDeleteSpan">
          {item.isAvailable === true ? <RentItem
            key={item.id}
            item={item}
            rentThisItem={rentThisItem}
          /> : ''}
          </span>
        </div>
        {
          this.props.useruid !== this.props.item.ownerId
            ? <span className="msgUserSpan">
            <button
              className="btn msgUserBtn"
              value={item.ownerId}
              onClick={this.messageThisUser}
            >Message Owner</button>
            </span> : ''}
      </div>
    );
  }
}

export default ItemCard;
