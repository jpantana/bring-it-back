import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
// SVGs
import arrow from '../../SVGs/iconmonstr-arrow-25.svg';
// STYLEs
import './Scroll.scss';

class Scroll extends React.Component {
  static propTypes = {
    itemsLength: PropTypes.number.isRequired,
  }

  state = {
    counter: 0,
  }

  // NAVIGATE SCROLL BUTTONS
  moveRight = (e) => {
    e.preventDefault();
    const howManyClicks = this.mathyMathMath();
    const { counter } = this.state;
    if (counter >= howManyClicks) {
      this.setState({ counter: howManyClicks });
    } else {
      this.setState({ counter: this.state.counter + 1 });
    }
    if (counter >= howManyClicks) {
      $('#allCardsDiv').animate({
        marginLeft: '-=0px',
      }, 'fast');
    } else {
      $('#allCardsDiv').animate({
        marginLeft: '-=300px',
      }, 'fast');
    }
    $('#arrowBack').removeClass('hide');
    $('#arrowLeft').removeClass('hide');
  };

  moveLeft = (e) => {
    e.preventDefault();
    const { counter } = this.state;
    if (counter <= 0) {
      this.setState({ counter: 0 });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
    if (counter <= 0) {
      $('#allCardsDiv').animate({
        marginLeft: '+=0px',
      }, 'fast');
    } else {
      $('#allCardsDiv').animate({
        marginLeft: '+=300px',
      }, 'fast');
    }
  };

  widthMath = () => {
    const divLength = this.props.itemsLength;
    const makeNum = divLength * 1;
    const theMath = makeNum * 143;
    return theMath;
  };

  mathyMathMath = () => {
    const total = this.widthMath();
    const theMath = total / 300;
    return Math.floor(theMath);
  };

  render() {
    return (
      <div>
        <span onClick={this.moveRight} className="scrollCardsRight" id="arrowRight">
          <img id="arrow" src={arrow} alt="arrow icon" />
        </span>

        <span onClick={this.moveLeft} id="arrowBack" className="scrollCardsLeft hide">
          <img className="hide" id="arrowLeft" src={arrow} alt="arrow icon" />
        </span>
      </div>
    );
  }
}

export default Scroll;
