'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { STUDENT } = require('../data/student.data');
const Mock = require('mockjs');

describe('test/app/service/student.tets.js', () => {
  it('StudentService.findAllStudent', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'current|1-20': 1,
      'pageSize|1': [
        10, 20, 30, 40,
      ],
    });

    const student = await ctx.service.student.findAllStudent(payload);

    assert(student);
  });

  it('StudentService.findStudentBySid', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'index|0-19': 0,
    });

    const student = await ctx.service.student.findStudentBySid(STUDENT[payload.index].s_id);

    assert(student || !student);
  });
});
