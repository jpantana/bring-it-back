import React from 'react';
import PropTypes from 'prop-types';
// import firebase from 'firebase/app';
import 'firebase/auth';
import {
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import moment from 'moment';
// JSs
import usersData from '../../helpers/data/usersData';
// STYLEs
import './EditRental.scss';
// PROPs
import itemsRentedShape from '../../helpers/propz/itemsRentedShape';
// SVGs

const defaultStateRental = {
  hoursRented: '',
  pickupDate: '',
  overDue: false,
  renterId: '',
  ownerAddress: '',
  returnTime: '',
  category: '',
  categoryId: '',
  condition: '',
  description: '',
  itemId: '',
  imageUrl: '',
  name: '',
  ownerId: '',
  priceperday: '',
  priceperhour: '',
  // hoursRented: '0',
  // pickupDate: '',
  // isOverDue: false,
  // ownerAddress: '',
  // returnTime: '',
};
class EditRental extends React.Component {
  static propTypes = {
    rental: itemsRentedShape.itemsRentedShape,
    editRental: PropTypes.func.isRequired,
    editMyRental: PropTypes.func.isRequired,
  }

  state = {
    rentedItemToEdit: defaultStateRental,
    editId: this.props.rental.id,
  }

  componentDidMount() {
    usersData.getUsers(this.props.rental.ownerId)
      .then((resp) => {
        const { rental } = this.props;
        const editObj = {
          hoursRented: rental.hoursRented,
          pickupDate: rental.pickupDate,
          overDue: false,
          renterId: rental.renterId,
          ownerAddress: rental.ownerAddress,
          returnTime: rental.returnTime,
          category: rental.category,
          categoryId: rental.categoryId,
          condition: rental.condition,
          description: rental.description,
          itemId: rental.itemId,
          imageUrl: rental.imageUrl,
          name: rental.name,
          ownerId: rental.ownerId,
          priceperday: rental.priceperday,
          priceperhour: rental.priceperhour,
        };
        this.setState({ rentedItemToEdit: editObj });
      }).catch(err => console.error('no such owner to rent item', err));
  }

  submitEdit = (e) => {
    e.preventDefault();
    const { editId } = this.state;
    const editedRentalObj = { ...this.state.rentedItemToEdit };
    this.props.editMyRental(editedRentalObj, editId);
    this.props.editRental(e);
  };

  closeModal = (e) => {
    e.preventDefault();
    this.props.editRental(e);
  };

  rentedItemToEditDataUpdate = (name, e) => {
    const tempItem = { ...this.state.rentedItemToEdit };
    tempItem[name] = e.target.value;
    this.setState({ rentedItemToEdit: tempItem });
  };

  determineDueDate = (e) => {
    const { rentedItemToEdit } = this.state;
    const firstDate = rentedItemToEdit.pickupDate;
    const hours = e * 1;
    const bringItBack = moment(firstDate, 'MM/DD/YYYY - h:mm a').add(hours, 'hours').calendar();
    const tempItem = { ...this.state.rentedItemToEdit };
    tempItem.returnTime = bringItBack;
    this.setState({ rentedItemToEdit: tempItem });
  };

  pickupDate = (e) => {
    this.rentedItemToEditDataUpdate('pickupDate', e);
  };

  rentThisLong = (e) => {
    this.rentedItemToEditDataUpdate('hoursRented', e);
    this.determineDueDate(e.target.value);
  };

  render() {
    const {
      rentedItemToEdit,
    } = this.state;
    return (
      <div className="EditRental">
          <ModalHeader>Rent This</ModalHeader>
            <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="editRentalDate">When do you want to get your rental?</label>
                <input
                  type="text"
                  className="form-control"
                  id="editRentalDate"
                  aria-describedby="rental date"
                  placeholder=''
                  defaultValue={rentedItemToEdit.pickupDate}
                  onChange={this.pickupDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editHowLong">How long do you need it?</label>
                <input
                  type="number"
                  className="form-control"
                  id="editHowLong"
                  aria-describedby="how long"
                  placeholder="e.g. 26 hrs"
                  defaultValue={rentedItemToEdit.hoursRented}
                  onChange={this.rentThisLong}
                />
                <p className="editReturnTime">{this.state.rentedItemToEdit.returnTime}</p>
              </div>
              <div>
                <h3>Your Pickup/Return Location</h3>
                <p>{rentedItemToEdit.ownerAddress.street}</p>
                <p>{rentedItemToEdit.ownerAddress.city}</p>
                <p>{rentedItemToEdit.ownerAddress.state}</p>
                <p>{rentedItemToEdit.ownerAddress.zipcode}</p>
              </div>
              <button onClick={this.submitEdit} className="btn editRentBtn">Rent It!</button>
              <span className="cancelRental" onClick={this.closeModal}>X</span>
              </form>
            </ModalBody>
      </div>
    );
  }
}

export default EditRental;
