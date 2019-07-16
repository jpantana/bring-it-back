import React from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// JSs
import itemsData from '../../helpers/data/itemsData';
// STYLES
import './MyStuff.scss';

const defaultState = {
  name: '',
  imageUrl: '',
  description: '',
  priceperhour: 0,
  priceperday: 0,
  isAvailable: true,
  category: '',
  condition: '',
  categoryId: '',
  ownerId: '',
};

class MyStuff extends React.Component {
  state = {
    item: defaultState,
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    itemsData.getItems(uid)
      .then((resp) => {
        // console.error(resp);
      })
      .catch(err => console.error('no items to display', err));
  }

  render() {
    return (
      <h1>My Stuff</h1>
    );
  }
}
export default MyStuff;
