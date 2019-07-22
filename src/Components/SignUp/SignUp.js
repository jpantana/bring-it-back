import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';

import usersData from '../../helpers/data/usersData';

import './SignUp.scss';

const defaultState = {
  firstname: '',
  lastname: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  username: '',
};

class SignUp extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  state = {
    newItem: defaultState,
  }

  deleteUser = (e) => {
    e.preventDefault();
    // this.props.history.push('/auth'); // may need to call this before you delete UID
    firebase.auth().currentUser.delete()
      .then((() => {
        document.reload();
      })).catch(err => console.error('user not deleted', err));
  };

  addNewUserForm = (name, e) => {
    const tempItem = { ...this.state.newItem };
    tempItem[name] = e.target.value;
    this.setState({ newItem: tempItem });
  };

  firstnameChange = e => this.addNewUserForm('firstname', e);

  lastnameChange = e => this.addNewUserForm('lastname', e);

  streetChange = e => this.addNewUserForm('street', e);

  cityChange = e => this.addNewUserForm('city', e);

  stateChange = e => this.addNewUserForm('state', e);

  zipcodeChange = e => this.addNewUserForm('zipcode', e);

  usernameChange = e => this.addNewUserForm('username', e);

  formSubmit = (e) => {
    e.preventDefault();
    const saveNewUser = { ...this.state.newItem };
    saveNewUser.uid = firebase.auth().currentUser.uid;
    usersData.addNewUser(saveNewUser)
      .then((resp) => {
        this.props.history.push('/home');
      }).catch(err => console.error('no new user saved', err));
  };

  render() {
    const { newItem } = this.state;
    return (
      <div>
        <Modal isOpen={true} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create Your Account!</ModalHeader>
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
                  defaultValue={newItem.firstname}
                  onChange={this.firstnameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  defaultValue={newItem.lastname}
                  onChange={this.lastnameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Create A User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="user123"
                  defaultValue={newItem.username}
                  onChange={this.usernameChange}
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
                  defaultValue={newItem.street}
                  onChange={this.streetChange}
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
                  defaultValue={newItem.city}
                  onChange={this.cityChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder="State"
                  defaultValue={newItem.state}
                  onChange={this.stateChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  placeholder="Zip Code"
                  defaultValue={newItem.zipcode}
                  onChange={this.zipcodeChange}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.formSubmit}>Submit</button>
              <button type="submit" className="btn btn-primary" onClick={this.deleteUser}>Cancel</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
