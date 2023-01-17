'use strict';

const request = require('request');
const {
  DEPT,
} = require('../data/dept.data');
const {
  ACCESS_TOKEN,
} = require('../data/user.data');

const invokeDEPT = async () => {
  await DEPT.forEach((item, key) => {
    request({
      url: 'http://localhost:7001/api/dept',
      method: 'post',
      json: true,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        authorization: ACCESS_TOKEN,
      },
      body: item,
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(`成功添加一条院系信息,第 ${key + 1} 个`, body.message);
      }
    });
  });
};

invokeDEPT();
