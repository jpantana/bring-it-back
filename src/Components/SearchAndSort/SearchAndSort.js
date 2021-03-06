import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// PROPs
import categoriesShape from '../../helpers/propz/categoriesShape';
// STYLEs
import './SearchAndSort.scss';

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
        <div className="md-form mt-0 searchBarDiv">
          <input
            className="form-control searchInput"
            type="text"
            placeholder="Search"
            aria-label="Search"
            defaultValue={searchInput}
            onChange={this.searchInput}
          />
          <i className="fas fa-search magnifyingGlass"></i>

        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="catDropDown"
        >
          <DropdownToggle
            caret
            id="SearchAndSortDropdown"
            onClick={this.showCategories}
            defaultValue={ categoryName }
            className="dropdownToggle"
          >
            { categoryName }
          </DropdownToggle >
          <DropdownMenu id="searchSortDropdown">
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
        </div>

      </div>
    );
  }
}

export default SearchAndSort;
