'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const Mock = require('mockjs');

describe('test/app/service/studentCourse.tets.js', () => {
  it('CourseService.findAllCourse', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'current|1-20': 1,
      'pageSize|1': [
        10, 20, 30, 40,
      ],
      'gte|0-100': 0,
      'le|0-100': 0,
    });

    const studentCourse = await ctx.service.studentCourse.findAllStudentCourse(payload);

    assert(studentCourse);
  });
});
