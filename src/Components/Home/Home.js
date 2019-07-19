import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// JSs
import usersData from '../../helpers/data/usersData';
import itemsData from '../../helpers/data/itemsData';
import ItemCard from '../ItemCard/ItemCard';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
// STYLEs
import './Home.scss';

// const defaultItemState = {
//   name: '',
//   category: 'Category',
//   condition: '',
//   categoryId: '',
//   ownerId: '',
//   description: '',
//   imageUrl: '',
//   isAvailable: true,
//   priceperday: '',
//   priceperhour: '',
// };
class Home extends React.Component {
  state = {
    items: [],
    categories: [],
    dropdownOpen: false,
    categoryName: 'Categories',
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.getUser(uid);
    this.getItems();
    this.showCategories();
  }

  getItems = () => {
    itemsData.getAllItems().then((res) => {
      this.setState({ items: res });
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
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle = this.toggle.bind(this);

  render() {
    const {
      items,
      categories,
      categoryName,
    } = this.state;
    const catLoop = categories.map(category => (
      <DropdownItem
        id={category.id}
        value={category.name}
        onClick={this.pickCategory}>
        {category.name}
      </DropdownItem>
    ));
    const makeItemCards = items.map(item => (
      <div>
        <ItemCard
          key={item.id}
          item={ item }
        />
      </div>
    ));

    return (
      <div className="Home justify-content-center">
        <div className="form-group">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    caret
                    onClick={this.showCategories}
                    defaultValue={ categoryName }
                  >
                    { categoryName }
                  </DropdownToggle >
                  <DropdownMenu>
                    { catLoop }
                  </DropdownMenu>
                </Dropdown>
              </div>
        <div className="row">
          { (items.length > 0 ? makeItemCards : '') }
        </div>
        <div className="">
        </div>
      </div>
    );
  }
}

export default Home;
