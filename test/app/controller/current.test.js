'use strict';

const { app } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');

describe('test/app/controller/current.test.js', () => {
  it('GET /api/user/current 获取用户个人的详细信息', async () => {

    return await app.httpRequest()
      .get('/api/user/current')
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });
});
