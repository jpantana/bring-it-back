import React from 'react';
import {
  ModalHeader,
  ModalBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import FileUploader from 'react-firebase-file-uploader'; // added for image
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
// JSs
import itemsData from '../../helpers/data/itemsData';
// PROPs
import itemShape from '../../helpers/propz/itemShape';
import categoriesShape from '../../helpers/propz/categoriesShape';
// STYLEs
import './EditItem.scss';

class EditItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    getUserItems: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(categoriesShape.categoriesShape).isRequired,
    editItem: itemShape.itemShape,
    categoryIdStateChg: PropTypes.func.isRequired,
    categoryId: PropTypes.string.isRequired,
    showCategories: PropTypes.func.isRequired,
    editItemForm: PropTypes.func.isRequired,
    // addNewItemForm: PropTypes.func.isRequired,
    closeEditModal: PropTypes.func.isRequired,
    updateImageUrl: PropTypes.func.isRequired,
  }

  toggle = this.toggle.bind(this);

  state = {
    dropdownOpen: false,
    editedItem: {
      name: this.props.editItem.name,
      category: this.props.editItem.category,
      condition: this.props.editItem.condition,
      categoryId: this.props.editItem.categoryId,
      ownerId: this.props.editItem.ownerId,
      description: this.props.editItem.description,
      imageUrl: this.props.editItem.imageUrl,
      isAvailable: this.props.editItem.isAvailable,
      priceperday: this.props.editItem.priceperday,
      priceperhour: this.props.editItem.priceperhour,
    },
    image: '',
    imageUrl: '',
    progress: 0,
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
      closeEditModal,
      categoryId,
      userid,
      id,
    } = this.props;
    const editThisItem = { ...this.props.editItem };
    editThisItem.ownerId = firebase.auth().currentUser.uid;
    if (categoryId !== '') {
      editThisItem.categoryId = categoryId;
    }
    itemsData.editItem(editThisItem, id)
      .then(() => {
        closeEditModal(e);
        getUserItems(userid);
      }).catch(err => console.error('item was not added', err));
  };

  nameAdd = e => this.props.editItemForm('name', e);

  conditionAdd = e => this.props.editItemForm('condition', e);

  ownerIdAdd = e => this.props.editItemForm('ownerId', e);

  descriptionAdd = e => this.props.editItemForm('description', e);

  imageUrlAdd = () => {
    
    this.props.updateImageUrl(this.state.imageUrl);
  }

  isAvailableAdd = e => this.props.editItemForm('isAvailable', e);

  priceperdayAdd = e => this.props.editItemForm('priceperday', e);

  priceperhourAdd = e => this.props.editItemForm('priceperhour', e);

  addCategory = (e) => {
    e.preventDefault();
    this.props.editItemForm('category', e);
    this.props.categoryIdStateChg(e);
  };

  // Image Upload Section
  handleUploadStart = () => this.setState({ progress: 0 });

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
      progress: 100,
    });
    firebase.storage().ref('images').child(filename).getDownloadURL()
      .then((url) => {
        this.setState({ imageUrl: url });
        this.props.updateImageUrl(url);
      })
      .catch(err => console.error('no image url', err));
  };

  render() {
    const { image, imageUrl, progress } = this.state;
    const { editItem, categories, closeEditModal } = this.props;
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
          <ModalHeader>Edit A Rental!</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="edit.itemName">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit.itemName"
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
                <label htmlFor="edit.itemDescription">A Brief Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="edit.itemDescription"
                  placeholder="This thing is the greatest..."
                  defaultValue={editItem.description}
                  onChange={this.descriptionAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit.condition">Condition</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit.condition
                  ess" aria-describedby="streetAddress"
                  placeholder="Good, Bad,Fair, etc."
                  defaultValue={editItem.condition}
                  onChange={this.conditionAdd}
                />
              </div>
              <div className="form-group">
              <label htmlFor="itemImage">Upload A New Image</label>
              <FileUploader
                accept='image/*'
                name='image'
                storageRef={firebase.storage().ref('images/')}
                onUploadStart={this.handleUploadStart}
                onUploadSuccess={this.handleUploadSuccess}
              />
                {(image === '' && progress === 0 ? <img className="img-thumbnail" src={editItem.imageUrl} alt={editItem.name} /> : '')}

                {(image !== '' && progress === 100 ? <div>
                <img
                  className="img-thumbnail"
                  src={imageUrl}
                  alt="item to be rented" />
                </div> : '')}
              </div>
              <div className="form-group">
                <label htmlFor="edit.priceperhour">Price Per Hour</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit.priceperhour"
                  placeholder="$"
                  defaultValue={editItem.priceperhour}
                  onChange={this.priceperhourAdd}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit.priceperday">Price Per Day</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="$"
                  defaultValue={editItem.priceperday}
                  onChange={this.priceperdayAdd}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.editSingleItem}>Update It</button>
              <button type="submit" className="btn btn-danger" onClick={closeEditModal}>Cancel</button>
            </form>
          </ModalBody>
        </div>
    );
  }
}

export default EditItem;
