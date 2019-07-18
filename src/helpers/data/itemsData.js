import axios from 'axios';

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
      // resolve(items);
    })
    .catch(err => reject(err));
});

const getSingleItem = itemId => axios.get(`${baseUrl}/items/${itemId}.json`);

const addNewItem = item => axios.post(`${baseUrl}/items.json`, item);

const deleteItem = itemId => axios.delete(`${baseUrl}/items/${itemId}.json`);

const editItem = (item, id) => axios.put(`${baseUrl}/items/${id}.json`, item);

export default {
  getItems,
  addNewItem,
  deleteItem,
  getSingleItem,
  editItem,
};
