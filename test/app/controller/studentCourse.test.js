'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');
const { STUDENT_COURSE } = require('../data/studentCourse.data');
const Mock = require('mockjs');

const payload = Mock.mock({
  'index|0-99': 0,
});

describe('test/app/controller/studentCourse.test.js', () => {
  it('GET /api/student-course 获取所有的选课信息', async () => {

    return await app.httpRequest()
      .get('/api/student-course')
      .set('authorization', ACCESS_TOKEN);

  });

  it('POST /api/student-course 添加选课信息', async () => {

    const result = await app.httpRequest()
      .post('/api/student-course')
      .send(STUDENT_COURSE[payload.index])
      .set('authorization', ACCESS_TOKEN);

    assert(result.status === 200 || result.status === 422);

  });
});
