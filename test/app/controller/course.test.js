'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ACCESS_TOKEN } = require('../data/user.data');
const { COURSE } = require('../data/course.data');
const Mock = require('mockjs');

const payload = Mock.mock({
  'index|0-19': 0,
});

describe('test/app/controller/course.test.js', () => {
  it('GET /api/course 获取所有的课程信息', async () => {

    return await app.httpRequest()
      .get('/api/course')
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });

  it('POST /api/course 添加课程信息', async () => {

    const result = await app.httpRequest()
      .post('/api/course')
      .send(COURSE[payload.index])
      .set('authorization', ACCESS_TOKEN);

    assert(result.status === 200 || result.status === 422);

  });

  it('GET /api/course/:id 根据课程编号来获取课程信息', async () => {

    return await app.httpRequest()
      .get(`/api/course/${COURSE[payload.index].c_id}`)
      .set('authorization', ACCESS_TOKEN)
      .expect(200);

  });
});
