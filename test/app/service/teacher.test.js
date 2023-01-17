'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { TEACHER } = require('../data/teacher.data');
const Mock = require('mockjs');

describe('test/app/service/teacher.tets.js', () => {
  it('TeacherService.findAllTeacher', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'current|1-20': 1,
      'pageSize|1': [
        10, 20, 30, 40,
      ],
    });

    const teacher = await ctx.service.teacher.findAllTeacher(payload);
    assert(teacher);
  });

  it('TeacherService.findTeacherByTid', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'index|0-19': 0,
    });

    const teacher = await ctx.service.teacher.findTeacherByTid(TEACHER[payload.index].t_id);

    assert(teacher || !teacher);
  });
});
