'use strict';

const Mock = require('mockjs');
const {
  TEACHER,
} = require('./teacher.data');
const COURSE = [];

for (let i = 0; i < 20; i++) {
  const payload = Mock.mock({
    'index|0-49': 0,
  });

  const course_ = Mock.mock({
    'c_id|1': `1020${i}`,
    t_id: TEACHER[payload.index].t_id,
    'c_name|1': [
      '美术',
      '数学',
      'C++',
      'Pthton',
      'HTML+CSS+JavaScript',
      'Node.js',
      '体育',
      '政治',
    ],
    'credit|1': [
      0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5,
    ],
    'count|0-100': 0,
  });

  COURSE.push(course_);
}

COURSE.forEach(item => {
  item.c_id = item.c_id.toString();
});

module.exports = {
  COURSE,
};
