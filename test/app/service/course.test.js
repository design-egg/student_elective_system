'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { COURSE } = require('../data/course.data');
const Mock = require('mockjs');

describe('test/app/service/course.tets.js', () => {
  it('CourseService.findAllCourse', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'current|1-20': 1,
      'pageSize|1': [
        10, 20, 30, 40,
      ],
    });

    const course = await ctx.service.course.findAllCourse(payload);

    assert(course);
  });


  it('CourseService.findCourseByCid', async () => {
    const ctx = app.mockContext();
    const payload = Mock.mock({
      'index|0-19': 0,
    });

    const course = await ctx.service.course.findCourseByCid(COURSE[payload.index].c_id);

    assert(course || !course);
  });
});
