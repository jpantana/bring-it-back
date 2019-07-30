import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// JSs
import $ from 'jquery';
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// STYLEs
import './RentalCard.scss';
// SVGs
import gear from '../../SVGs/iconmonstr-gear-thin.svg';

class RentalCard extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
    rental: itemsRentedShape.itemsRentedShape,
    cancelMyRental: PropTypes.func.isRequired,
    getMyRentals: PropTypes.func.isRequired,
  }

  state = {
    sendMessage: false,
    dropdownOpen: false,
  }

  messageItemOwner = (e) => {
    e.preventDefault();
    this.setState({ sendMessage: !this.state.sendMessage });
  };

  cancelRental = (e) => {
    const itmId = this.props.rental.itemId;
    e.preventDefault();
    this.props.cancelMyRental(e.target.id, itmId);
    $('.RentalCard').addClass('fadeOut');
    setTimeout(() => {
      this.setState({ ...this.props.getMyRentals() });
    }, 3000);
  };

  toggle = this.toggle.bind(this);

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

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
          <div className="iconsRentalCards">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              <img src={gear} id={rental.id} alt={rental.name} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.cancelRental}>Cancel Rental</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
