import React from 'react';
import { Modal } from 'reactstrap';
// JSs
import Leaflet from '../Leaflet/Leaflet';
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
  imageUrl: 'https://via.placeholder.com/400x400',
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
    editItem: defaultItemState,
    isOpen: false,
    userid: '',
    categories: [],
    editIsOpen: false,
    itemDeleted: false,
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.setState({ userid: uid });
    this.getUserItems(uid);
  }

  getUserItems = (uid) => {
    itemsData.getItems(uid)
      .then((items) => {
        this.setState({ items });
      })
      .catch(err => console.error('no items to display', err));
  };

  seeSingleItem = (item) => {
    this.setState({ isClicked: true, singleItem: item });
  };

  unseeSingleItem = () => {
    this.setState({ isClicked: false });
  };

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
        this.setState({
          isClicked: false,
          itemId,
          editItem: resp.data,
          editIsOpen: !this.state.editIsOpen,
        });
      })
      .catch();
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

  render() {
    const {
      items,
      isClicked,
      singleItem,
      itemId,
      userid,
      categories,
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
                  <AddNewItems
                    key={`addNewItem.${itemId}`}
                    addNewItem={this.addNewItem}
                    userid={userid}
                    getUserItems={this.getUserItems}
                    showCategories={this.showCategories}
                    categories={categories}
                  />
                </Modal>
                <Modal isOpen={this.state.editIsOpen} >
                  <EditItem
                    key={`editItem.${itemId}`}
                    id={itemId}
                    categories={this.state.categories}
                    showCategories={this.showCategories}
                    userid={this.state.userid}
                    getUserItems={this.getUserItems}
                    closeEditModal={this.closeEditModal}
                    editItem={this.state.editItem}
                  />
                </Modal>
        <div className="myStuffWrapper">
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
        </div>

        <div className="mystuffMap">
          <Leaflet key={'unique4'} id='mystuffMap' userid={userid} />
        </div>
      </div>
    );
  }
}
export default MyStuff;
