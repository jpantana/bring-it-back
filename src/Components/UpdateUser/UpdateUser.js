import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
// import 'firebase/auth';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap';
import FileUploader from 'react-firebase-file-uploader'; // added for image
// JSs
import usersData from '../../helpers/data/usersData';
import userShape from '../../helpers/propz/userShape';
// SVGs
import editIcon from '../../SVGs/iconmonstr-edit-10.svg';
import cameraIcon from '../../SVGs/iconmonstr-photo-camera-thin.svg';
// STYLEs
import './UpdateUser.scss';

const defaultUserState = {
  firstname: '',
  lastname: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  uid: '',
  username: '',
};

class UpdateUser extends React.Component {
  static propTypes = {
    user: userShape.userShape,
    openModal: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    modal: PropTypes.bool.isRequired,
  }

  state = {
    editUser: defaultUserState,
    fillForm: false,
    image: '',
    progress: 0,
    imageUrl: '',
    hideInfoBlock: false,
    justSavePhoto: false,
  }

  // getDesiredStateFromProps() {
  //   console.error(this.props);
  // }

  editUserinfo = (e) => {
    e.preventDefault();
    const tempUser = ({ ...this.props.user });
    this.setState({
      editUser: tempUser,
      fillForm: !this.state.fillForm,
      hideInfoBlock: !this.state.hideInfoBlock,
    });
  };

  callOpenModal = (e) => {
    e.preventDefault();
    this.props.openModal(e);
  };

  editUserForm = (name, e) => {
    const tempItem = { ...this.state.editUser };
    tempItem[name] = e.target.value;
    this.setState({ editUser: tempItem });
  };

  firstnameChange = e => this.editUserForm('firstname', e);

  lastnameChange = e => this.editUserForm('lastname', e);

  streetChange = e => this.editUserForm('street', e);

  cityChange = e => this.editUserForm('city', e);

  stateChange = e => this.editUserForm('state', e);

  zipcodeChange = e => this.editUserForm('zipcode', e);

  usernameChange = e => this.editUserForm('username', e);

  formEditSubmit = (e) => {
    e.preventDefault();
    const uid = this.props.user.id;
    const editUserObj = { ...this.state.editUser };
    delete editUserObj.id;
    if (this.state.imageUrl === '') {
      editUserObj.profile = this.props.user.profile;
    } else {
      editUserObj.profile = this.state.imageUrl;
    }
    usersData.editExistingUser(editUserObj, uid)
      .then(() => {
        this.setState({ editUser: defaultUserState });
        this.props.openModal(e);
        this.props.getUser();
      });
    // .catch(err => console.error('no existing user edited here', err));
  };

  savePicOnly = (e) => {
    e.preventDefault();
    const uid = this.props.user.id;
    const { imageUrl } = this.state;
    const editUserObj = { ...this.props.user };
    editUserObj.profile = imageUrl;
    usersData.editExistingUser(editUserObj, uid)
      .then(() => {
        this.props.openModal(e);
        this.props.getUser();
      });
    // .catch(err => console.error('no profile pic added', err));
  };

  // Image Upload Section
  handleUploadStart = () => this.setState({ progress: 0 });

  handleUploadSuccess = (filename) => {
    this.setState({
      image: filename,
      progress: 100,
    });
    firebase.storage().ref('images').child(filename).getDownloadURL()
      .then((url) => {
        if (this.state.fillForm === false) {
          this.setState({ imageUrl: url, justSavePhoto: !this.state.justSavePhoto });
        } else {
          this.setState({ imageUrl: url });
        }
      })
      .catch(err => console.error('no image url', err));
  };

  render() {
    const { user } = this.props;
    const {
      editUser,
      fillForm,
      image,
      imageUrl,
      progress,
    } = this.state;
    return (
      <div className="UpdateUser">
        <Modal isOpen={this.props.modal} >
          <ModalHeader className="updateModalHeader">Update Your User Profile</ModalHeader>
            <ModalBody>
            <div className="fileUploaderDiv">
              <label className="fileUploader">
                <img className="cameraIcon" src={cameraIcon} alt="camera icon" />
                Upload a profile picture!
                <FileUploader
                    hidden
                    accept='image/*'
                    name='image'
                    storageRef={firebase.storage().ref('images/')}
                    onUploadStart={this.handleUploadStart}
                    onUploadSuccess={this.handleUploadSuccess}
                  />
              </label>

            </div>
            <div>
                {this.state.hideInfoBlock === false
                  ? <div className="hideBlockInfoDiv">
                      <img className="userUpdateEditIcon" src={editIcon} alt="edit icon" onClick={this.editUserinfo} />
                      <p className="updateUserUsername">{`${user.username}`}</p>
                      <p className="updateUserFirstname">{`${user.firstname} ${user.lastname}`}</p>
                      <p className="updateUserStreet">{`${user.street}`}</p>
                      <p className="updateUserCity">{`${user.city}, ${user.state}`}</p>
                    </div>
                  : ''}
                  {(image !== '' && progress === 100
                    ? <div className="imgUploadDiv">
                        <img
                          className="img-thumbnail imgInModal"
                          src={imageUrl}
                          alt="profile pic being uploaded" />
                      </div> : ''
                  )}
                  {(image !== '' && fillForm === false
                    ? <div className="saveUpdateBtnDiv">
                      <Button className="saveUpdateProfileBtn" onClick={this.savePicOnly} >Save Profile Picture</Button>
                    </div>
                    : ''
                  )}
              </div>

              {fillForm === true
                ? <form>
                    <div className="form-group updateProfForm">
                      <label className="updateFirstNameLabel" htmlFor="editfirstName">First Name</label>
                      <input
                        type="text"
                        className="form-control updateFirstNameInput"
                        id="editfirstName"
                        aria-describedby="firstname"
                        placeholder="First Name"
                        defaultValue={editUser.firstname}
                        onChange={this.firstnameChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="updateLastNameLabel" htmlFor="editlastname">Last Name</label>
                      <input
                        type="text"
                        className="form-control updateLastNameInput"
                        id="editlastname"
                        aria-describedby="lastname"
                        placeholder="Last Name"
                        defaultValue={editUser.lastname}
                        onChange={this.firstnameChange}
                      />
                    </div>
                    <div className="form-group">
                    <label className="editUsernameLabel" htmlFor="edituserName">Create A User Name</label>
                    <input
                      type="text"
                      className="form-control editUsername"
                      id="edituserName"
                      placeholder="user123"
                      defaultValue={editUser.username}
                      onChange={this.usernameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editstreetAddress">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editstreetAdd
                      ess" aria-describedby="streetAddress"
                      placeholder="Street Address"
                      defaultValue={editUser.street}
                      onChange={this.streetChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editcity">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editcity
                      ess" aria-describedby="streetAddress"
                      placeholder="City"
                      defaultValue={editUser.city}
                      onChange={this.cityChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editstate">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editstate"
                      placeholder="State"
                      defaultValue={editUser.state}
                      onChange={this.stateChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="editzipCode">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editzipCode"
                      placeholder="Zip Code"
                      defaultValue={editUser.zipcode}
                      onChange={this.zipcodeChange}
                    />
                  </div>
                  <div className="saveUpdateBtnDiv">
                    <Button className="saveUpdateProfileBtn" onClick={this.formEditSubmit} >Update</Button>
                  </div>
                </form>
                : '' }
              <div className="canceBtnUpdateModalDiv">
                <Button className="canceBtnUpdateModal" onClick={this.callOpenModal} >Cancel</Button>
              </div>
            </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateUser;
