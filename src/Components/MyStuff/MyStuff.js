import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// JSs
import itemsData from '../../helpers/data/itemsData';
// STYLES
import './MyStuff.scss';

// const defaultState = [{
//   name: '',
//   imageUrl: '',
//   description: '',
//   priceperhour: 0,
//   priceperday: 0,
//   isAvailable: true,
//   category: '',
//   condition: '',
//   categoryId: '',
//   ownerId: '',
// }];

class MyStuff extends React.Component {
  state = {
    items: [],
  }

  getUserItems = (uid) => {
    itemsData.getItems(uid)
      .then((items) => {
        console.error(items, 'resp');
        this.setState({ items });
      })
      .catch(err => console.error('no items to display', err));
  };

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.getUserItems(uid);
  }

  render() {
    const { items } = this.state;
    const makeItemCards = items.map(item => (
      <div className="card">
        <img className="card-img-top" src={item.imageUrl} alt={(`Item belonging to ${item.name}`)} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
        </div>
      </div>
    ));
    return (
      <div>
        { makeItemCards }
      </div>
    );
  }
}
export default MyStuff;
