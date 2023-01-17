'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');
const { TEACHER } = require('../data/teacher.data');
const Mock = require('mockjs');

const payload = Mock.mock({
  'index|0-49': 0,
});

describe('test/app/controller/teacher.test.js', () => {
  it('GET /api/teacher 获取所有的教师信息', async () => {

    return await app.httpRequest()
      .get('/api/teacher')
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });

  it('POST /api/teacher 添加教师信息', async () => {

    const result = await app.httpRequest()
      .post('/api/teacher')
      .send(TEACHER[payload.index])
      .set('authorization', ACCESS_TOKEN);

    assert(result.status === 200 || result.status === 422);

  });

  it('GET /api/teacher/:id 根据教师工号来获取教师信息', async () => {

    return await app.httpRequest()
      .get(`/api/teacher/${TEACHER[payload.index].t_id}`)
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });
});
