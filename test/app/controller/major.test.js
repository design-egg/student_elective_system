'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');
const { MAJOR } = require('../data/major.data');
const Mock = require('mockjs');

const payload = Mock.mock({
  'index|0-19': 0,
});

describe('test/app/controller/major.test.js', () => {
  it('GET /api/major 获取所有的专业信息', async () => {

    return await app.httpRequest()
      .get('/api/major')
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });

  it('POST /api/major 添加专业信息', async () => {

    const result = await app.httpRequest()
      .post('/api/major')
      .send(MAJOR[payload.index])
      .set('authorization', ACCESS_TOKEN);

    assert(result.status === 200 || result.status === 422);

  });

  it('GET /api/major/:id 根据专业编号来获取专业信息', async () => {

    return await app.httpRequest()
      .get(`/api/major/${MAJOR[payload.index].m_id}`)
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });
});
