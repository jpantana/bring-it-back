import React from 'react';
import PropTypes from 'prop-types';
// JSs
// PROPS
import itemShape from '../../helpers/propz/itemShape';
// SVGs
import checkIcon from '../../SVGs/iconmonstr-check-mark-6.svg';
// STYLES
import './Items.scss';


class Items extends React.Component {
  static propTypes = {
    item: itemShape.itemShape,
    seeSingleItem: PropTypes.func.isRequired,
  }

  singleItem = (e) => {
    e.preventDefault();
    const { item, seeSingleItem } = this.props;
    seeSingleItem(item);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="card nameCard" onClick={this.singleItem}>
        {/* <img className="card-img-top" src={item.imageUrl} alt={(`Item belonging to ${item.name}`)} /> */}
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          {/* <p className="card-text">{item.description}</p> */}
          <span>{item.isAvailable === true ? <img src={checkIcon} alt="checkbox icon svg" /> : 'Rented' }</span>
        </div>
      </div>
    );
  }
}

export default Items;
