import React from 'react';
import PropTypes from 'prop-types';
// JSs
// PROPS
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import checkIcon from '../../SVGs/iconmonstr-check-mark-6.svg';
import deleteIcon from '../../SVGs/iconmonstr-x-mark-4.svg';
import editIcon from '../../SVGs/iconmonstr-edit-10.svg';
// STYLES
import './Items.scss';

class Items extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    seeSingleItem: PropTypes.func.isRequired,
    getUserItems: PropTypes.func.isRequired,
    deleteItemEvent: PropTypes.func.isRequired,
  }

  singleItem = (e) => {
    e.preventDefault();
    const { item, seeSingleItem } = this.props;
    seeSingleItem(item);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="card nameCard">
        <div className="card-body" onClick={this.singleItem}>
          <h5 className="card-title">{item.name}</h5>
        </div>
        <div className="allCardIcons">
          <span>{item.isAvailable === true ? <img src={checkIcon} alt="checkbox icon svg" /> : 'Rented' }</span>
          <span className="editDeleteSpan">
            <img onClick={this.props.deleteItemEvent} src={deleteIcon} id={item.id} alt="delete icon"/>
            <img src={editIcon} alt="edit icon"/>
          </span>
        </div>
      </div>
    );
  }
}

export default Items;
