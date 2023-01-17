'use strict';

const request = require('request');
const {
  STUDENT_COURSE,
} = require('../data/studentCourse.data');
const {
  ACCESS_TOKEN,
} = require('../data/user.data');

const invokeStudentCourse = async () => {
  await STUDENT_COURSE.forEach((item, key) => {
    request({
      url: 'http://localhost:7001/api/student-course',
      method: 'post',
      json: true,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        authorization: ACCESS_TOKEN,
      },
      body: item,
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(`成功添加一条学生选课信息,第 ${key + 1} 个`, body.message);
      }
    });
  });
};

invokeStudentCourse();
