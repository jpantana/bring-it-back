import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getUsers = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const users = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          users.push(res.data[fbKey]);
        });
      }
      resolve(users);
    })
    .catch(err => reject(err));
});

const addNewUser = saveNewUser => axios.post(`${baseUrl}/users.json`, saveNewUser);

const editExistingUser = (editedUser, uid) => axios.put(`${baseUrl}/users/${uid}.json`, editedUser);

const addProfilePic = (profilePic, uid) => axios.patch(`${baseUrl}/users/${uid}/profile.json`, profilePic);

export default {
  getUsers,
  addNewUser,
  editExistingUser,
  addProfilePic,
};
