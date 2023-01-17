'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');
const { DEPT } = require('../data/dept.data');
const Mock = require('mockjs');

const payload = Mock.mock({
  'index|0-19': 0,
});

describe('test/app/controller/dept.test.js', () => {
  it('GET /api/dept 获取所有的院系信息', async () => {

    return await app.httpRequest()
      .get('/api/dept')
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });

  it('POST /api/dept 添加院系信息', async () => {

    const result = await app.httpRequest()
      .post('/api/dept')
      .send(DEPT[payload.index])
      .set('authorization', ACCESS_TOKEN);

    assert(result.status === 200 || result.status === 422);

  });

  it('GET /api/dept/:id 根据院系编号来获取院系信息', async () => {

    return await app.httpRequest()
      .get(`/api/dept/${DEPT[payload.index].d_id}`)
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });
});
