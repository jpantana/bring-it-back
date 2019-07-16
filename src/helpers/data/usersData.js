import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getUsers = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const users = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        users.push(res.data[fbKey]);
      });
      resolve(users);
    })
    .catch(err => reject(err));
});

const addNewUser = saveNewUser => axios.post(`${baseUrl}/users.json`, saveNewUser);

export default { getUsers, addNewUser };
