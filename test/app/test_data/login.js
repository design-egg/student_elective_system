'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');
const { ADMIN } = require('../data/user.data');

const invokeLOGIN = () => {
  request({
    url: 'http://localhost:7001/api/login',
    method: 'post',
    json: true,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: ADMIN,
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      fs.writeFile(path.resolve(__dirname, 'accessToken.json'), JSON.stringify(body.data, null, 2), function(err) {
        console.log(body.message);
        if (err) {
          console.error(err);
        }
      });
    }
  });
};

invokeLOGIN();
