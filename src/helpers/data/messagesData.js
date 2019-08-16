import axios from 'axios';

import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getGroupedMessages = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/messages.json?orderBy="uid"&equalTo="${uid}"`)
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

const getReceivedMessages = () => new Promise((resolve, reject) => {
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
    }).catch(err => reject(err));
});

const getSingleMessage = msgId => axios.get(`${baseUrl}/messages/${msgId}.json`);

const markAsRead = (id, markAsFalse) => axios.put(`${baseUrl}/messages/${id}/unread.json`, markAsFalse);

const newMessage = message => axios.post(`${baseUrl}/messages.json`, message);

export default {
  newMessage,
  getGroupedMessages,
  getReceivedMessages,
  markAsRead,
  getSingleMessage,
};
