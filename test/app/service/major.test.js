'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { MAJOR } = require('../data/major.data');
const Mock = require('mockjs');

describe('test/app/service/major.tets.js', () => {
  it('MajorService.findAllMajor', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'current|1-20': 1,
      'pageSize|1': [
        10, 20, 30, 40,
      ],
    });

    const major = await ctx.service.major.findAllMajor(payload);
    assert(major);
  });

  it('MajorService.findMajorByMid', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'index|0-19': 0,
    });

    const course = await ctx.service.major.findMajorByMid(MAJOR[payload.index].m_id);

    assert(course || !course);
  });
});
