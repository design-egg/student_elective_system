'use strict';

const Mock = require('mockjs');
const {
  DEPT,
} = require('./dept.data');
const MAJOR = [];

for (let i = 0; i < 20; i++) {
  const payload = Mock.mock({
    'index|0-19': 0,
  });

  const major_ = Mock.mock({
    'm_id|1': `3030${i}`,
    d_id: DEPT[payload.index].d_id,
    'm_name|1': [
      '美术',
      '数学',
      '软件工程',
      '计算机科学',
      '体育',
      '政治',
    ],
  });

  MAJOR.push(major_);
}

MAJOR.forEach(item => {
  item.m_id = item.m_id.toString();
});

module.exports = {
  MAJOR,
};
