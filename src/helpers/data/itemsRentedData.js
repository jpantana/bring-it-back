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

const editRentals = (rentalEdit, id) => axios.put(`${baseUrl}/itemsRented/${id}.json`, rentalEdit);

export default {
  newRental,
  getRentals,
  deleteRentals,
  editRentals,
};
