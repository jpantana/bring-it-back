import React from 'react';
import PropTypes from 'prop-types';
// STYLEs
import $ from 'jquery';
import './Rolodex.scss';

class Rolodex extends React.Component {
  static propTypes = {
    roloValu: PropTypes.func.isRequired,
  }

  changeNumHours = (e) => {
    e.preventDefault();
    console.error(e.target);
  };

  render() {
    $('.carousel').carousel({
      interval: false,
    });

    return (
        <div id="carouselExampleControls" className="carousel slide Rolodex" data-ride="carousel">
          <div className="carousel-inner rolodex">

            <div className="carousel-item active">
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span onClick={this.changeNumHours} value={0} className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <div id="rotate" data-slide="next">
                <span className="rotate">1</span>
              </div>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span onClick={this.changeNumHours} value={2} className="carousel-control-next-icon" aria-hidden="true"></span>
              </a>
            </div>

            <div className="carousel-item">
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span onClick={this.changeNumHours} value={1} className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <div id="rotate" data-slide="next">
                <span className="rotate">2</span>
              </div>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span onClick={this.changeNumHours} value={3} className="carousel-control-next-icon" aria-hidden="true"></span>
              </a>
            </div>

            <div className="carousel-item">
              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span onClick={this.changeNumHours} value={2} className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <div id="rotate" data-slide="next">
                <span className="rotate">3</span>
              </div>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span onClick={this.changeNumHours} value={4} className="carousel-control-next-icon" aria-hidden="true"></span>
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
