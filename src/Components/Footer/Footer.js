
import React from 'react';
// STYLEs
import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-copyright footer">© 2018 Bring It Back.
        <a href="https://josh-pantana.firebaseapp.com/" className="footerLink"><em className="nameFooter">by jPantana</em></a>
      </div>
    );
  }
}

export default Footer;
