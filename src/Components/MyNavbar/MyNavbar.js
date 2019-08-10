import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
// JSs
import messagesData from '../../helpers/data/messagesData';
import UpdateUser from '../UpdateUser/UpdateUser';
// STYLES
import './MyNavbar.scss';
import 'animate.css';
// SVGs
import userIcon from '../../SVGs/iconmonstr-user-circle-thin.svg';
import brand from '../../SVGs/BringItBackTransparentWHITE.svg';
import usersData from '../../helpers/data/usersData';

const defaultUserState = {
  firstname: '',
  lastname: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  uid: '',
  username: '',
  proifle: '',
};

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    username: PropTypes.string.isRequired,
    useruid: PropTypes.string.isRequired,
    removeUsername: PropTypes.func.isRequired,
    profilePic: PropTypes.string.isRequired,
  }

  state = {
    isOpen: false,
    dropdownOpen: false,
    modal: false,
    user: defaultUserState,
    hasUser: false,
    profilePic: '',
    msgsReceived: [],
  }

  componentWillReceiveProps() {
    if (this.props.authed === true && this.props.useruid !== '') {
      this.getUser();
      this.getNotifications(this.props.useruid);
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle2 = this.toggle.bind(this);

  toggle2() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

  addProfileLink = () => {
    this.setState({ profilePic: this.state.user.profile });
  };

  getUser = () => {
    usersData.getUsers(this.props.useruid)
      .then((res) => {
        this.setState({
          user: res[0],
          hasUser: true,
        });
        this.addProfileLink();
      })
      .catch(err => console.error('no user to navbar', err));
  };

  logMeOut = (e) => {
    e.preventDefault();
    this.setState({ profilePic: '' });
    this.props.removeUsername();
    firebase.auth().signOut();
  };

  getNotifications = (uid) => {
    messagesData.getReceivedMessages()
      .then((res) => {
        const msgReceived = res.filter(m => m.otheruserid === uid);
        this.setState({ msgsReceived: msgReceived });
        // filter msgs for the below params
        // get all the messages and sort against the otheruserid to the uid and ping a notification
      }).catch();
  };

  render() {
    const { authed, username, useruid } = this.props;
    const { modal, user, msgsReceived } = this.state;
    const buildNavbar = () => {
      if (authed) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to="/home">
                <span><i className="fas fa-home navIcon"></i></span>
                <br/>
                <span className="navItemTitle">Home</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to={(`/mystuff/${useruid}`)}>
              <span><i className="fas fa-archive navIcon"></i></span>
              <br/>
              <span className="navItemTitle">My Stuff</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to={(`/myrentals/${useruid}`)}>
              <span><i className="fas fa-shopping-cart navIcon"></i></span>
              <br/>
              <span className="navItemTitle">Renting</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to={(`/notifications/${useruid}`)}>
              <span><i className="fas fa-envelope navIcon"></i></span>
              <br/>
              <span className="navItemTitle">Notifications</span>
              {msgsReceived.length > 0
                ? <span className="notificationFlag">{msgsReceived.length}</span>
                : ''}
            </NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <nav className="ml-auto" />;
    };

    return (
      <div className="MyNavbar">
       {this.state.hasUser === true
         ? <UpdateUser
            key='updateUserModal'
            user={user}
            modal={modal}
            openModal={this.openModal}
            getUser={this.getUser}
          /> : '' }
        <div className="upperNav">
        <NavbarBrand className="navBarBrand" href="/"><img className="bounceIn brandSVG" src={brand} alt="brand svg" /></NavbarBrand>
          <div>
            <div className="userDisplayDiv">
              {(this.state.profilePic !== '' && this.props.authed === true
                ? <div className="profilePic">
                    {/* <img className="userIcon" src={userIcon} alt="icon for a user"/> */}
                    <img className="profilePicImg" src={this.state.profilePic} alt="user profile" />
                  </div>
                : <img className="userIcon" src={userIcon} alt="icon for a user"/>
              )}

              <p className="userName">{ username }</p>
              {this.props.authed === true
                ? <UncontrolledButtonDropdown
                    id='settingsDropDown'
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle2}
                  >
                    <DropdownToggle>{<i className="fas fa-chevron-circle-down navDropDown"></i>}</DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem className="userdropdownText" onClick={this.openModal} ><i className="fas fa-user updateUserIcon"></i> User Profile</DropdownItem>
                        <DropdownItem className="userdropdownText"><i className="fas fa-cog updateCogWheelIcon"></i> Settings</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.logMeOut}><i className="fas fa-sign-out-alt signoutIcon"></i> Logout</DropdownItem>
                      </DropdownMenu>
                  </UncontrolledButtonDropdown>
                : ''}
            </div>
          </div>
        </div>
        <Navbar className="navBar" expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
        {/* <div className="footer-copyright footer">© 2018 Bring It Back | by
          <a href="https://josh-pantana.firebaseapp.com/" className="footerLink"> <em>Josh Pantana</em></a>
        </div> */}
      </div>
    );
  }
}

export default MyNavbar;
