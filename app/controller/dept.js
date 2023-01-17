'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  UnprocessableEntity,
} = require('../utils/status');
const {
  DeptRule,
} = require('../utils/rule');

class DeptController extends Controller {
  // 所有的 dept
  async all() {
    const {
      ctx,
    } = this;

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 15,
      name: ctx.query.name ? unescape(ctx.query.name) : '',
    };

    const result = await ctx.service.dept.findAllDept(payload);
    await ctx.helper.response(ctx, result);
  }

  // 添加一条院系记录
  async add() {
    const {
      ctx,
    } = this;

    const body = ctx.request.body;
    ctx.validate(DeptRule, body);

    const resultOne = await ctx.service.dept.findDeptByDid(body.d_id);
    if (!resultOne) {
      const result = await ctx.service.dept.addDept(body);

      if (!result) {
        await ctx.helper.response(ctx, null, '操作失败，请重试 !!!', ERROR.status);
      }

      await ctx.helper.response(ctx, result);
    } else {
      await ctx.helper.response(ctx, null, `重复的院系编号 ${body.d_i} !!!`, UnprocessableEntity.status);
    }
  }

  // 更新院系信息
  async update() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    let reultOne = null;

    ctx.validate(DeptRule, body);

    reultOne = await ctx.service.dept.findDeptByDid(body.d_id);

    if (!reultOne) {
      await ctx.helper.response(ctx, null, `当前院系编号 ${body.d_id} 不存在 !!!`, UnprocessableEntity.status);
    } else {
      const result = await ctx.service.dept.updateDept(reultOne, body);

      await ctx.helper.response(ctx, result);
    }
  }

  // 根据院系编号进行查询
  async getById() {
    const {
      ctx,
    } = this;

    const d_id = ctx.params.id;
    const reultOne = await ctx.service.dept.findDeptByDid(d_id);

    await ctx.helper.response(ctx, reultOne);
  }

  // 删除
  async destroy() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate({
      d_id: {
        type: 'array',
        required: true,
      },
    }, body);

    await ctx.service.dept.deleteDept(body.d_id);

    await ctx.helper.response(ctx, null);
  }

}

module.exports = DeptController;
