import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMessages = () => new Promise((resolve, reject) => {
  // axios.get(`${baseUrl}/messages.json?orderBy="messagePostId"&equalTo="${messagePostId}"`)
  axios.get(`${baseUrl}/messages.json`)
    .then((res) => {
      const messages = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          messages.push(res.data[fbKey]);
        });
      }
      resolve(messages);
    })
    .catch(err => reject(err));
});

const newMessage = message => axios.post(`${baseUrl}/messages.json`, message);

export default { getMessages, newMessage };
