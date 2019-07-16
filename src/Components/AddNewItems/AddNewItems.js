import React from 'react';
import {
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
// JSs

// PROPs

// STYLES
import './AddNewItems.scss';

class AddNewItems extends React.Component {
  static propTypes = {
    addNewItem: PropTypes.func.isRequired,
  }

  render() {
    // const { newItem } = this.props;

    return (
        <div>
          <ModalHeader>Create Your Account!</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  aria-describedby="firstname"
                  placeholder="First Name"
                  // defaultValue={newItem.firstname}
                  // onChange={this.firstnameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  // defaultValue={newItem.lastname}
                  // onChange={this.lastnameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Create A User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="user123"
                  // defaultValue={newItem.username}
                  // onChange={this.usernameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="streetAdd
                  ess" aria-describedby="streetAddress"
                  placeholder="Street Address"
                  // defaultValue={newItem.street}
                  // onChange={this.streetChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city
                  ess" aria-describedby="streetAddress"
                  placeholder="City"
                  // defaultValue={newItem.city}
                  // onChange={this.cityChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="State"
                  // defaultValue={newItem.state}
                  // onChange={this.stateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  placeholder="Zip Code"
                  // defaultValue={newItem.zipcode}
                  // onChange={this.zipcodeChange}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.formSubmit}>Submit</button>
            </form>
          </ModalBody>
        </div>
    );
  }
}

export default AddNewItems;
