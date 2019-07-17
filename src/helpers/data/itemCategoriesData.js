import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/itemCategories.json`)
    .then((res) => {
      const categories = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        categories.push(res.data[fbKey]);
      });
      resolve(categories);
    })
    .catch(err => reject(err));
});

export default { getCategories };
