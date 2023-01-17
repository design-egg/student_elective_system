'use strict';

const Mock = require('mockjs');
const DEPT = [];

for (let i = 0; i < 20; i++) {
  const dept_ = Mock.mock({
    'd_id|1': `2020${i}`,
    'd_name|1': [
      '美术学院',
      '数学系',
      '计算机科学技术系',
      '软件学院',
      '外语系',
      '信息工程系',
    ],
  });

  DEPT.push(dept_);
}

DEPT.forEach(item => {
  item.d_id = item.d_id.toString();
});

module.exports = {
  DEPT,
};
