import React from 'react';
import {
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import itemsData from '../../helpers/data/itemsData';
// PROPs

// STYLES
import './AddNewItems.scss';
import itemShape from '../../helpers/propz/itemShape';

// STILL NEED TO USE CATEGORY ID
// const defaultState = {
//   name: '',
//   category: '',
//   condition: '',
//   categoryId: '',
//   ownerId: '',
//   description: '',
//   imageUrl: '',
//   isAvailable: true,
//   priceperday: 0,
//   priceperhour: 0,
// };
class AddNewItems extends React.Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
    getUserItems: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    newItem: itemShape.itemShape,
    addNewItemForm: PropTypes.func.isRequired,
  }

  // state = {
  //   newItem: defaultState,
  // }

  postNewItem = (e) => {
    e.preventDefault();
    const { getUserItems, addNewItem } = this.props;
    const saveNewItem = { ...this.props.newItem };
    saveNewItem.ownerId = firebase.auth().currentUser.uid;
    itemsData.addNewItem(saveNewItem)
      .then((resp) => {
        // this.props.history.push(`/mystuff/${this.props.userid}`);
        addNewItem(e);
        getUserItems(this.props.userid);
      }).catch(err => console.error('item was not added', err));
  };

  nameAdd = e => this.props.addNewItemForm('name', e);

  categoryAdd = e => this.props.addNewItemForm('category', e);

  conditionAdd = e => this.props.addNewItemForm('condtion', e);

  categoryIdAdd = e => this.props.addNewItemForm('categoryId', e);

  ownerIdAdd = e => this.props.addNewItemForm('ownerId', e);

  descriptionAdd = e => this.props.addNewItemForm('description', e);

  imageUrlAdd = e => this.props.addNewItemForm('imageUrl', e);

  isAvailableAdd = e => this.props.addNewItemForm('isAvailable', e);

  priceperdayAdd = e => this.props.addNewItemForm('priceperday', e);

  priceperhourAdd = e => this.props.addNewItemForm('priceperhour', e);

  render() {
    const { newItem } = this.props;

    return (
        <div>
          <ModalHeader>Create Your Account!</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  aria-describedby="firstname"
                  placeholder="Item Name"
                  defaultValue={newItem.name}
                  onChange={this.nameAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Category"
                  defaultValue={newItem.category}
                  onChange={this.categoryAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">A Brief Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="This thing is the greatest..."
                  defaultValue={newItem.description}
                  onChange={this.descriptionAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetAddress">Condition</label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAdd
                  ess" aria-describedby="streetAddress"
                  placeholder="Good, Bad,Fair, etc."
                  defaultValue={newItem.condition}
                  onChange={this.conditionAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Paste An Image Url</label>
                <input
                  type="text"
                  className="form-control"
                  id="city
                  ess" aria-describedby="streetAddress"
                  placeholder="img link"
                  defaultValue={newItem.imageUrl}
                  onChange={this.imageUrlAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">Price Per Hour</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="$"
                  defaultValue={newItem.priceperhour}
                  onChange={this.priceperhourAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Price Per Day</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  placeholder="$"
                  defaultValue={newItem.priceperday}
                  onChange={this.priceperdayAdd}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.postNewItem}>Add It</button>
            </form>
          </ModalBody>
        </div>
    );
  }
}

export default AddNewItems;
