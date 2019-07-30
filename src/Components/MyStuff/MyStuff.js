import React from 'react';
import { Modal } from 'reactstrap';
// JSs
import MyMap from '../Leaflet/Leaflet';
import SingleItem from '../SingleItem/SingleItem';
import itemsData from '../../helpers/data/itemsData';
import Items from '../Items/Items';
import AddNewItems from '../AddNewItems/AddNewItems';
import itemCategoriesData from '../../helpers/data/itemCategoriesData';
import EditItem from '../EditItem/EditItem';
// STYLES
import './MyStuff.scss';
// PROPS
// SVGs
import addIcon from '../../SVGs/iconmonstr-plus-circle-thin.svg';

const defaultItemState = {
  name: '',
  category: 'Category',
  condition: '',
  categoryId: '',
  ownerId: '',
  description: '',
  imageUrl: 'https://via.placeholder.com/200x200',
  isAvailable: true,
  priceperday: '',
  priceperhour: '',
};

class MyStuff extends React.Component {
  state = {
    items: [],
    itemId: '',
    isClicked: false,
    singleItem: defaultItemState,
    newItem: defaultItemState,
    editItem: defaultItemState,
    isOpen: false,
    userid: '',
    categories: [],
    categoryId: '',
  }

  // CRUD ON ITEMS DATA
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
    const tempItem = { ...this.state.newItem };
    tempItem[name] = e.target.value;
    this.setState({ newItem: tempItem });
  };

  editItemForm = (name, e) => {
    const tempItem = { ...this.state.editItem };
    tempItem[name] = e.target.value;
    this.setState({ editItem: tempItem });
  };

  // callback function. opens and closes and clears modal
  addNewItem = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
      newItem: defaultItemState,
    });
  };

  closeEditModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false,
      editIsOpen: false,
      editItem: defaultItemState,
    });
  };

  editItemEvent = (e) => {
    e.preventDefault();
    const itm = e.target.id;
    const itemId = itm.split('.', 1)[0];
    itemsData.getSingleItem(itemId)
      .then((resp) => {
        this.setState({ itemId, editItem: resp.data, editIsOpen: !this.state.editIsOpen });
      })
      .catch();
  };

  updateImageUrl = (url) => {
    const oldState = { ...this.state };
    oldState.editItem.imageUrl = url;
    this.setState(oldState);
  };

  newImageUrl = (url) => {
    const oldState = { ...this.state };
    oldState.newItem.imageUrl = url;
    this.setState(oldState);
  };

  // CATEGORIES DATA SET
  categoryIdStateChg = (e) => {
    this.setState({ categoryId: e.target.id });
  };

  showCategories = () => {
    itemCategoriesData.getCategories()
      .then((resp) => {
        this.setState({ categories: resp });
      })
      .catch(err => console.error('no categories to speak of', err));
  };

  deleteItemEvent = (e) => {
    e.preventDefault();
    itemsData.deleteItem(e.target.id)
      .then(() => {
        this.getUserItems(this.state.userid);
      }).catch(err => console.error('item not deleted', err));
  };

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.setState({ userid: uid });
    this.getUserItems(uid); // only shows your user's items
  }


  render() {
    const {
      items,
      isClicked,
      singleItem,
      itemId,
      userid,
    } = this.state;
    const makeItemCards = items.map(item => (
        <Items
          key={`items.${item.id}`}
          item={ item }
          seeSingleItem={this.seeSingleItem}
          getUserItems={this.getUserItems}
          deleteItemEvent={this.deleteItemEvent}
          editItemEvent={this.editItemEvent}
        />
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
                    categoryIdStateChg={this.categoryIdStateChg}
                    categoryId={this.state.categoryId}
                    newImageUrl={this.newImageUrl}
                  />}
                </Modal>
                <Modal isOpen={this.state.editIsOpen} >
                <EditItem
                  key={`editItem.${itemId}`}
                  id={itemId}
                  categories={this.state.categories}
                  editItem={this.state.editItem}
                  categoryIdStateChg={this.categoryIdStateChg}
                  categoryId={this.state.categoryId}
                  showCategories={this.showCategories}
                  userid={this.state.userid}
                  getUserItems={this.getUserItems}
                  editItemForm={this.editItemForm}
                  closeEditModal={this.closeEditModal}
                  updateImageUrl={this.updateImageUrl}
                />
                </Modal>
        <div className="">
          <span className="addNewSpan" onClick={this.addNewItem}>
            Rent More Of Your Stuff {<img src={addIcon} alt="add new icon" className="bounceIn addIcon" />}
          </span>
          { makeItemCards }
        </div>
        <div className="col col-6">
          { (isClicked === true ? <SingleItem
            key={`single.${singleItem.id}`}
            singleItem={singleItem}
            isClicked={isClicked}
            unseeSingleItem={this.unseeSingleItem}
            deleteItemEvent={this.deleteItemEvent}
            editItemEvent={this.editItemEvent}
          /> : '') }
        </div>
        <MyMap key={'unique4'} id='mystuffMap' userid={userid} />
      </div>
    );
  }
}
export default MyStuff;
