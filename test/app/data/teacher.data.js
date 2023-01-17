'use strict';

const Mock = require('mockjs');
const TEACHER = [];

for (let i = 0; i < 50; i++) {
  const teacher_ = Mock.mock({
    't_id|1': `6000${i}`,
    pwd: '123456',
    t_name: '@cname',
    'sex|1': [ '男', '女' ],
    'job|1': [ '讲师', '教授', '副教授' ],
    'count|0-20': 0,
    phone: /^(13[0-9]|14[579]|15([0-3]|[5-9])|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  });
  TEACHER.push(teacher_);
}

TEACHER.forEach(item => {
  item.t_id = item.t_id.toString();
});

module.exports = {
  TEACHER,
};
