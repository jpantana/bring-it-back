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
    categoryIdStateChg: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
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
    const { getUserItems, addNewItem, categoryId } = this.props;
    const saveNewItem = { ...this.props.newItem };
    saveNewItem.ownerId = firebase.auth().currentUser.uid;
    saveNewItem.categoryId = categoryId;
    itemsData.addNewItem(saveNewItem)
      .then(() => {
        addNewItem(e);
        getUserItems(this.props.userid);
      }).catch(err => console.error('item was not added', err));
  };

  nameAdd = e => this.props.addNewItemForm('name', e);

  conditionAdd = e => this.props.addNewItemForm('condition', e);

  ownerIdAdd = e => this.props.addNewItemForm('ownerId', e);

  descriptionAdd = e => this.props.addNewItemForm('description', e);

  imageUrlAdd = e => this.props.addNewItemForm('imageUrl', e);

  isAvailableAdd = e => this.props.addNewItemForm('isAvailable', e);

  priceperdayAdd = e => this.props.addNewItemForm('priceperday', e);

  priceperhourAdd = e => this.props.addNewItemForm('priceperhour', e);

  addCategory = (e) => {
    e.preventDefault();
    this.props.addNewItemForm('category', e);
    this.props.categoryIdStateChg(e);
  };

  render() {
    const { newItem, categories } = this.props;
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
                <label htmlFor="itemName">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
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
                    defaultValue={newItem.category}
                  >
                    {newItem.category}
                  </DropdownToggle >
                  <DropdownMenu>
                    { catLoop }
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="form-group">
                <label htmlFor="itemDescription">A Brief Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemDescription"
                  placeholder="This thing is the greatest..."
                  defaultValue={newItem.description}
                  onChange={this.descriptionAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemCondition">Condition</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemCondition
                  ess" aria-describedby="streetAddress"
                  placeholder="Good, Bad,Fair, etc."
                  defaultValue={newItem.condition}
                  onChange={this.conditionAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemImage">Paste An Image Url</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemImage
                  ess" aria-describedby="streetAddress"
                  placeholder="img link"
                  defaultValue={newItem.imageUrl}
                  onChange={this.imageUrlAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemPriceperhour">Price Per Hour</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemPriceperhour"
                  placeholder="$"
                  defaultValue={newItem.priceperhour}
                  onChange={this.priceperhourAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemPriceperday">Price Per Day</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemPriceperday"
                  placeholder="$"
                  defaultValue={newItem.priceperday}
                  onChange={this.priceperdayAdd}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.postNewItem}>Add It</button>
              <button type="submit" className="btn btn-danger" onClick={this.props.addNewItem}>Cancel</button>
            </form>
          </ModalBody>
        </div>
    );
  }
}

export default AddNewItems;
