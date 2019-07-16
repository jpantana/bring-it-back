import React from 'react';
import PropTypes from 'prop-types';
// JSs
import SingleItem from '../SingleItem/SingleItem';
import itemsData from '../../helpers/data/itemsData';
import Items from '../Items/Items';
// STYLES
import './MyStuff.scss';
// // PROPS
import itemShape from '../../helpers/propz/itemShape';

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
  static propTypes = {
    items: PropTypes.arrayOf(itemShape.itemShape),
  }

  state = {
    items: [],
    isClicked: false,
    singleItem: {},
  }

  seeSingleItem = (item) => {
    this.setState({ isClicked: true, singleItem: item }); // change to FALSE
    console.error(item, 'item in mystuff');
  };

  unseeSingleItem = () => {
    this.setState({ isClicked: false });
  };

  getUserItems = (uid) => {
    itemsData.getItems(uid)
      .then((items) => {
        this.setState({ items });
      })
      .catch(err => console.error('no items to display', err));
  };

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.getUserItems(uid);
  }

  render() {
    const { items, isClicked, singleItem } = this.state;
    const makeItemCards = items.map(item => (
      <div>
        <Items
          key={item.id}
          item={ item }
          seeSingleItem={this.seeSingleItem}
        />
      </div>
    ));
    return (
      <div className="MyStuff">
        <div className="col col-4">
          { makeItemCards }
        </div>
        <div className="col col-6">
          { (isClicked === true ? <SingleItem
            key={singleItem.id}
            singleItem={singleItem}
            isClicked={isClicked}
            unseeSingleItem={this.unseeSingleItem}
          /> : '') }
        </div>
      </div>
    );
  }
}
export default MyStuff;
