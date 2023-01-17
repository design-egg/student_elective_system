'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  UnprocessableEntity,
} = require('../utils/status');
const {
  CourseRule,
} = require('../utils/rule');

class CourseController extends Controller {
  // 所有的课程
  async all() {
    const {
      ctx,
    } = this;

    const verify = await ctx.helper.analyzeToken(ctx);

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 10,
      name: ctx.query.name ? unescape(ctx.query.name) : '',
      t_id: verify.role === 'TEACHER' ? verify.account : '',
      t_name: ctx.query.t_name ? (verify.role === 'STUDENT' ? unescape(ctx.query.t_name) : '') : '',
    };

    const result = await ctx.service.course.findAllCourse(payload);
    await ctx.helper.response(ctx, result);
  }

  // 添加课程
  async add() {
    const {
      ctx,
    } = this;

    const body = ctx.request.body;
    const verify = await ctx.helper.analyzeToken(ctx);
    verify.role === 'TEACHER' ? body.t_id = verify.account : void (null);

    ctx.validate(CourseRule, body);

    let result = null;

    const resultOneByCid = await ctx.service.course.findCourseByCid(body.c_id);
    const resultOneByTid = await ctx.service.teacher.findTeacherByTid(body.t_id);

    if (!resultOneByCid) {
      if (resultOneByTid) {
        if (resultOneByTid.count !== resultOneByTid.current) {
          result = await ctx.service.course.addCourse(body);
          await ctx.helper.response(ctx, result);
          let current = resultOneByTid.current;
          current++;
          await ctx.service.teacher.updateTeacher(resultOneByTid, {
            current,
          });
          if (!result) {
            await ctx.helper.response(ctx, null, '操作失败，请重试 !!!', ERROR.status);
          }
        } else {
          await ctx.helper.response(ctx, null, `开课数已达上限，上限 ${resultOneByTid.count} 门 !!!`, UnprocessableEntity.status);
        }
      } else {
        await ctx.helper.response(ctx, null, `不存在的教师编号 ${body.t_id} !!!`, UnprocessableEntity.status);
      }
    } else {
      await ctx.helper.response(ctx, null, `重复的课程编号 ${body.c_id} !!!`, UnprocessableEntity.status);
    }
  }

  // 根据专业编号进行查询
  async getById() {
    const {
      ctx,
    } = this;

    const c_id = ctx.params.id;
    const reultOne = await ctx.service.course.findCourseByCid(c_id);

    await ctx.helper.response(ctx, reultOne);
  }

  // 更新课程信息
  async update() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    ctx.validate(CourseRule, body);

    let reultOne = null;
    reultOne = await ctx.service.course.findCourseByCid(body.c_id);

    if (!reultOne) {
      await ctx.helper.response(ctx, null, `当前课程编号 ${body.c_id} 不存在 !!!`, UnprocessableEntity.status);
    } else {
      const result = await ctx.service.course.updateCourse(reultOne, body);
      await ctx.helper.response(ctx, result);
    }
  }

  // 删除
  async destroy() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate({
      c_id: {
        type: 'array',
        required: true,
      },
    }, body);

    await ctx.service.course.deleteCourse(body.c_id);

    await ctx.helper.response(ctx, null);
  }
}

module.exports = CourseController;
