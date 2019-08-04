import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Modal, ModalHeader } from 'reactstrap';
// JSs
import Scroll from '../Sroll/Scroll';
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';
import ItemCard from '../ItemCard/ItemCard';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
import SearchAndSort from '../SearchAndSort/SearchAndSort';
import itemsRentedData from '../../helpers/data/itemsRentedData';
// STYLEs
import 'animate.css';
import './Home.scss';
// SVGs

class Home extends React.Component {
  state = {
    items: [],
    categories: [],
    dropdownOpen: false,
    categoryName: 'Categories',
    searchInput: '',
    itemsLength: 0,
    counter: 0,
    useruid: '',
    itemsRented: [],
    isOpen: false,
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.setState({ useruid: uid });
    this.getUser(uid);
    this.getItems();
    this.showCategories();
    this.getRentedItemsData();
  }

  // start a message about an item
  messageUserRedirect = (ownerId, itemId) => {
    this.props.history.push({
      pathname: `/notifications/${this.state.useruid}`,
      state: { ownersId: ownerId, itemId },
    });
  };

  getUser = (uid) => {
    usersData.getUsers(uid)
      .then((resp) => {
        if (resp.length === 0) {
          this.props.history.push('/signup');
        }
      }).catch(err => console.error(err, 'no such user exists'));
  };

  getItems = () => {
    itemsData.getAllItems().then((res) => {
      const { categoryName } = this.state;
      if (categoryName === 'Categories') {
        this.setState({ items: res, itemsLength: res.length });
      } else {
        const filterCategories = res.filter(item => item.category === categoryName);
        this.setState({ items: filterCategories, itemsLength: filterCategories.length });
      }
    }).catch(err => console.error('no items to display', err));
  };

  // CATEGORIES
  showCategories = () => {
    itemCategoriesData.getCategories()
      .then((resp) => {
        this.setState({ categories: resp });
      })
      .catch(err => console.error('no categories to speak of', err));
  };

  pickCategory = (e) => {
    e.preventDefault();
    this.setState({ categoryName: e.target.value });
    this.getItems();
  };

  searchItemInput = (e) => {
    e.preventDefault();
    this.setState({ searchInput: e.target.value });
    this.showSearchedItems();
  };

  // RENTED ITEMS
  getRentedItemsData = () => {
    itemsRentedData.getRentals()
      .then((res) => {
        this.setState({ itemsRented: res });
      })
      .catch(err => console.error('no rented items data', err));
  };

  itemIsOrIsntRentedBadge = (rentedItem) => {
    itemsData.getAllItems()
      .then((items) => {
        const changeAvailability = items.find(item => item.id === rentedItem);
        itemsData.changeItemAvailability(changeAvailability.id, false)
          .then(() => {
            this.getItems();
          })
          .catch(err => console.error('availability not changed', err));
      })
      .catch(err => console.error('no items data returned', err));
  };

  rentThisItem = (rentedObj) => {
    if (rentedObj.ownerId === rentedObj.renterId) {
      this.setState({ isOpen: !this.state.isOpen });
    } else if (rentedObj.ownerId !== rentedObj.renterId) {
      itemsRentedData.newRental(rentedObj)
        .then((resp) => {
          const rentalId = resp.data.name;
          itemsRentedData.getRentals()
            .then((rents) => {
              this.setState({ itemsRented: rents });
              const singleRental = rents.filter(r => r.id === rentalId);
              this.itemIsOrIsntRentedBadge(singleRental[0].itemId);
            })
            .catch(err => console.error('no rented item response', err));
        })
        .catch(err => console.error('no item rented', err));
    }
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ isOpen: false });
  };

  showSearchedItems = () => {
    itemsData.getAllItems()
      .then((resItems) => {
        const search = this.state.searchInput.toLowerCase();
        const filterSearch = resItems.filter(itm => (itm.name.toLowerCase().includes(search) || itm.description.toLowerCase().includes(search) || itm.category.toLowerCase().includes(search)));
        this.setState({ items: filterSearch });
      })
      .catch(err => console.error('no items match search', err));
  };

  render() {
    const {
      items,
      categories,
      categoryName,
      searchInput,
      itemsRented,
      isOpen,
      useruid,
      itemsLength,
    } = this.state;
    const makeItemCards = items.map(item => (
        <ItemCard
          key={`allItem.${item.id}`}
          item={ item }
          rentThisItem={this.rentThisItem}
          itemsRented={itemsRented}
          useruid={useruid}
          messageUserRedirect={this.messageUserRedirect}
        />
    ));

    return (
      <div className="Home justify-content-center">
        <Modal isOpen={isOpen} onClick={this.closeModal}>
          <ModalHeader className="cantRentMHeader">Oops! You can't rent your own stuff.</ModalHeader>
          <button className="btn closeNoRentModalBtn">X</button>
        </Modal>
        <div className="form-group">
          <div className="searchAndSort">
            <SearchAndSort
              key={categoryName}
              categoryName={categoryName}
              categories={categories}
              pickCategory={this.pickCategory}
              searchItemInput={this.searchItemInput}
              searchInput={searchInput}
            />
          </div>
        </div>
        <div>
          <Scroll
              key={`${useruid}.arrowRight`}
              itemsLength={itemsLength}
            />
          </div>
          <div className="allCardsWrapper" id="arrowDiv">
            <div className="row allCardsDiv" id="allCardsDiv">
              { (items.length > 0 ? makeItemCards : '') }
            </div>
          </div>
      </div>
    );
  }
}

export default Home;
