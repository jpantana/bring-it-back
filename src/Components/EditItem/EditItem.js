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
// SVGs
import cameraIcon from '../../SVGs/iconmonstr-photo-camera-thin.svg';


class EditItem extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    getUserItems: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(categoriesShape.categoriesShape).isRequired,
    editItem: itemShape.itemShape,
    showCategories: PropTypes.func.isRequired,
    closeEditModal: PropTypes.func.isRequired,
  }

  toggle = this.toggle.bind(this);

  state = {
    dropdownOpen: false,
    editedItem: this.props.editItem,
    categoryId: '',
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
      userid,
      id,
    } = this.props;
    const editThisItem = { ...this.state.editedItem };
    editThisItem.ownerId = firebase.auth().currentUser.uid;
    if (this.state.categoryId !== '') {
      editThisItem.categoryId = this.state.categoryId;
    }
    itemsData.editItem(editThisItem, id)
      .then(() => {
        closeEditModal(e);
        getUserItems(userid);
      }).catch(err => console.error('item was not added', err));
  };

  // ==================================================================

  editItemForm = (name, e) => {
    const tempItem = { ...this.state.editedItem };
    tempItem[name] = e.target.value;
    this.setState({ editedItem: tempItem });
  };

  updateImageUrl = (url) => {
    const oldState = { ...this.state };
    oldState.editedItem.imageUrl = url;
    this.setState(oldState);
  };

  categoryIdStateChg = (e) => {
    this.setState({ categoryId: e.target.id });
  };

  // ==================================================================

  nameAdd = e => this.editItemForm('name', e);

  conditionAdd = e => this.editItemForm('condition', e);

  ownerIdAdd = e => this.editItemForm('ownerId', e);

  descriptionAdd = e => this.editItemForm('description', e);

  imageUrlAdd = () => this.updateImageUrl(this.state.imageUrl);

  isAvailableAdd = e => this.editItemForm('isAvailable', e);

  priceperdayAdd = e => this.editItemForm('priceperday', e);

  priceperhourAdd = e => this.editItemForm('priceperhour', e);

  addCategory = (e) => {
    e.preventDefault();
    this.editItemForm('category', e);
    this.categoryIdStateChg(e);
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
    const {
      image,
      imageUrl,
      progress,
      editedItem,
    } = this.state;
    const { categories, closeEditModal } = this.props;
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
                  defaultValue={editedItem.name}
                  onChange={this.nameAdd}
                />
              </div>
              <div className="form-group">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    caret
                    onClick={this.props.showCategories}
                    defaultValue={editedItem.category}
                  >
                    {editedItem.category}
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
                  defaultValue={editedItem.description}
                  onChange={this.descriptionAdd}
                />
              </div>
              <div className="form-group">

              <div className="radioDiv">
                  <h3>Condition</h3>
                  <label htmlFor="Mint">Mint</label>
                  <input name="radioBtn" type="radio" id="Mint" defaultValue="Mint" checked={editedItem.condition === 'Mint' ? 'checked' : false} onChange={this.conditionAdd}/>
                  <label htmlFor="Good">Good</label>
                  <input name="radioBtn" type="radio" id="Good" defaultValue="Good" checked={editedItem.condition === 'Good' ? 'checked' : false } onChange={this.conditionAdd}/>
                  <label htmlFor="Fair">Fair</label>
                  <input name="radioBtn" type="radio" id="Fair" defaultValue="Fair" checked={editedItem.condition === 'Fair' ? 'checked' : false } onChange={this.conditionAdd}/>
                  <label htmlFor="Relic">Relic</label>
                  <input name="radioBtn" type="radio" id="Relic" defaultValue="Relic" checked={editedItem.condition === 'Relic' ? 'checked' : false} onChange={this.conditionAdd}/>
                </div>

                <label htmlFor="edit.condition">Condition</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit.condition
                  ess" aria-describedby="streetAddress"
                  placeholder="Good, Bad,Fair, etc."
                  defaultValue={editedItem.condition}
                  onChange={this.conditionAdd}
                />
              </div>
              <div className="form-group">
              <label><img src={cameraIcon} alt="camera icon" />Upload A New Image
                <FileUploader
                    hidden
                    accept='image/*'
                    name='image'
                    storageRef={firebase.storage().ref('images/')}
                    onUploadStart={this.handleUploadStart}
                    onUploadSuccess={this.handleUploadSuccess}
                  />
              </label>
                {(image === '' && progress === 0 ? <img className="img-thumbnail" src={editedItem.imageUrl} alt={editedItem.name} /> : '')}

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
                  defaultValue={editedItem.priceperhour}
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
                  defaultValue={editedItem.priceperday}
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
