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
import Rolodex from '../Rolodex/Rolodex';
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
    tempItem.hoursRented = e;
    this.setState({ rentedItemToEdit: tempItem });
  };

  pickupDate = (e) => {
    this.rentedItemToEditDataUpdate('pickupDate', e);
  };

  roloValu = (num) => {
    const tempItem = { ...this.state.rentedItemToEdit };
    tempItem.hoursRented = num;
    const { rentedItemToEdit } = this.state;
    const firstDate = rentedItemToEdit.pickupDate;
    const hours = num * 1;
    const bringItBack = moment(firstDate, 'MM/DD/YYYY - h:mm a').add(hours, 'hours').calendar();
    tempItem.returnTime = bringItBack;
    this.setState({ rentedItemToEdit: tempItem });
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
                  value={rentedItemToEdit.pickupDate}
                  onChange={this.pickupDate}
                />
              </div>
              <div className="form-group">
                <div className="hoursRoloDivEdit">
                    <p className="howManyHoursEdit">How many hours do you need it for?</p>
                    <div className="rolodexDivEdit">
                      <Rolodex
                        key={`${rentedItemToEdit.id}.rolodex`}
                        roloValu={this.roloValu}
                      />
                    </div>
                  </div>
                  <p className="editReturnTime">{this.state.rentedItemToEdit.returnTime}</p>
              </div>

                <div className="editRentalInfoDiv">
                  <h3 className="pickupandreturnlocH3">Your Pickup/Return Location</h3>
                  <p className="editRentalInfoP">{rentedItemToEdit.ownerAddress.street}</p>
                  <p className="editRentalInfoP">{rentedItemToEdit.ownerAddress.city}, {rentedItemToEdit.ownerAddress.state}</p>
                  <p className="editRentalInfoP">{rentedItemToEdit.ownerAddress.zipcode}</p>
                </div>

                <div className="editRentalModalBtnsDiv">
                  <button onClick={this.submitEdit} className="btn editRentalItemBtn">Rent It!</button>
                  <button className="btn cancelUpdateBtn" onClick={this.closeModal}>X</button>
                </div>
              </form>
            </ModalBody>
      </div>
    );
  }
}

export default EditRental;
