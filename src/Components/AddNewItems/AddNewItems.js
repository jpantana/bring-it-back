import React from 'react';
import {
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import itemsData from '../../helpers/data/itemsData';
// PROPs
import itemShape from '../../helpers/propz/itemShape';
import categoriesShape from '../../helpers/propz/categoriesShape';
// STYLES
import './AddNewItems.scss';

class AddNewItems extends React.Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
    getUserItems: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    newItem: itemShape.itemShape,
    addNewItemForm: PropTypes.func.isRequired,
    categories: categoriesShape.categoriesShape,
    showCategories: PropTypes.func.isRequired,
  }

  toggle = this.toggle.bind(this);

  state = {
    dropdownOpen: false,
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  postNewItem = (e) => {
    e.preventDefault();
    const { getUserItems, addNewItem } = this.props;
    const saveNewItem = { ...this.props.newItem };
    saveNewItem.ownerId = firebase.auth().currentUser.uid;
    itemsData.addNewItem(saveNewItem)
      .then((resp) => {
        addNewItem(e);
        getUserItems(this.props.userid);
      }).catch(err => console.error('item was not added', err));
  };

  nameAdd = e => this.props.addNewItemForm('name', e);

  // categoryAdd = e => this.props.addNewItemForm('category', e);

  conditionAdd = e => this.props.addNewItemForm('condtion', e);

  // categoryIdAdd = e => this.props.addNewItemForm('categoryId', e);

  ownerIdAdd = e => this.props.addNewItemForm('ownerId', e);

  descriptionAdd = e => this.props.addNewItemForm('description', e);

  imageUrlAdd = e => this.props.addNewItemForm('imageUrl', e);

  isAvailableAdd = e => this.props.addNewItemForm('isAvailable', e);

  priceperdayAdd = e => this.props.addNewItemForm('priceperday', e);

  priceperhourAdd = e => this.props.addNewItemForm('priceperhour', e);

  addCategory = (e) => {
    e.preventDefault();
    this.props.addNewItemForm('category', e.target.name);
    this.props.addNewItemForm('categoryId', e.target.id);
  };

  render() {
    const { newItem } = this.props;
    const { categories } = this.props;
    const catLoop = categories.map(category => (
      <DropdownItem
        id={category.id}
        name={category.name}
        onClick={this.addCategory}>
        {category.name}
      </DropdownItem>
    ));

    return (
        <div>
          <ModalHeader>Add A Rental!</ModalHeader>
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
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    caret
                    onClick={this.props.showCategories}
                    defaultValue={newItem.category}>Category</DropdownToggle >
                  <DropdownMenu>
                    { catLoop }
                  </DropdownMenu>
                </Dropdown>
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
