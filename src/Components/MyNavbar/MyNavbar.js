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
import UpdateUser from '../UpdateUser/UpdateUser';
// STYLES
import './MyNavbar.scss';
import 'animate.css';
// SVGs
import userIcon from '../../SVGs/iconmonstr-user-circle-thin.svg';
import brand from '../../SVGs/BringItBackTransparentWHITE.svg';
import usersData from '../../helpers/data/usersData';
// import downArrow from '../../SVGs/iconmonstr-arrow-69.svg';

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


class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    username: PropTypes.string.isRequired,
    useruid: PropTypes.string.isRequired,
    removeUsername: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
    dropdownOpen: false,
    modal: false,
    userObj: defaultUserState,
    hasUser: false,
  }

  componentDidMount() {
    // this.getUser();
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
    this.getUser();
  };

  openArrowDropDown = (e) => {
    e.preventDefault();
  };

  getUser = () => {
    usersData.getUsers(this.props.useruid)
      .then((res) => {
        this.setState({ user: res[0], hasUser: true });
      })
      .catch(err => console.error('no user to nav', err));
  };

  logMeOut = (e) => {
    e.preventDefault();
    this.props.removeUsername();
    firebase.auth().signOut();
  };

  render() {
    const { authed, username, useruid } = this.props;
    const { modal, user } = this.state;
    const buildNavbar = () => {
      if (authed) {
        return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to={(`/mystuff/${useruid}`)}>My Stuff</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to={(`/myrentals/${useruid}`)}>Renting</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal bounceIn" tag={RRNavLink} to={(`/messageboard/${useruid}`)}>Notes</NavLink>
          </NavItem>
          {/* this.props.history.push({
      pathname: `/messages/${this.state.useruid}`,
      state: { ownersId: ownerId },
    }); */}
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
          /> : '' }
        <div className="upperNav">
        <NavbarBrand className="navBarBrand" href="/"><img className="bounceIn brandSVG" src={brand} alt="brand svg" /></NavbarBrand>
          <div>
            <div className="userDisplayDiv">
              <img className="userIcon" src={userIcon} alt="icon for a user"/>
              <p className="userName">{ username }</p>
              <UncontrolledButtonDropdown
                id='settingsDropDown'
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle2}
              >
                <DropdownToggle>{<i className="fas fa-chevron-circle-down"></i>}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.openModal} ><i className="fas fa-user"></i> User Profile</DropdownItem>
                    <DropdownItem><i className="fas fa-cog"></i> Settings</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logMeOut}><i className="fa fa-sign-out fa-fw"></i> Logout</DropdownItem>
                  </DropdownMenu>
              </UncontrolledButtonDropdown>
              {/* <img className="dropdownIcon" src={downArrow} alt="icon dropdown arrow" onClick={this.openArrowDropDown} /> */}
            </div>
          </div>
        </div>
        <Navbar className="navBar" expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
