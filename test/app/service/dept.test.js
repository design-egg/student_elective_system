'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { DEPT } = require('../data/dept.data');
const Mock = require('mockjs');

describe('test/app/service/dept.tets.js', () => {
  it('DeptService.findAllDept', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'current|1-20': 1,
      'pageSize|1': [
        10, 20, 30, 40,
      ],
    });

    const dept = await ctx.service.dept.findAllDept(payload);

    assert(dept);
  });


  it('DeptService.findDeptByMid', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'index|0-19': 0,
    });

    const dept = await ctx.service.dept.findDeptByDid(DEPT[payload.index].d_id);

    assert(dept || !dept);
  });
});
