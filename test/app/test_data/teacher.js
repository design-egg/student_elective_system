'use strict';

const request = require('request');
const {
  TEACHER,
} = require('../data/teacher.data');
const {
  ACCESS_TOKEN,
} = require('../data/user.data');

const invokeTeacher = async () => {
  await TEACHER.forEach((item, key) => {
    request({
      url: 'http://localhost:7001/api/teacher',
      method: 'post',
      json: true,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        authorization: ACCESS_TOKEN,
      },
      body: item,
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(`成功添加一条教师信息,第 ${key + 1} 个`, body.message);
      }
    });
  });
};

invokeTeacher();
