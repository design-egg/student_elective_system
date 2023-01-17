'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');
const { STUDENT } = require('../data/student.data');
const Mock = require('mockjs');

const payload = Mock.mock({
  'index|0-49': 0,
});

describe('test/app/controller/student.test.js', () => {
  it('GET /api/student 获取所有的学生信息', async () => {

    return await app.httpRequest()
      .get('/api/student')
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });

  it('POST /api/student 添加学生信息', async () => {

    const result = await app.httpRequest()
      .post('/api/student')
      .send(STUDENT[payload.index])
      .set('authorization', ACCESS_TOKEN);

    assert(result.status === 200 || result.status === 422);

  });

  it('GET /api/student/:id 根据学生学号来获取学生信息', async () => {

    return await app.httpRequest()
      .get(`/api/student/${STUDENT[payload.index].s_id}`)
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });
});
