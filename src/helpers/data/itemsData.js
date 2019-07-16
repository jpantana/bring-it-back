import axios from 'axios'

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getItems = uid => new Promise((resolve, reject) => {
  // axios.get(`${baseUrl}/items.json?orderBy="uid"&equalTo="${uid}"`)
  axios.get(`${baseUrl}/items.json`)
    .then((res) => {
      const items = [];
      let myItems = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        items.push(res.data[fbKey]);
        myItems = items.filter(item => item.ownerId === uid);
      });
      resolve(myItems);
    })
    .catch(err => reject(err));
});

export default { getItems };
