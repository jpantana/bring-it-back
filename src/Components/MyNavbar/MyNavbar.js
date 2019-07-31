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
// STYLES
import './MyNavbar.scss';
import 'animate.css';
// SVGs
import userIcon from '../../SVGs/iconmonstr-user-circle-thin.svg';
import brand from '../../SVGs/BringItBackTransparentWHITE.svg';
// import downArrow from '../../SVGs/iconmonstr-arrow-69.svg';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    useruid: PropTypes.string.isRequired,
    removeUsername: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
    dropdownOpen: false,
  }

  toggle2 = this.toggle.bind(this);

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle2() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  openArrowDropDown = (e) => {
    e.preventDefault();
  };

  logMeOut = (e) => {
    e.preventDefault();
    this.props.removeUsername();
    firebase.auth().signOut();
  };

  render() {
    const { authed, username, useruid } = this.props;
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
          <NavItem>
            <NavLink className="navLink hvr-shadow  hvr-underline-reveal bounceIn" onClick={this.logMeOut} href="https://github.com/reactstrap/reactstrap">Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <nav className="ml-auto" />;
    };

    return (
      <div className="MyNavbar">
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
                    <DropdownItem><i className="fa fa-envelope fa-fw"></i> User Profile</DropdownItem>
                    <DropdownItem><i className="fa fa-gear fa-fw"></i> Settings</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><i className="fa fa-sign-out fa-fw"></i> Logout</DropdownItem>
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
