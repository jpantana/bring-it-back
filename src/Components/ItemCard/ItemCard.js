import React from 'react';
// import PropTypes from 'prop-types';
// JSs
import itemShape from '../../helpers/propz/itemShape';
// STYLEs
import './ItemCard.scss';

class ItemCard extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
  }

  render() {
    const { item } = this.props;

    return (
      <div className="ItemCard card">
        <div className="card-body" onClick={this.singleItem}>
          <img src={item.imageUrl} alt={item.name} className="card-img-top itemImg" />
          <h5 className="card-title">{item.name}</h5>
        </div>
        <div className="allCardIcons">
          {/* <span>{item.isAvailable === true ? <img src={checkIcon} alt="checkbox icon svg" /> : 'Rented' }</span> */}
          <span className="editDeleteSpan">
            {/* <img onClick={deleteItemEvent} src={deleteIcon} id={item.id} alt="delete icon"/>
            <img onClick={editItemEvent} src={editIcon} id={`${item.id}.edit`} alt="edit icon"/> */}
          </span>
        </div>
      </div>
    );
  }
}

export default ItemCard;
