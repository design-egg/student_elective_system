'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  UnprocessableEntity,
} = require('../utils/status');
const {
  MajorRule,
} = require('../utils/rule');
const _ = require('lodash');

class MajorController extends Controller {
  // 获取所有的专业信息
  async all() {
    const {
      ctx,
    } = this;

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 10,
      name: ctx.query.name ? unescape(ctx.query.name) : '',
    };

    const result = await ctx.service.major.findAllMajor(payload);
    await ctx.helper.response(ctx, result);
  }

  // 新增专业信息
  async add() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate(MajorRule, body);

    let result = null;

    const resultOneByDid = await ctx.service.dept.findDeptByDid(body.d_id);
    const resultOneByMid = await ctx.service.major.findMajorByMid(body.m_id);

    if (!resultOneByMid) {
      if (resultOneByDid) {
        result = await ctx.service.major.addMajor(body);
        await ctx.helper.response(ctx, result);

        if (!result) {
          await ctx.helper.response(ctx, null, '操作失败，请重试 !!!', ERROR.status);
        }
      } else {
        await ctx.helper.response(ctx, null, `不存在的院系编号 ${body.d_id} !!!`, UnprocessableEntity.status);
      }
    } else {
      await ctx.helper.response(ctx, null, `重复的专业编号 ${body.m_id} !!!`, UnprocessableEntity.status);
    }
  }

  // 根据专业编号进行查询
  async getById() {
    const {
      ctx,
    } = this;

    const m_id = ctx.params.id;
    const reultOne = await ctx.service.major.findMajorByMid(m_id);

    await ctx.helper.response(ctx, reultOne);
  }

  // 更新专业信息
  async update() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    let reultOne = await ctx.service.major.findMajorByMid(body.m_id);

    if (!reultOne) {
      await ctx.helper.response(ctx, null, `当前专业编号 ${body.m_id} 不存在 !!!`, UnprocessableEntity.status);
    } else {
      reultOne = await ctx.service.dept.findDeptByDid(body.d_id);

      if (_.size(reultOne)) {
        let payload = body;
        payload = _.omit(payload, 'd_id');
        const result = await ctx.service.admin.updateAdmin(reultOne, payload);
        await ctx.helper.response(ctx, result);
      } else {
        await ctx.helper.response(ctx, null, `当前院系编号 ${body.d_id} 不存在 !!!`, UnprocessableEntity.status);
      }
    }
  }

  // 删除
  async destroy() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    ctx.validate({
      m_id: {
        type: 'array',
        required: true,
      },
    }, body);

    await ctx.service.major.deleteMajor(body.m_id);

    await ctx.helper.response(ctx, null);
  }
}

module.exports = MajorController;
