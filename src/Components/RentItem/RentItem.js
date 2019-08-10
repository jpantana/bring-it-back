import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import moment from 'moment';
// JSs
import Rolodex from '../Rolodex/Rolodex';
// STYLEs
import './RentItem.scss';
// PROPs
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import usersData from '../../helpers/data/usersData';

const defaultStateRental = {
  hoursRented: '0',
  pickupDate: '',
  isOverDue: false,
  ownerAddress: '',
  returnTime: '',
};
class RentItem extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    rentThisItem: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
    itemToRent: defaultStateRental,
    street: '',
    city: '',
    state: '',
    zipcode: '',
  }

  componentDidMount() {
    usersData.getUsers(this.props.item.ownerId)
      .then((resp) => {
        this.setState({
          street: resp[0].street,
          city: resp[0].city,
          state: resp[0].state,
          zipcode: resp[0].zipcode,
        });
      }).catch(err => console.error('no such owner to rent item', err));
  }

  rentItem = (e) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
    const {
      street,
      city,
      state,
      zipcode,
    } = this.state;
    const rentedObj = {
      hoursRented: this.state.itemToRent.hoursRented,
      pickupDate: this.state.itemToRent.pickupDate,
      overDue: false,
      renterId: firebase.auth().currentUser.uid,
      ownerAddress: {
        street,
        city,
        state,
        zipcode,
      },
      returnTime: this.state.itemToRent.returnTime,
      category: this.props.item.category,
      categoryId: this.props.item.categoryId,
      condition: this.props.item.condition,
      description: this.props.item.description,
      itemId: this.props.item.id,
      imageUrl: this.props.item.imageUrl,
      name: this.props.item.name,
      ownerId: this.props.item.ownerId,
      priceperday: this.props.item.priceperday,
      priceperhour: this.props.item.priceperhour,
    };
    // callback function for axios post
    this.props.rentThisItem(rentedObj);
  };

  modalShowHide = (e) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  itemToRentDataUpdate = (name, e) => {
    const tempItem = { ...this.state.itemToRent };
    tempItem[name] = e.target.value;
    this.setState({ itemToRent: tempItem });
  };

  determineDueDate = (e) => {
    const { itemToRent } = this.state;
    const firstDate = itemToRent.pickupDate;
    const hours = e * 1;
    const bringItBack = moment(firstDate, 'MM/DD/YYYY - h:mm a').add(hours, 'hours').calendar();
    const tempItem = { ...this.state.itemToRent };
    tempItem.returnTime = bringItBack;
    this.setState({ itemToRent: tempItem });
  };

  pickupDate = (e) => {
    this.itemToRentDataUpdate('pickupDate', e);
  };

  rentThisLong = (e) => {
    this.itemToRentDataUpdate('hoursRented', e);
    this.determineDueDate(e.target.value);
  };

  roloValu = (num) => {
    const tempItem = { ...this.state.itemToRent };
    tempItem.hoursRented = num;
    const { itemToRent } = this.state;
    const firstDate = itemToRent.pickupDate;
    const hours = num * 1;
    const bringItBack = moment(firstDate, 'MM/DD/YYYY - h:mm a').add(hours, 'hours').calendar();
    tempItem.returnTime = bringItBack;
    this.setState({ itemToRent: tempItem });
  };

  render() {
    const {
      street,
      city,
      zipcode,
      state,
      isOpen,
    } = this.state;
    const { item } = this.props;
    return (
      <div className="RentItem">
        <Modal isOpen={isOpen}>
          <ModalHeader>Rent This</ModalHeader>
            <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="rentalDate">When do you want to get your rental?</label>
                <input
                  type="text"
                  className="form-control"
                  id="rentalDate"
                  aria-describedby="rental date"
                  placeholder=''
                  defaultValue={moment().format('MM/DD/YYYY - h:mm a')}
                  onChange={this.pickupDate}
                />
              </div>
              <div className="form-group">
                <div className="hoursRoloDiv">
                  <p className="howManyHours">How many hours do you need it for?</p>
                  <div className="rolodexDiv">
                    <Rolodex
                      key={`${item.id}.rolodex`}
                      roloValu={this.roloValu}
                    />
                  </div>
                </div>

                {/* <label htmlFor="howLong">How long do you need it?</label>
                <input
                  type="number"
                  className="form-control"
                  id="howLong"
                  aria-describedby="how long"
                  placeholder="e.g. 26 hrs"
                  defaultValue={0}
                  onChange={this.rentThisLong}
                /> */}
                <p className="returnTime">{this.state.itemToRent.returnTime}</p>
              </div>
              <div className="editRentalInfoDiv">
                <h3 className="pickupandreturnlocH3">Your Pickup/Return Location</h3>
                <p className="editRentalInfoP">{street}</p>
                <p className="editRentalInfoP">{city}, {state}</p>
                <p className="editRentalInfoP">{zipcode}</p>
              </div>

              <div className="rentalModalBtnsDiv">
                <button onClick={this.rentItem} className="btn rentBtn">Rent It!</button>
                <button className="btn cancelRentalItemBtn" onClick={this.modalShowHide}>X</button>
              </div>
              </form>
            </ModalBody>
        </Modal>
        {/* <img onClick={this.modalShowHide} className="cartIcon" src={cart} alt="cart icon"/> */}
        <i onClick={this.modalShowHide} className="fas fa-cart-plus cartIcon"></i>
      </div>
    );
  }
}

export default RentItem;
