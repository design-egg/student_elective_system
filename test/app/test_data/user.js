'use strict';

const request = require('request');
const {
  ADMIN,
} = require('../data/user.data');

const invokeUser = () => {
  request({
    url: 'http://localhost:7001/api/admin',
    method: 'post',
    json: true,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: ADMIN,
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('添加一条管理员用户成功', body.message);
    }
  });
};

invokeUser();
