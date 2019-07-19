import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// JSs

// PROPs
import categoriesShape from '../../helpers/propz/categoriesShape';
// STYLEs
import './SearchAndSort.scss';

class SearchAndSort extends React.Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(categoriesShape.categoriesShape).isRequired,
    pickCategory: PropTypes.func.isRequired,
  }

  state = {
    dropdownOpen: false,
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle = this.toggle.bind(this);

  render() {
    const {
      categories,
      categoryName,
    } = this.props;
    const catLoop = categories.map(category => (
      <DropdownItem
        id={category.id}
        value={category.name}
        onClick={this.props.pickCategory}>
        {category.name}
      </DropdownItem>
    ));

    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            caret
            onClick={this.showCategories}
            defaultValue={ categoryName }
          >
            { categoryName }
          </DropdownToggle >
          <DropdownMenu>
            { catLoop }
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default SearchAndSort;
