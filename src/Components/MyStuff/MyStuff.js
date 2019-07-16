import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
// JSs
import SingleItem from '../SingleItem/SingleItem';
import itemsData from '../../helpers/data/itemsData';
import Items from '../Items/Items';
import AddNewItems from '../AddNewItems/AddNewItems';
// STYLES
import './MyStuff.scss';
// PROPS
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import addIcon from '../../SVGs/iconmonstr-plus-circle-thin.svg';

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
    isOpen: false,
  }

  // callback function from Item that allows you to see a single item (sibling component to Item)
  seeSingleItem = (item) => {
    this.setState({ isClicked: true, singleItem: item }); // change to FALSE
    console.error(item, 'item in mystuff');
  };

  // callback function that allows you to click single item card to hide it
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

  addNewItem = (e) => {
    this.setState({ isOpen: !this.state.isOpen });
    e.preventDefault();
    // const something = this.state for new obj to pass
    itemsData.addNewItem()
      .then((resp) => {
        console.error(resp);
      }).catch(err => console.error('item was not added', err));
  };

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.getUserItems(uid); // only shows your user's items
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
                <Modal isOpen={this.state.isOpen} >
                  {<AddNewItems
                    addNewItem={this.addNewItem}
                  />}
                </Modal>
        <div className="col col-4 m-2">
          <span className="addNewSpan" onClick={this.addNewItem}>
            Rent More Stuff {<img src={addIcon} alt="add new icon" />}
          </span>
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
