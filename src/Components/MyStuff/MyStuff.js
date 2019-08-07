import React from 'react';
import { Modal } from 'reactstrap';
// JSs
// import Leaflet from '../Leaflet/Leaflet';
import SingleItem from '../SingleItem/SingleItem';
import itemsData from '../../helpers/data/itemsData';
import Items from '../Items/Items';
import AddNewItems from '../AddNewItems/AddNewItems';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
import EditItem from '../EditItem/EditItem';
// STYLES
import './MyStuff.scss';
// PROPS
// SVGs
import addIcon from '../../SVGs/iconmonstr-plus-circle-thin.svg';
import usersData from '../../helpers/data/usersData';

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

const defaultUserState = {
  firstname: '',
  lastname: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  uid: '',
  username: '',
  proifle: '',
};
class MyStuff extends React.Component {
  state = {
    items: [],
    itemId: '',
    isClicked: false,
    singleItem: defaultItemState,
    editItem: defaultItemState,
    isOpen: false,
    userid: '',
    categories: [],
    editIsOpen: false,
    itemDeleted: false,
    userObj: defaultUserState,
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.setState({ userid: uid });
    this.getUserItems(uid);
    this.showThisUsername(uid);
  }

  getUserItems = (uid) => {
    itemsData.getItems(uid)
      .then((items) => {
        this.setState({ items, isOpen: false, editIsOpen: false });
      })
      .catch(err => console.error('no items to display', err));
  };

  seeSingleItem = (item) => {
    this.setState({ isClicked: true, singleItem: item });
  };

  unseeSingleItem = () => {
    this.setState({ isClicked: false });
  };

  // open close add new modal
  addNewItem = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
      newItem: defaultItemState,
    });
  };

  // open close edit item modal
  closeEditModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false,
      editIsOpen: false,
      editItem: defaultItemState,
    });
  };

  editItemEvent = (e) => {
    const itm = e.target.id;
    const itemId = itm.split('.', 1)[0];
    itemsData.getSingleItem(itemId)
      .then((resp) => {
        this.setState({
          isClicked: false,
          itemId,
          editItem: resp.data,
          editIsOpen: !this.state.editIsOpen,
        });
      })
      .catch();
  };

  showCategories = () => {
    itemCategoriesData.getCategories()
      .then((resp) => {
        this.setState({ categories: resp });
      })
      .catch(err => console.error('no categories to speak of', err));
  };

  deleteItemEvent = (e) => {
    e.preventDefault();
    itemsData.deleteItem(e.target.id)
      .then(() => {
        this.getUserItems(this.state.userid);
      }).catch(err => console.error('item not deleted', err));
  };

  showThisUsername = (uid) => {
    usersData.getUsers(uid)
      .then((res) => {
        this.setState({ userObj: res[0] });
      })
      .catch(err => console.error('no userstore on mystuff', err));
  };

  render() {
    const {
      items,
      isClicked,
      singleItem,
      itemId,
      userid,
      categories,
    } = this.state;
    const makeItemCards = items.map(item => (
        <Items
          key={`items.${item.id}`}
          item={ item }
          seeSingleItem={this.seeSingleItem}
          getUserItems={this.getUserItems}
          deleteItemEvent={this.deleteItemEvent}
          editItemEvent={this.editItemEvent}
        />
    ));
    return (
      <div className="MyStuff">
                <Modal isOpen={this.state.isOpen} >
                  <AddNewItems
                    key={`addNewItem.${itemId}`}
                    addNewItem={this.addNewItem}
                    userid={userid}
                    getUserItems={this.getUserItems}
                    showCategories={this.showCategories}
                    categories={categories}
                  />
                </Modal>
                <Modal isOpen={this.state.editIsOpen} >
                  <EditItem
                    key={`editItem.${itemId}`}
                    id={itemId}
                    categories={this.state.categories}
                    showCategories={this.showCategories}
                    userid={this.state.userid}
                    getUserItems={this.getUserItems}
                    closeEditModal={this.closeEditModal}
                    editItem={this.state.editItem}
                  />
                </Modal>
        <div className="myStuffContainer">

          <div className="smallCardsDiv">
            <div className="addNewWrapper">
              <span className="addNewSpan" onClick={this.addNewItem}>
                Rent More Of Your Stuff {<img src={addIcon} alt="add new icon" className="bounceIn addIcon" />}
              </span>

              <div className="ItemsContainer">
                <div className="ItemsWrapper">
                  { makeItemCards }
                </div>
              </div>
            </div>
          </div>

          <div className="SingleItemDiv">
            { (isClicked === true ? <SingleItem
                key={`single.${singleItem.id}`}
                userid={userid}
                singleItem={singleItem}
                isClicked={isClicked}
                unseeSingleItem={this.unseeSingleItem}
                deleteItemEvent={this.deleteItemEvent}
                editItemEvent={this.editItemEvent}
            />
              : <div className="profileDataDiv">
                  <h2 className="usernameMyStuff">Hi {this.state.userObj.firstname}!</h2>
                  <p>You have <span>{this.state.items.length}</span> items in your store up for rent.</p>
                <div className="profileImgContainerDiv">
                  <img className="mystuffProfilePic" src={this.state.userObj.profile} alt="user profile visual" />
                </div>
                <div className="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>) }
              {/* : <div>{this.state.userObj.username}</div>) } */}
          </div>
        </div>

        {/* <div className="mystuffMap">
          <Leaflet key={'unique4'} id='mystuffMap' userid={userid} />
        </div> */}
      </div>
    );
  }
}
export default MyStuff;
