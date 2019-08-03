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
// import itemShape from '../../helpers/propz/itemShape';
import categoriesShape from '../../helpers/propz/categoriesShape';
// STYLES
import './AddNewItems.scss';
// SVGs
import cameraIcon from '../../SVGs/iconmonstr-photo-camera-thin.svg';

const defaultItemState = {
  name: '',
  category: 'Category',
  condition: '',
  categoryId: '',
  ownerId: '',
  description: '',
  imageUrl: 'https://via.placeholder.com/400x400',
  isAvailable: true,
  priceperday: '',
  priceperhour: '',
};

class AddNewItems extends React.Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
    getUserItems: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(categoriesShape.categoriesShape).isRequired,
    showCategories: PropTypes.func.isRequired,
  }

  toggle = this.toggle.bind(this);

  state = {
    dropdownOpen: false,
    image: '',
    imageUrl: '',
    progress: 0,
    newItem: defaultItemState,
    categoryId: '',
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  postNewItem = (e) => {
    e.preventDefault();
    const { getUserItems, userid } = this.props;
    const { categoryId } = this.state;
    const saveNewItem = { ...this.state.newItem };
    saveNewItem.ownerId = firebase.auth().currentUser.uid;
    saveNewItem.categoryId = categoryId;
    itemsData.addNewItem(saveNewItem)
      .then(() => {
        getUserItems(userid);
      }).catch(err => console.error('item was not added', err));
  };

  addNewItemForm = (name, e) => {
    const tempItem = { ...this.state.newItem };
    tempItem[name] = e.target.value;
    this.setState({ newItem: tempItem });
  };

  newImageUrl = (url) => {
    const oldState = { ...this.state };
    oldState.newItem.imageUrl = url;
    this.setState(oldState);
  };

  categoryIdStateChg = (e) => {
    this.setState({ categoryId: e.target.id });
  };

  nameAdd = e => this.addNewItemForm('name', e);

  conditionAdd = e => this.addNewItemForm('condition', e);

  ownerIdAdd = e => this.addNewItemForm('ownerId', e);

  descriptionAdd = e => this.addNewItemForm('description', e);

  isAvailableAdd = e => this.addNewItemForm('isAvailable', e);

  priceperdayAdd = e => this.addNewItemForm('priceperday', e);

  priceperhourAdd = e => this.addNewItemForm('priceperhour', e);

  addCategory = (e) => {
    e.preventDefault();
    this.addNewItemForm('category', e);
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
        this.newImageUrl(url);
      })
      .catch(err => console.error('no image url', err));
  };

  render() {
    const {
      image,
      progress,
      imageUrl,
      newItem,
    } = this.state;
    const { categories } = this.props;
    const catLoop = categories.map(category => (
      <DropdownItem
        key={`dropd.${category.id}`}
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
                <textarea
                  type="text"
                  className="form-control"
                  id="itemDescription"
                  placeholder="This thing is the greatest..."
                  defaultValue={newItem.description}
                  onChange={this.descriptionAdd}
                />
              </div>
              <div className="form-group">
                <div className="radioDiv">
                  <h3>Condition</h3>
                  <label htmlFor="Mint">Mint</label>
                  <input name="radioBtn" type="radio" id="Mint" defaultValue="Mint" onClick={this.conditionAdd}/>
                  <label htmlFor="Good">Good</label>
                  <input name="radioBtn" type="radio" id="Good" defaultValue="Good" onClick={this.conditionAdd}/>
                  <label htmlFor="Fair">Fair</label>
                  <input name="radioBtn" type="radio" id="Fair" defaultValue="Fair" onClick={this.conditionAdd}/>
                  <label htmlFor="Relic">Relic</label>
                  <input name="radioBtn" type="radio" id="Relic" defaultValue="Relic" onClick={this.conditionAdd}/>
                </div>
              </div>
              <div className="form-group">
                <label><img src={cameraIcon} alt="camera icon" />Upload An Image
                <FileUploader
                    hidden
                    accept='image/*'
                    name='image'
                    storageRef={firebase.storage().ref('images/')}
                    onUploadStart={this.handleUploadStart}
                    onUploadSuccess={this.handleUploadSuccess}
                  />
              </label>
                 {(image !== '' && progress === 100 ? <div>
                  <img
                    className="img-thumbnail"
                    src={imageUrl}
                    alt="item to be rented" />
                 </div> : '')}
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
