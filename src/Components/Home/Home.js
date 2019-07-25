import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
// JSs
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';
import ItemCard from '../ItemCard/ItemCard';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
import SearchAndSort from '../SearchAndSort/SearchAndSort';
import itemsRentedData from '../../helpers/data/itemsRentedData';
// STYLEs
import './Home.scss';
// SVGs
import arrow from '../../SVGs/iconmonstr-arrow-25.svg';

// const defaultStateItemsRented = {
//   hoursRented: '',
//   pickupDate: '',
//   overDue: false,
//   renterId: '',
//   ownerAddress: {},
//   category: '',
//   categoryId: '',
//   condition: '',
//   description: '',
//   itemId: '',
//   imageUrl: '',
//   name: '',
//   ownerId: '',
//   priceperday: '',
//   priceperhour: '',
// };

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
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.setState({ useruid: uid });
    this.getUser(uid);
    this.getItems();
    this.showCategories();
    this.getRentedItemsData();
  }

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

  // Callback function displays users name in top nav
  getUser = (uid) => {
    usersData.getUsers(uid)
      .then((resp) => {
        if (resp.length === 0) {
          this.props.history.push('/signup');
        }
      }).catch(err => console.error(err, 'no such user exists'));
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

  // SEARCH BAR DATA CHANGE
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
    itemsRentedData.newRental(rentedObj)
      .then((resp) => {
        const rentalId = resp.data.name;
        console.error(rentalId, 'rental id'); // name of new post ( that is 'id')
        itemsRentedData.getRentals()
          .then((rents) => {
            this.setState({ itemsRented: rents });
            const singleRental = rents.filter(r => r.id === rentalId);
            console.error(singleRental[0], 'single item');
            this.itemIsOrIsntRentedBadge(singleRental[0].itemId);
          })
          .catch(err => console.error('no rented item response', err));
      })
      .catch(err => console.error('no item rented', err));
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

  // NAVIGATE SCROLL BUTTONS
  moveRight = (e) => {
    e.preventDefault();
    const howManyClicks = this.mathyMathMath();
    const { counter } = this.state;
    if (counter >= howManyClicks) {
      this.setState({ counter: howManyClicks });
    } else {
      this.setState({ counter: this.state.counter + 1 });
    }
    if (counter >= howManyClicks) {
      $('#allCardsDiv').animate({
        marginLeft: '-=0px',
      }, 'fast');
    } else {
      $('#allCardsDiv').animate({
        marginLeft: '-=300px',
      }, 'fast');
    }
    $('#arrowBack').removeClass('hide');
    $('#arrowLeft').removeClass('hide');
  };

  moveLeft = (e) => {
    e.preventDefault();
    const { counter } = this.state;
    if (counter <= 0) {
      this.setState({ counter: 0 });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
    if (counter <= 0) {
      $('#allCardsDiv').animate({
        marginLeft: '+=0px',
      }, 'fast');
    } else {
      $('#allCardsDiv').animate({
        marginLeft: '+=300px',
      }, 'fast');
    }
  };

  widthMath = () => {
    const divLength = this.state.itemsLength;
    const makeNum = divLength * 1;
    const theMath = makeNum * 185;
    return theMath;
  };

  mathyMathMath = () => {
    const total = this.widthMath();
    const theMath = total / 300;
    return Math.floor(theMath);
  };

  render() {
    const {
      items,
      categories,
      categoryName,
      searchInput,
      itemsRented,
    } = this.state;
    const makeItemCards = items.map(item => (
        <ItemCard
          key={`allItem.${item.id}`}
          item={ item }
          rentThisItem={this.rentThisItem}
          itemsRented={itemsRented}
        />
    ));

    return (
      <div className="Home justify-content-center">
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
       <div className="allCardsWrapper" id="arrowDiv">
          <span onClick={this.moveRight} className="scrollCardsRight"><img id="arrow" src={arrow} alt="arrow icon" /></span>
        <div className="row allCardsDiv" id="allCardsDiv">
          { (items.length > 0 ? makeItemCards : '') }
        </div>
          <span onClick={this.moveLeft} id="arrowBack" className="scrollCardsLeft hide"><img className="hide" id="arrowLeft" src={arrow} alt="arrow icon" /></span>
        </div>
      </div>
    );
  }
}

export default Home;
