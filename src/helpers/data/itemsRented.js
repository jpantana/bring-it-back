import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const newRental = rental => axios.post(`${baseUrl}/itemsRented.json`, rental);

export default { newRental };
