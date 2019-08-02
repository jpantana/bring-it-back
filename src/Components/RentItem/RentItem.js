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
// STYLEs
import './RentItem.scss';
// PROPs
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import cart from '../../SVGs/iconmonstr-shopping-cart-3.svg';
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

  render() {
    const {
      street,
      city,
      zipcode,
      state,
      isOpen,
    } = this.state;
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
                <label htmlFor="howLong">How long do you need it?</label>
                <input
                  type="number"
                  className="form-control"
                  id="howLong"
                  aria-describedby="how long"
                  placeholder="e.g. 26 hrs"
                  defaultValue={0}
                  onChange={this.rentThisLong}
                />
                <p className="returnTime">{this.state.itemToRent.returnTime}</p>
              </div>
              <div>
                <h3>Your Pickup/Return Location</h3>
                <p>{street}</p>
                <p>{city}</p>
                <p>{state}</p>
                <p>{zipcode}</p>
              </div>
              <button onClick={this.rentItem} className="btn rentBtn">Rent It!</button>
              <span className="cancelRental" onClick={this.modalShowHide}>X</span>
              </form>
            </ModalBody>
        </Modal>
        <img onClick={this.modalShowHide} className="cartIcon" src={cart} alt="cart icon"/>
      </div>
    );
  }
}

export default RentItem;
