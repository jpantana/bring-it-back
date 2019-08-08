import React from 'react';
import PropTypes from 'prop-types';
// STYLEs
import $ from 'jquery';
import './Rolodex.scss';

class Rolodex extends React.Component {
  static propTypes = {
    roloValu: PropTypes.func.isRequired,
  }

  state = {
    num: 1,
    days: 0,
  }

  changeNumHoursUp = (e) => {
    e.preventDefault();
    this.setState({ num: this.state.num + 1 });
    this.props.roloValu(this.state.num + 1);
    if (this.state.num > 8) {
      $('#holdsNumSpan').addClass('nudge');
    }
  };

  changeNumHoursDown = (e) => {
    e.preventDefault();
    if (this.state.num <= 0) {
      this.setState({ num: 0 });
      this.props.roloValu(this.state.num);
    } else {
      this.setState({ num: this.state.num - 1 });
      this.props.roloValu(this.state.num - 1);
    }
    if (this.state.num < 11) {
      $('#holdsNumSpan').removeClass('nudge');
    }
  };

  render() {
    const { num } = this.state;
    $('.carousel').carousel({
      interval: false,
    });

    return (
        <div id="carouselExampleControls" className="carousel slide Rolodex" data-ride="carousel">
          <div className="carousel-inner rolodex">
            <div className="carousel-item active">
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span onClick={this.changeNumHoursUp} className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <div id="rotate" data-slide="next">
                <span className="rotate"><span id="holdsNumSpan" className="holdsNum">{num}</span></span>
              </div>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span onClick={this.changeNumHoursDown} className="carousel-control-next-icon" aria-hidden="true"></span>
              </a>
            </div>
          </div>


          {/* <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a> */}
          {/* <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span onClick={this.changeNumHours} className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a> */}
        </div>
    );
  }
}

export default Rolodex;
