'use strict';

const Mock = require('mockjs');
const {
  STUDENT,
} = require('./student.data');
const {
  COURSE,
} = require('./course.data');
const STUDENT_COURSE = [];

for (let i = 0; i < 100; i++) {
  const payload = Mock.mock({
    'index1|0-49': 0,
    'index2|0-19': 0,
  });

  const student_course = Mock.mock({
    s_id: STUDENT[payload.index1].s_id,
    c_id: COURSE[payload.index2].c_id,
    'score|0-100.0-1': 0,
    'second_score|0-100.0-1': 0,
    'is_publish|1': [ '未公布', '已公布' ],
  });

  STUDENT_COURSE.push(student_course);
}

module.exports = {
  STUDENT_COURSE,
};
