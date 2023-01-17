'use strict';

const Mock = require('mockjs');
const STUDENT = [];
const {
  MAJOR,
} = require('./major.data');

for (let i = 0; i < 50; i++) {
  const payload = Mock.mock({
    'index|0-19': 0,
  });

  const student_ = Mock.mock({
    's_id|1': `5010${i}`,
    m_id: MAJOR[payload.index].m_id,
    pwd: '123456',
    s_name: '@cname',
    'sex|1': [ '男', '女' ],
    phone: /^(13[0-9]|14[579]|15([0-3]|[5-9])|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  });
  STUDENT.push(student_);
}

STUDENT.forEach(item => {
  item.s_id = item.s_id.toString();
});

module.exports = {
  STUDENT,
};
