import React from 'react';
// JSs
import itemsRentedData from '../../helpers/data/itemsRentedData';
import RentalCard from '../RentalCard/RentalCard';

class MyRentals extends React.Component {
  state = {
    myRentals: [],
    userid: '',
  }

  componentDidMount() {
    const uid = this.props.match.params.id;
    this.setState({ userid: uid });
    this.getMyRentals();
  }

  getMyRentals = () => {
    itemsRentedData.getRentals()
      .then((res) => {
        const { userid } = this.state;
        const mapRentals = res.filter(r => userid === r.renterId);
        this.setState({ myRentals: mapRentals });
      })
      .catch(err => console.error('no rentals', err));
  };

  render() {
    const { myRentals, userid } = this.state;
    const makeRentalCards = myRentals.map(rental => (
      <RentalCard
        key={rental.id}
        rental={rental}
        myRentals={myRentals}
        userid={userid}
      />
    ));

    return (
      <div>{makeRentalCards}</div>
    );
  }
}

export default MyRentals;
