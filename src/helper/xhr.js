const fetch = require("node-fetch");

const xhr = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch(url, params)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

module.exports = xhr;
