import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
// JSs
import $ from 'jquery';
import EditRental from '../EditRental/EditRental';
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// STYLEs
import './RentalCard.scss';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    $('#showDetails').addClass('wow bounceIn slideInDown');
    $('#rentalCardDescripDiv').addClass(' hide');
    $('#rentalCardDescripDiv').removeClass(' wow bounceIn slideInDown');
  };

  hideDetails = (e) => {
    e.preventDefault();
    $('#showDetails').addClass(' hide');
    $('#showDetails').removeClass('wow bounceIn slideInDown');
    $('#rentalCardDescripDiv').removeClass(' hide');
    $('#rentalCardDescripDiv').addClass(' wow bounceIn slideInDown');
  };

  render() {
    const { rental } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="wow bounceIn slideInUp">
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
              <img src={rental.imageUrl} alt={rental.name} className="card-img-top rentalImg" />
              {/* <img src="https://via.placeholder.com/300x300" alt="placeholder img" /> */}
            </div>
            <div className="cardDetails">
              <i onClick={this.showCardDetails} className="fas fa-ellipsis-h showDetailsBtn bounceIn"></i>
                <div id="showDetails" className="hide">
                  <div className="row flex-nowrap">
                    <div className="conditionDivRental">
                      <p className="detailP detHeader rentalThCondition rentalHeaders">Condition</p>
                      <p className="detailP detInfo rentalCondition rentalsInfo">{rental.condition}</p>
                    </div>
                    <div className="hourlyDivRental">
                      <p className="detailP detHeader rentalThPriceHour rentalHeaders">Hourly</p>
                      <p className="detailP detInfo rentalPriceHour rentalsInfo">${rental.priceperhour}</p>
                    </div>
                    <div className="dailyDivRental">
                      <p className="detailP detHeader rentalThPriceDay rentalHeaders">Daily</p>
                      <p className="detailP detInfo rentalPriceDay rentalsInfo">${rental.priceperday}</p>
                    </div>
                  </div>

                  <div className="row flex-nowrap">
                    <div className="pickupDivRental">
                      <p className="detailP detHeader rentalThPickupDate rentalHeaders">Pickup Date</p>
                      <p className="detailP detInfo rentalPickupDate rentalsInfo">{rental.pickupDate}</p>
                    </div>
                    <div className="returnDivRental">
                      <p className="detailP detHeader rentalThReturnDate rentalHeaders">Return Date</p>
                      <p className="detailP detInfo rentalPickupDate rentalsInfo">{rental.returnTime}</p>
                    </div>
                  </div>

                  <i onClick={this.hideDetails} className="fas fa-angle-double-up hideDetailsBtn"></i>
                </div>
              </div>
            </div>
          <div className="rentalCardsIconsHome">
          </div>
          <div className="iconsRentalCards">
          <Dropdown id="rentalCardDropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle>
                {<i className="fas fa-cog rentalCardDropDown"></i>}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem id={rental.id} onClick={this.cancelRental}><i className="fas fa-trash-alt trashEditIconRentalDropDown"></i>Cancel Rental</DropdownItem>
                <DropdownItem onClick={this.editRental}><i className="fas fa-edit trashEditIconRentalDropDown"></i>Edit Rental Times</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div id="rentalCardDescripDiv" className="wow bounceIn slideInDown">
            <span data-tip={rental.name} className="rentalCardName" data-placement="top">{rental.name}</span>
            <ReactTooltip place="top" type="info" effect="float"/>
            <p className="rentalCardDescrip">{rental.description}</p>
          </div>
        </div>
        {/* { sendMessage === true ? <Component key={'unique2'} to={(`/messages/${userid}`)} userid={userid}/> : ''} */}
      </div>
    );
  }
}

export default RentalCard;
