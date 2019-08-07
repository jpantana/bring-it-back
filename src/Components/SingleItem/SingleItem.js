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
import 'animate.css';

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

  condtionFontColor = () => {
    const { singleItem } = this.props;
    if (singleItem.condition === 'Mint') {
      return <span className="itemCondition mint">{singleItem.condition}</span>;
    }
    if (singleItem.condition === 'Good') {
      return <span className="itemCondition good">{singleItem.condition}</span>;
    }
    if (singleItem.condition === 'Fair') {
      return <span className="itemCondition fair">{singleItem.condition}</span>;
    }
    if (singleItem.condition === 'Relic') {
      return <span className="itemCondition relic">{singleItem.condition}</span>;
    }
    return null;
  }

  render() {
    // IDEAS: carousel of imgs; calculator for price booking; messaging users
    const { singleItem, editItemEvent } = this.props;
    return (
      <div className="SingleItem" onClick={this.singleItemHide}>
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

        <div className="mainCard">
          <div className="imgDiv">
            {/* <img className="card-img-top SingleItemImg" src={singleItem.imageUrl} alt={(`${singleItem.name}`)} /> */}
            <img src="https://via.placeholder.com/200x250" className="card-img-top SingleItemImg" alt="placeholder img" />
          </div>

            <div className="singleItemDiv">
              <div className="singleItemDescrip">
                {singleItem.description}
              </div>
              <div className="availabilityDiv">
                {singleItem.isAvailable === true
                  ? <p className="isAvailable">
                    <i className="fas fa-check-circle checkIcon"></i>
                    This item is currently available for rent
                    </p>
                  : <p className="isNotAvailable">
                    This item is currently available for rent
                    </p>
                }
              </div>
              <div className="detailContentSingleItem">
                <p className="thCategorySI">Category</p>
                <p className="singleItemCategory">{singleItem.category}</p>
              </div>
            </div>
            {/* <table className="singleItemTable">
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
            </table> */}
          </div>

          <div className="itemConditionWrapper">
            { this.condtionFontColor() }
          </div>
        </div>
    );
  }
}

export default SingleItem;
