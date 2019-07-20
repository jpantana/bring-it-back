import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
// JSs
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';
import ItemCard from '../ItemCard/ItemCard';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
import SearchAndSort from '../SearchAndSort/SearchAndSort';
// STYLEs
import './Home.scss';

class Home extends React.Component {
  state = {
    items: [],
    categories: [],
    dropdownOpen: false,
    categoryName: 'Categories',
    searchInput: '',
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.getUser(uid);
    this.getItems();
    this.showCategories();
  }

  getItems = () => {
    itemsData.getAllItems().then((res) => {
      const { categoryName } = this.state;
      if (categoryName === 'Categories') {
        this.setState({ items: res });
      } else {
        const filterCategories = res.filter(item => item.category === categoryName);
        this.setState({ items: filterCategories });
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
    } = this.state;
    const makeItemCards = items.map(item => (
      <div
        key={item.id}
      >
        <ItemCard
          key={`allItem.${item.id}`}
          item={ item }
        />
      </div>
    ));

    return (
      <div className="Home justify-content-center">
        <div className="form-group">
          <div>
            <SearchAndSort
              key={1}
              categoryName={categoryName}
              categories={categories}
              pickCategory={this.pickCategory}
              searchItemInput={this.searchItemInput}
              searchInput={searchInput}
            />
          </div>
          <div className="row">
            { (items.length > 0 ? makeItemCards : '') }
          </div>
          <div className="">
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
