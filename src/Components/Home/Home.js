import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
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
  }

  componentDidMount() {
    const { uid } = firebase.auth().currentUser;
    this.getUser(uid);
    this.getItems();
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


  render() {
    const { items } = this.state;
    const makeItemCards = items.map(item => (
      <div>
        <ItemCard
          key={item.id}
          item={ item }
        />
      </div>
    ));

    return (
      <div className="Home justify-content-between">
        <div className="row flex-nowrap">
          { (items.length > 0 ? makeItemCards : '') }
        </div>
        <div className="">
        </div>
      </div>
    );
  }
}

export default Home;
