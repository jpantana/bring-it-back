import React from 'react';
import PropTypes from 'prop-types';
// JSs
import itemShape from '../../helpers/propz/itemShape';
import RentItem from '../RentItem/RentItem';
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// STYLEs
import './ItemCard.scss';

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
    const itm = e.target.id;
    const ownerId = itm.split('.', 1)[0];
    this.props.messageUserRedirect(ownerId, this.props.item.id);
  };

  condtionFontColor = () => {
    const { item } = this.props;
    if (item.condition === 'Mint') {
      return <span className="itemCondition mint">{item.condition}</span>;
    }
    if (item.condition === 'Good') {
      return <span className="itemCondition good">{item.condition}</span>;
    }
    if (item.condition === 'Fair') {
      return <span className="itemCondition fair">{item.condition}</span>;
    }
    if (item.condition === 'Relic') {
      return <span className="itemCondition relic">{item.condition}</span>;
    }
    return null;
  }

  render() {
    const { item, rentThisItem } = this.props;

    return (
      <div className="ItemCard card wow bounceIn fadeInRight">
        <div className="card-body">
          <div className="imgContainer">
            {/* <img src={item.imageUrl} alt={item.name} className="card-img-top itemImg" /> */}
            <img src="https://via.placeholder.com/300x300" alt="placeholder img" />
          </div>
          <h5 className="card-title allCardsTitle">{item.name}</h5>
          <div className="cardDetails">

            <div className="cardDetailsWrapper">
              <div className="details">
                <span id="itemPriceHour" className="detailReportings">${item.priceperhour}</span>
                <span id="itemPriceDay" className="detailReportings">${item.priceperday}</span>
              </div>
              <div className="cardDetailHeaders">
                <span className="thPriceHour detailsHeaders">Per Hour</span>
                <span className="thPriceDay detailsHeaders">Per Day</span>
              </div>
            </div>

            <div className="cardPrintoutsWrapper">
              { this.condtionFontColor() }
            </div>

          </div>
        </div>
        <div className="allCardIconsHome">
          <span>{item.isAvailable === true
            ? <i className="fas fa-check-circle availableIcon"></i>
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
                <span className="msgUserBtn">
                  {<i
                    id={`${item.ownerId}.usertomsg`}
                    onClick={this.messageThisUser}
                    className="fas fa-comment msgIcon">
                  </i>}
                </span>
              </span>
            : ''}
      </div>
    );
  }
}

export default ItemCard;
