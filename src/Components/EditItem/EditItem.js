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
// STYLEs
import './EditItem.scss';

class EditItem extends React.Component {
  static propTypes = {
    keys: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    getUserItems: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    categories: categoriesShape.categoriesShape,
    editItem: itemShape.itemShape,
    categoryIdStateChg: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    showCategories: PropTypes.func.isRequired,
    editItemForm: PropTypes.func.isRequired,
    addNewItemForm: PropTypes.func.isRequired,
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

  editSingleItem = (e) => {
    e.preventDefault();
    const {
      getUserItems,
      addNewItem,
      categoryId,
      id,
    } = this.props;
    const editThisItem = { ...this.props.editItem };
    editThisItem.ownerId = firebase.auth().currentUser.uid;
    editThisItem.categoryId = categoryId;
    itemsData.editItem(id, editThisItem)
      .then(() => {
        addNewItem(e);
        getUserItems(this.props.userid);
      }).catch(err => console.error('item was not added', err));
  };

  nameAdd = e => this.props.editItemForm('name', e);

  conditionAdd = e => this.props.editItemForm('condition', e);

  ownerIdAdd = e => this.props.editItemForm('ownerId', e);

  descriptionAdd = e => this.props.editItemForm('description', e);

  imageUrlAdd = e => this.props.editItemForm('imageUrl', e);

  isAvailableAdd = e => this.props.editItemForm('isAvailable', e);

  priceperdayAdd = e => this.props.editItemForm('priceperday', e);

  priceperhourAdd = e => this.props.editItemForm('priceperhour', e);

  addCategory = (e) => {
    e.preventDefault();
    this.props.editItemForm('category', e);
    this.props.categoryIdStateChg(e);
  };

  render() {
    const { editItem } = this.props;
    const { categories } = this.props;
    const catLoop = categories.map(category => (
      <DropdownItem
        id={category.id}
        value={category.name}
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
                  defaultValue={editItem.name}
                  onChange={this.nameAdd}
                />
              </div>
              <div className="form-group">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    caret
                    onClick={this.props.showCategories}
                    defaultValue={editItem.category}
                  >
                    {editItem.category}
                  </DropdownToggle >
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
                  defaultValue={editItem.description}
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
                  defaultValue={editItem.condition}
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
                  defaultValue={editItem.imageUrl}
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
                  defaultValue={editItem.priceperhour}
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
                  defaultValue={editItem.priceperday}
                  onChange={this.priceperdayAdd}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.editSingleItem}>Add It</button>
              <button type="submit" className="btn btn-danger" onClick={this.props.addNewItem}>Cancel</button>
            </form>
          </ModalBody>
        </div>
    );
  }
}

export default EditItem;
