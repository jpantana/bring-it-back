import React from 'react';
import PropTypes from 'prop-types';
// JSs
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// import Messages from '../Messages/Messages';
// STYLEs
import './RentalCard.scss';

class RentalCard extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
    rental: itemsRentedShape.itemsRentedShape,
  }

  state = {
    sendMessage: false,
  }

  messageItemOwner = (e) => {
    e.preventDefault();
    this.setState({ sendMessage: !this.state.sendMessage });
  };

  render() {
    const { rental } = this.props;
    const { sendMessage } = this.state;

    return (
      <div>
        <div className="RentalCard card">
          <div className="card-body">
            <div className="rentalImgContainer">
              {/* <img src={rental.imageUrl} alt={rental.name} className="card-img-top rentalImg" /> */}
              <img src="https://via.placeholder.com/300x300" alt="placeholder img" />
            </div>
            <h5 className="rental-card-title rentalCardsTitle">{rental.name}</h5>
            <div className="cardDetails">
              <table>
                <tbody>
                  <tr>
                    <th className="rentalThCondition">Condition</th>
                    <th className="rentalThPriceHour">Hourly</th>
                    <th className="rentalThPriceDay">Daily</th>
                    <th className="rentalThPickupDate">Pickup Date</th>
                    <th className="rentalThReturnDate">Return</th>
                  </tr>
                  <tr>
                    <td className="rentalCondition">{rental.condition}</td>
                    <td className="rentalPriceHour">${rental.priceperhour}</td>
                    <td className="rentalPriceDay">${rental.priceperday}</td>
                    <td className="rentalPickupDate">${rental.pickupDate}</td>
                    <td className="rentalPickupDate">${rental.returnTime}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rentalCardsIconsHome">
          </div>
          <button
            className="btn messageOwnerBtn"
            onClick={this.messageItemOwner}
          >
          { sendMessage === false ? 'Message Owner' : 'Hide Messages'}
          </button>
        </div>
        {/* { sendMessage === true ? <Component key={'unique2'} to={(`/messages/${userid}`)} userid={userid}/> : ''} */}
      </div>
    );
  }
}

export default RentalCard;
