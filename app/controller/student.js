'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  UnprocessableEntity,
} = require('../utils/status');
const {
  StudentRule,
} = require('../utils/rule');

class StudentController extends Controller {
  // 所有的 student
  async all() {
    const {
      ctx,
    } = this;

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 10,
      name: ctx.query.name ? unescape(ctx.query.name) : '',
    };

    const result = await ctx.service.student.findAllStudent(payload);
    await ctx.helper.response(ctx, result);
  }

  // 新增学生
  async add() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    body.pwd = await ctx.helper.hashSync(body.pwd || body.s_id);
    ctx.validate(StudentRule, body);

    let result = null;

    const resultOneBySid = await ctx.service.student.findStudentBySid(body.s_id);
    const resultOneByMid = await ctx.service.major.findMajorByMid(body.m_id);

    if (!resultOneBySid) {
      if (resultOneByMid) {
        result = await ctx.service.student.addStudent(body);
        result = await ctx.helper.setPwd(result); // 不允许查看密码

        await ctx.helper.response(ctx, result);

        if (!result) {
          await ctx.helper.response(ctx, null, '操作失败，请重试 !!!', ERROR.status);
        }
      } else {
        await ctx.helper.response(ctx, null, `不存在的专业编号 ${body.m_id} !!!`, UnprocessableEntity.status);
      }
    } else {
      await ctx.helper.response(ctx, null, `重复的学号 ${body.s_id} !!!`, UnprocessableEntity.status);
    }
  }

  // 根据学号进行查询
  async getById() {
    const {
      ctx,
    } = this;

    const s_id = ctx.params.id;
    let reultOne = await ctx.service.student.findStudentBySid(s_id);
    reultOne = await ctx.helper.setPwd(reultOne); // 不允许查看密码

    await ctx.helper.response(ctx, reultOne);
  }

  async update() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    ctx.validate(StudentRule, body);

    const resultOne = await ctx.service.student.findStudentBySid(body.s_id);
    if (resultOne) {
      if (resultOne.s_id === body.s_id && resultOne.m_id === body.m_id) {
        const payload = {};
        payload.s_name = body.s_name;
        payload.phone = body.phone;
        payload.sex = body.sex;

        await ctx.service.student.updateStudent(resultOne, payload);
        await ctx.helper.response(ctx, null);
      } else {
        await ctx.helper.response(ctx, null, `不正确的的学号 ${body.s_id} 或者专业编号 ${body.m_id} !!!`, UnprocessableEntity.status);
      }
    } else {
      await ctx.helper.response(ctx, null, `不存在的学号 ${body.s_id} !!!`, UnprocessableEntity.status);
    }
  }

  // 删除
  async destroy() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate({
      s_id: {
        type: 'array',
        required: true,
      },
    }, body);

    await ctx.service.student.deleteStudent(body.s_id);

    await ctx.helper.response(ctx, null);
  }
}

module.exports = StudentController;
