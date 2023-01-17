'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  UnprocessableEntity,
} = require('../utils/status');
const {
  TeacherRule,
} = require('../utils/rule');

class TeacherController extends Controller {
  // 所有的 teacher
  async all() {
    const {
      ctx,
    } = this;

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 10,
      name: ctx.query.name ? unescape(ctx.query.name) : '',
    };

    const result = await ctx.service.teacher.findAllTeacher(payload);
    await ctx.helper.response(ctx, result);
  }

  // 新增教师
  async add() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    body.pwd = await ctx.helper.hashSync(body.pwd || body.t_id);
    ctx.validate(TeacherRule, body);

    let result = null;

    const resultOne = await ctx.service.teacher.findTeacherByTid(body.t_id);

    if (!resultOne) {
      result = await ctx.service.teacher.addTeacher(body);
      result = await ctx.helper.setPwd(result); // 不允许查看密码

      await ctx.helper.response(ctx, result);

      if (!result) {
        await ctx.helper.response(ctx, null, '操作失败，请重试 !!!', ERROR.status);
      }
    } else {
      await ctx.helper.response(ctx, null, `重复的教师工号 ${body.t_id} !!!`, UnprocessableEntity.status);
    }
  }

  // 根据教工号进行查询
  async getById() {
    const {
      ctx,
    } = this;

    const t_id = ctx.params.id;
    let reultByOne = await ctx.service.teacher.findTeacherByTid(t_id);
    reultByOne = await ctx.helper.setPwd(reultByOne); // 不允许查看密码

    await ctx.helper.response(ctx, reultByOne);
  }

  async update() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    ctx.validate(TeacherRule, body);

    const resultOne = await ctx.service.teacher.findTeacherByTid(body.t_id);
    if (resultOne) {
      if (resultOne.t_id === body.t_id) {
        const payload = {};
        payload.t_name = body.t_name;
        payload.phone = body.phone;
        payload.sex = body.sex;
        payload.count = body.count;

        await ctx.service.teacher.updateTeacher(resultOne, payload);
        await ctx.helper.response(ctx, null);
      } else {
        await ctx.helper.response(ctx, null, `不正确的的教师工号 ${body.t_id} !!!`, UnprocessableEntity.status);
      }
    } else {
      await ctx.helper.response(ctx, null, `不存在的教师工号 ${body.t_id}!!!`, UnprocessableEntity.status);
    }
  }

  // 删除
  async destroy() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate({
      t_id: {
        type: 'array',
        required: true,
      },
    }, body);

    await ctx.service.teacher.deleteTeacher(body.t_id);

    await ctx.helper.response(ctx, null);
  }
}

module.exports = TeacherController;
