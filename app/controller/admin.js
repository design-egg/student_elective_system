'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  UnprocessableEntity,
} = require('../utils/status');
const {
  AdminRule,
} = require('../utils/rule');

class AdminController extends Controller {
  // 所有的 admin
  async all() {
    const {
      ctx,
    } = this;

    const payload = {
      current: Number(ctx.query.current) || 1,
      pageSize: Number(ctx.query.pageSize) || 10,
    };

    let result = await ctx.service.admin.findAllAdmin(payload);
    result = await ctx.helper.setPwd(result); // 不允许查看密码
    await ctx.helper.response(ctx, result);
  }

  // 根据账号查询 admin
  async getByAccount() {
    const {
      ctx,
    } = this;

    const account = ctx.params.account;

    let result = await ctx.service.admin.findAdminByAccount(account);

    result = await ctx.helper.setPwd(result); // 不允许查看密码

    await ctx.helper.response(ctx, result);
  }

  // 创建一个 admin
  async add() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;

    body.pwd = await ctx.helper.hashSync(body.pwd);
    ctx.validate(AdminRule, body);

    const resultOne = await ctx.service.admin.findAdminByAccount(body.account);

    if (!resultOne) {
      let result = await ctx.service.admin.addAdmin(body);

      if (!result) {
        await ctx.helper.response(ctx, null, '添加账户失败，请重试 !!!', ERROR.status);
      }

      result = await ctx.helper.setPwd(result); // 不允许查看密码

      await ctx.helper.response(ctx, result);
    } else {
      await ctx.helper.response(ctx, null, `重复的账号 ${body.account} !!!`, UnprocessableEntity.status);
    }
  }
}

module.exports = AdminController;
