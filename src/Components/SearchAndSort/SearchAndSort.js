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
// SVGs
// import magnifier from '../../SVGs/iconmonstr-magnifier-4.svg';

class SearchAndSort extends React.Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(categoriesShape.categoriesShape).isRequired,
    pickCategory: PropTypes.func.isRequired,
    searchItemInput: PropTypes.func.isRequired,
    searchInput: PropTypes.string.isRequired,
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

  searchInput = e => this.props.searchItemInput(e);

  render() {
    const {
      categories,
      categoryName,
      searchInput,
    } = this.props;
    const catLoop = categories.map(category => (
      <DropdownItem
        key={category.id}
        id={category.id}
        value={category.name}
        onClick={this.props.pickCategory}>
        {category.name}
      </DropdownItem>
    ));

    return (
      <div className="SearchAndSort">
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="catDropDown"
        >
          <DropdownToggle
            caret
            onClick={this.showCategories}
            defaultValue={ categoryName }
            className="dropdownToggle"
          >
            { categoryName }
          </DropdownToggle >
          <DropdownMenu className="dropdownMenu">
            <DropdownItem
              onClick={this.props.pickCategory}
              value={'Categories'}
              id={'allCategoriesSelected'}
            >
              All
            </DropdownItem>
            <DropdownItem divider />
            { catLoop }
          </DropdownMenu>
        </Dropdown>
        <div className="md-form mt-0">
          <input
            className="form-control searchInput"
            type="text"
            placeholder="Search"
            aria-label="Search"
            defaultValue={searchInput}
            onChange={this.searchInput}
          />
        </div>
      </div>
    );
  }
}

export default SearchAndSort;
