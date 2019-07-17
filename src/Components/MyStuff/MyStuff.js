import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
// JSs
import SingleItem from '../SingleItem/SingleItem';
import itemsData from '../../helpers/data/itemsData';
import Items from '../Items/Items';
import AddNewItems from '../AddNewItems/AddNewItems';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
// STYLES
import './MyStuff.scss';
// PROPS
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import addIcon from '../../SVGs/iconmonstr-plus-circle-thin.svg';

const defaultItemState = {
  name: '',
  category: '',
  condition: '',
  categoryId: '',
  ownerId: '',
  description: '',
  imageUrl: '',
  isAvailable: true,
  priceperday: '',
  priceperhour: '',
};

class MyStuff extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemShape.itemShape),
  }

  state = {
    items: [],
    isClicked: false,
    singleItem: defaultItemState,
    newItem: defaultItemState,
    isOpen: false,
    userid: '',
    categories: [],
  }

  // callback function from Item that allows you to see a single item (sibling component to Item)
  seeSingleItem = (item) => {
    this.setState({ isClicked: true, singleItem: item }); // change to FALSE
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

  addNewItemForm = (name, e) => {
    console.error(e, 'addNewItemForm');
    const tempItem = { ...this.state.newItem };
    tempItem[name] = e.target.value;
    this.setState({ newItem: tempItem });
  };

  showCategories = () => {
    itemCategoriesData.getCategories()
      .then((resp) => {
        this.setState({ categories: resp });
      })
      .catch(err => console.error('no categories to speak of', err));
  };

  addNewItem = (e) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen, newItem: defaultItemState });
  };

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.setState({ userid: uid });
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
                    addNewItemForm={this.addNewItemForm}
                    newItem={this.state.newItem}
                    defaultItemState = {this.defaultItemState}
                    addNewItem={this.addNewItem}
                    userid={this.state.userid}
                    getUserItems={this.getUserItems}
                    showCategories={this.showCategories}
                    categories={this.state.categories}
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
