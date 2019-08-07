import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
} from 'reactstrap';
// JSs
import $ from 'jquery';
import EditRental from '../EditRental/EditRental';
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// STYLEs
import './RentalCard.scss';

class RentalCard extends React.Component {
  static propTypes = {
    userid: PropTypes.string.isRequired,
    rental: itemsRentedShape.itemsRentedShape,
    cancelMyRental: PropTypes.func.isRequired,
    getMyRentals: PropTypes.func.isRequired,
    editMyRental: PropTypes.func.isRequired,
  }

  state = {
    sendMessage: false,
    dropdownOpen: false,
    isOpen: false,
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
    }, 600);
  };

  editRental = (e) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggle = this.toggle.bind(this);

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  showCardDetails = (e) => {
    e.preventDefault();
    $('#showDetails').removeClass('hide');
  };

  render() {
    const { rental } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <Modal isOpen={isOpen}>
          {<EditRental
            key={rental.id}
            rental={rental}
            editRental={ this.editRental}
            editMyRental={this.props.editMyRental}
          />}
        </Modal>

        <div className="RentalCard card">
          <div className="card-body">
            <div className="rentalImgContainer">
              {/* <img src={rental.imageUrl} alt={rental.name} className="card-img-top rentalImg" /> */}
              {/* <img src="https://via.placeholder.com/300x300" alt="placeholder img" /> */}
            </div>
            <h5 className="rental-card-title rentalCardsTitle">{rental.name}</h5>

            <div className="cardDetails">
              <button className="btn showDetailsBtn" onClick={this.showCardDetails}>Show Details</button>
              <div id="showDetails" className="hide">
                <div className="conditionDivRental">
                  <p className="rentalThCondition rentalHeaders">Condition</p>
                  <p className="rentalCondition rentalsInfo">{rental.condition}</p>
                </div>
                <div className="hourlyDivRental">
                  <p className="rentalThPriceHour rentalHeaders">Hourly</p>
                  <p className="rentalPriceHour rentalsInfo">${rental.priceperhour}</p>
                </div>
                <div className="dailyDivRental">
                  <p className="rentalThPriceDay rentalHeaders">Daily</p>
                  <p className="rentalPriceDay rentalsInfo">${rental.priceperday}</p>
                </div>
                <div className="pickupDivRental">
                  <p className="rentalThPickupDate rentalHeaders">Pickup Date</p>
                  <p className="rentalPickupDate rentalsInfo">{rental.pickupDate}</p>
                </div>
                <div className="returnDivRental">
                  <p className="rentalThReturnDate rentalHeaders">Return</p>
                  <p className="rentalPickupDate rentalsInfo">{rental.returnTime}</p>
                </div>
              </div>

                {/* <div>
                  <div className="rentalCardDetailHeaders">
                    <p className="rentalThCondition rentalHeaders">Condition</p>
                    <p className="rentalThPriceHour rentalHeaders">Hourly</p>
                    <p className="rentalThPriceDay rentalHeaders">Daily</p>
                    <p className="rentalThPickupDate rentalHeaders">Pickup Date</p>
                    <p className="rentalThReturnDate rentalHeaders">Return</p>
                  </div>
                  <div className="rentalCardDetails">
                    <p className="rentalCondition rentalsInfo">{rental.condition}</p>
                    <p className="rentalPriceHour rentalsInfo">${rental.priceperhour}</p>
                    <p className="rentalPriceDay rentalsInfo">${rental.priceperday}</p>
                    <p className="rentalPickupDate rentalsInfo">{rental.pickupDate}</p>
                    <p className="rentalPickupDate rentalsInfo">{rental.returnTime}</p>
                  </div> */}
                {/* </div> */}
              </div>

            </div>
          {/* </div> */}
          <div className="rentalCardsIconsHome">
          </div>
          <div className="iconsRentalCards">
          <Dropdown id="rentalCardDropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle>
               {<i className="fas fa-cog rentalCardDropDown"></i>}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.cancelRental}><i className="fas fa-trash-alt trashEditIconRentalDropDown"></i>Cancel Rental</DropdownItem>
                <DropdownItem onClick={this.editRental}><i className="fas fa-edit trashEditIconRentalDropDown"></i>Edit Rental Times</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="rentalCardDescripDiv">
            <p className="rentalCardDescrip">{rental.description}</p>
          </div>
        </div>
        {/* { sendMessage === true ? <Component key={'unique2'} to={(`/messages/${userid}`)} userid={userid}/> : ''} */}
      </div>
    );
  }
}

export default RentalCard;
