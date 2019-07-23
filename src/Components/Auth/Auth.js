import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import './Auth.scss';
// SVGs
import email from '../../SVGs/iconmonstr-email-4.svg';

class Auth extends React.Component {
  state = {
    signUpClicked: '',
    signupEmail: '',
    signupPassword: '',
    loginEmail: '',
    loginPassword: '',
    isOpen: false,
  }

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  emailLogin = (e) => {
    e.preventDefault();
    const myEmail = document.getElementById('loginInputEmail').value;
    const password = document.getElementById('loginInputPassword').value;
    firebase.auth().signInWithEmailAndPassword(myEmail, password)
      .then()
      .catch((err) => {
        this.setState({ isOpen: !this.state.isOpen });
        console.error('email does not exist. try another email', err);
      });
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ isOpen: false });
  }; 

  emailSignup = (e) => {
    e.preventDefault();
    this.setState({ signUpClicked: e.target.id });
  };

  submitNewEmailSignup = (e) => {
    e.preventDefault();
    const myEmail = document.getElementById('signupInputEmail').value;
    const password = document.getElementById('signupInputPassword').value;
    firebase.auth().createUserWithEmailAndPassword(myEmail, password)
      .then(resp => console.error(resp))
      .catch(err => console.error('no new user created', err));
  };


  render() {
    const {
      signUpClicked,
      loginEmail,
      loginPassword,
      signupEmail,
      signupPassword,
      isOpen,
    } = this.state;
    return (
      <div className="Auth">

      <Modal isOpen={isOpen}>
          <ModalHeader>Sorry, this email does not exist.</ModalHeader>
          <ModalBody>Try another, or create a new account below by clicking Create New Account, or login with Google!</ModalBody>
          <button className="btn signupBtn" onClick={this.closeModal}>Close</button>
      </Modal>

        <h1 className="signInBanner">Please Sign In</h1>
        <form className="signUpForm">
          <div className="form-group">
            <label htmlFor="loginInputEmail">Email address</label>
            <input type="email" className="form-control" id="loginInputEmail" aria-describedby="emailHelp" placeholder="Enter email" defaultValue={loginEmail}/>
          </div>
          <div className="form-group">
            <label htmlFor="loginInputPassword">Password</label>
            <input type="password" className="form-control" id="loginInputPassword" placeholder="Password" defaultValue={loginPassword}/>
          </div>
          <button type="button" className="btn signupBtn" onClick={this.emailLogin}>Sign In</button>
        </form>

        <button className="btn emailBtn" id="createAccountBtn" onClick={this.emailSignup}>
          <img className="emailIcon" src={email} alt="email icon" />
          Create An Account
        </button>

        { signUpClicked !== ''
          ? <div className="form-group">
              <h2 className="signInBanner">Create A Login</h2>
                <form className="signUpForm">
                  <div className="form-group">
                    <label htmlFor="signupInputEmail">Email address</label>
                    <input type="email" className="form-control" id="signupInputEmail" aria-describedby="emailHelp" placeholder="Enter email" defaultValue={signupEmail}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="signupInputPassword">Password</label>
                    <input type="password" className="form-control" id="signupInputPassword" placeholder="Password" defaultValue={signupPassword}/>
                  </div>
                  <button type="button" className="btn signupBtn" onClick={this.submitNewEmailSignup}>Sign Up</button>
                </form>
              </div> : '' }

        <button className="btn googleBtn" onClick={this.loginClickEvent}>
          <img className="googleIcon" src="https://image.flaticon.com/teams/slug/google.jpg" alt="google icon" />
          Continue With Google
        </button>
      </div>
    );
  }
}

export default Auth;
