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
} from 'reactstrap';
// JSs
// STYLES
import './MyNavbar.scss';
// SVGs
import userIcon from '../../SVGs/iconmonstr-user-circle-thin.svg';
import brand from '../../SVGs/BringItBackTransparentWHITE.svg';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    useruid: PropTypes.string.isRequired,
    removeUsername: PropTypes.func.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

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
            <NavLink className="navLink hvr-shadow hvr-underline-reveal" tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow hvr-underline-reveal" tag={RRNavLink} to={(`/mystuff/${useruid}`)}>My Stuff</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="navLink hvr-shadow  hvr-underline-reveal" onClick={this.logMeOut} href="https://github.com/reactstrap/reactstrap">Logout</NavLink>
          </NavItem>
        </Nav>
        );
      }
      return <nav className="ml-auto" />;
    };

    return (
      <div className="MyNavbar">
        <div className="upperNav">
        <NavbarBrand className="navBarBrand" href="/"><img className="brandSVG" src={brand} alt="brand svg" /></NavbarBrand>
          <div>
            <div className="userDisplayDiv">
              <img className="userIcon" src={userIcon} alt="icon for a user"/>
              <p className="userName">{ username }</p>
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
