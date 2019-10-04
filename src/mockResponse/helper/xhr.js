const fetch = require("node-fetch");

const xhr = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

module.exports = xhr;
