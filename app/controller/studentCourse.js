'use strict';

const Controller = require('egg').Controller;
const {
  UnprocessableEntity,
  ERROR,
} = require('../utils/status');
const {
  StudentCourseRule,
} = require('../utils/rule');

class StudentCourseController extends Controller {
  // 所有的记录
  async all() {
    const {
      ctx,
    } = this;

    const verify = await ctx.helper.analyzeToken(ctx);

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 10,
      s_id: verify.role === 'STUDENT' ? verify.account : '',
      t_id: verify.role === 'TEACHER' ? verify.account : '',
      c_name: ctx.query.c_name ? unescape(ctx.query.c_name) : '',
      is_publish: ctx.query.is_publish ? unescape(ctx.query.is_publish) : '',
    };

    if (ctx.query.is_pass && unescape(ctx.query.is_pass) === '1') {
      payload.gte = 60;
      payload.lte = 100;
    }
    if (ctx.query.is_pass && unescape(ctx.query.is_pass) === '-1') {
      payload.gte = 0;
      payload.lte = 60;
    }
    if (!ctx.query.is_pass) {
      payload.gte = 0;
      payload.lte = 100;
    }

    let result = await ctx.service.studentCourse.findAllStudentCourse(payload);
    if (verify.role === 'STUDENT') {
      result = await ctx.helper.setScore(result);
    }
    await ctx.helper.response(ctx, result);
  }

  // 新增一条记录
  async add() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    const verify = await ctx.helper.analyzeToken(ctx);
    const rule = verify.role === 'ADMIN' ? StudentCourseRule : {
      c_id: {
        type: 'string',
        required: true,
        allowEmpty: false,
        format: /^[1-9]\d*$/,
        message: '课程编号不能为空,而且必须为数字',
        min: 1,
        max: 20,
      },
    };
    ctx.validate(rule, body);

    let result = null;
    const resultOneBySid = await ctx.service.student.findStudentBySid(verify.role === 'ADMIN' ? body.s_id : verify.account);
    const resultOneByCid = await ctx.service.course.findCourseByCid(body.c_id);
    if (!resultOneBySid) {
      await ctx.helper.response(ctx, null, `不存在的学号 ${verify.account} !!!`, UnprocessableEntity.status);
    }
    if (!resultOneByCid) {
      await ctx.helper.response(ctx, null, `不存在的课程编号 ${body.c_id} !!!`, UnprocessableEntity.status);
    }

    if (resultOneBySid && resultOneByCid) {
      const resultOne = await ctx.service.studentCourse.findStudentCourseByPK(verify.account, body.c_id);
      if (resultOne) {
        await ctx.helper.response(ctx, null, `你已经选修该课程，不能重复选修，课程编号 ${body.c_id} !!!`, UnprocessableEntity.status);
      } else {
        const paylaod = {
          s_id: verify.role === 'ADMIN' ? body.s_id : verify.account,
          c_id: body.c_id,
          score: verify.role === 'ADMIN' ? body.score : 0,
          second_score: verify.role === 'ADMIN' ? body.second_score : 0,
          is_publish: verify.role === 'ADMIN' ? body.is_publish : '未公布',
        };

        let current = resultOneByCid.current;
        current++;
        await ctx.service.course.updateCourse(resultOneByCid, {
          current,
        });
        result = await ctx.service.studentCourse.addStudentCourse(paylaod);
        if (!result) await ctx.helper.response(ctx, null, '操作失败，请重试 !!!', ERROR.status);
        else await ctx.helper.response(ctx, result);
      }
    }
  }

  // 修改记录
  async update() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate(StudentCourseRule, body);
    let result = null;
    const resultOne = await ctx.service.studentCourse.findStudentCourseByPK(body.s_id, body.c_id);
    if (!resultOne) {
      await ctx.helper.response(ctx, null, `该学生(学号 ${body.s_id})没有选修的该课程(编号 ${body.c_id}) !!!`, UnprocessableEntity.status);
    } else {
      result = await ctx.service.studentCourse.updateStudentCourse(resultOne, body);
      await ctx.helper.response(ctx, result);
    }
  }

  // 退选
  async destroy() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    ctx.validate({
      c_id: {
        type: 'string',
        required: true,
        allowEmpty: false,
        format: /^[1-9]\d*$/,
        message: '课程编号不能为空,而且必须为数字',
        min: 1,
        max: 20,
      },
    }, body);
    const verify = await ctx.helper.analyzeToken(ctx);

    const resultOne = await ctx.service.studentCourse.findStudentCourseByPK(verify.account, body.c_id);
    if (!resultOne) {
      await ctx.helper.response(ctx, null, `该学生(学号 ${body.s_id})没有选修的该课程(编号 ${body.c_id}) !!!`, UnprocessableEntity.status);
    } else {
      if (resultOne.is_publish === '未公布') {
        await ctx.service.studentCourse.destroyStudentCourse(resultOne);
        await ctx.helper.response(ctx, null, '退选成功 !!!');
      } else {
        await ctx.helper.response(ctx, null, `该课程已公布成绩，不能退选，课程编号 ${body.c_id} !!!`, UnprocessableEntity.status);
      }
    }
  }
}

module.exports = StudentCourseController;
