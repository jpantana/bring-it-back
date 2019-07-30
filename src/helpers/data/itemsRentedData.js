import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const newRental = rental => axios.post(`${baseUrl}/itemsRented.json`, rental);

const getRentals = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/itemsRented.json`)
    .then((res) => {
      const rentals = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          rentals.push(res.data[fbKey]);
        });
      }
      resolve(rentals);
    })
    .catch(err => reject(err));
});

const deleteRentals = itemId => axios.delete(`${baseUrl}/itemsRented/${itemId}.json`);

// const getRentals = rentalId => new Promise((resolve, reject) => {
//   // axios.get(`${baseUrl}/itemsRented.json?orderBy="rentalId"&equalTo="${rentalId}"`)
//   axios.get(`${baseUrl}/itemsRented.json`)
//     .then((res) => {
//       const rentals = [];
//       let singleRental = [];
//       Object.keys(res.data).forEach((fbKey) => {
//         res.data[fbKey].id = fbKey;
//         rentals.push(res.data[fbKey]);
//         singleRental = rentals.filter(r => r.id === rentalId);
//       });
//       resolve(singleRental);
//     })
//     .catch(err => reject(err));
// });

export default { newRental, getRentals, deleteRentals };
