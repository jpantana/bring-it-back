import React from 'react';
import PropTypes from 'prop-types';
// PROPs
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import checkIcon from '../../SVGs/iconmonstr-check-mark-6.svg';
import deleteIcon from '../../SVGs/iconmonstr-x-mark-4.svg';
import editIcon from '../../SVGs/iconmonstr-edit-10.svg';
// STYLEs
import './SingleItem.scss';

class SingleItem extends React.Component {
  static propTypes = {
    singleItem: itemShape.itemShape,
    isClicked: PropTypes.bool.isRequired,
    unseeSingleItem: PropTypes.func.isRequired,
    deleteItemEvent: PropTypes.func.isRequired,
    editItemEvent: PropTypes.func.isRequired,
  }

  singleItemHide = (e) => {
    e.preventDefault();
    const { unseeSingleItem } = this.props;
    unseeSingleItem();
  };

  deleteEvent = (e) => {
    e.preventDefault();
    const { unseeSingleItem, deleteItemEvent } = this.props;
    deleteItemEvent(e);
    unseeSingleItem();
  };

  render() {
    // IDEAS: carousel of imgs; calculator for price booking; messaging users
    const { singleItem, editItemEvent } = this.props;
    return (
      <div className="SingleItem">
        <div className="cardHeader">

          <h1 className="full-card-title">{singleItem.name}</h1>

          <div className="allCardIcons">

            <span className="editDeleteSpan">
              <img onClick={this.deleteEvent} src={deleteIcon} id={singleItem.id} alt="delete icon" className="singleIcon"/>
              <img onClick={editItemEvent} src={editIcon} id={`${singleItem.id}.edit`} alt="edit icon" className="singleIcon"/>
            </span>
            <span className="conditionalIconSpan">{singleItem.isAvailable === true
              ? <img src={checkIcon} alt="checkbox icon svg" className="singleIcon" />
              : <p className="isRented">Rented</p> }</span>

          </div>

        </div>

        <div className="mainCard" onClick={this.singleItemHide}>

          <div className="imgDiv">
            {/* <img className="card-img-top SingleItemImg" src={singleItem.imageUrl} alt={(`${singleItem.name}`)} /> */}
            <img src="https://via.placeholder.com/200x250" className="card-img-top SingleItemImg" alt="placeholder img" />
          </div>

          <div className="card singleItemDetails">
            <span className="priceSpan">
              <p className="card-text price">${singleItem.priceperhour}.00<span className="afterPrice"> hourly</span></p>
              <p className="card-text price">${singleItem.priceperday}.00<span className="afterPrice"> daily</span></p>
            </span>
            <p className="aboutSpan">description</p>
            <p className="card-text itemDescription">{singleItem.description}</p>
            <table classname="singleItemTable">
              <tbody>
                <tr>
                  <td className="thConditionSI">Condition</td>
                  <td className="singleItemCondition">{singleItem.condition}</td>
                </tr>
                <tr>
                  <td className="thCategorySI">Category</td>
                  <td className="singleItemCategory">{singleItem.category}</td>
                </tr>
              </tbody>
            </table>


            {/* <p className="card-text"><span className="aboutSpan">About</span>{singleItem.description}</p>
            <p className="card-text"><span className="conditionSpan">Condition</span>{singleItem.condition}</p>
            <p className="card-text"><span className="categorySpan">Category</span>{singleItem.category}</p> */}
          </div>
        </div>

    </div>
    );
  }
}

export default SingleItem;
