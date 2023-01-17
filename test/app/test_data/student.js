'use strict';

const request = require('request');
const {
  STUDENT,
} = require('../data/student.data');
const {
  ACCESS_TOKEN,
} = require('../data/user.data');

const invokeStudent = async () => {
  await STUDENT.forEach((item, key) => {
    request({
      url: 'http://localhost:7001/api/student',
      method: 'post',
      json: true,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        authorization: ACCESS_TOKEN,
      },
      body: item,
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(`成功添加一条学生信息,第 ${key + 1} 个`, body.message);
      }
    });
  });
};

invokeStudent();
