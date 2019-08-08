import React from 'react';
// JSs
import itemsRentedData from '../../helpers/data/itemsRentedData';
import itemsData from '../../helpers/data/itemsData';
import RentalCard from '../RentalCard/RentalCard';
// STYLEs
import './MyRentals.scss';

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

  cancelMyRental = (rentalId, itemId) => {
    itemsRentedData.deleteRentals(rentalId)
      .then(() => {
        // this.getMyRentals();
        itemsData.changeItemAvailability(itemId, true)
          .then()
          .catch(err => console.error('did not change item availability', err));
      })
      .catch();
  };

  editMyRental = (editObj, id) => {
    itemsRentedData.editRentals(editObj, id)
      .then(() => this.getMyRentals())
      .catch(err => console.error('rental not edited', err));
  };

  render() {
    const { myRentals, userid } = this.state;
    const makeRentalCards = myRentals.map(rental => (
      <RentalCard
        key={rental.id}
        rental={rental}
        myRentals={myRentals}
        userid={userid}
        cancelMyRental={this.cancelMyRental}
        getMyRentals={this.getMyRentals}
        editMyRental={this.editMyRental}
      />
    ));

    return (
      <div className="MyRentals">{makeRentalCards}</div>
    );
  }
}

export default MyRentals;
