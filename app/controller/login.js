'use strict';

const Controller = require('egg').Controller;

const {
  UnprocessableEntity,
} = require('../utils/status');
const {
  LoginRule,
} = require('../utils/rule');
const _ = require('lodash');

class LoginController extends Controller {
  async login() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    let reultByOne = null;
    let checkPwd = false;

    ctx.validate(LoginRule, body);
    let token = {};
    const payload = {
      auth_token: token.accessToken,
      login_time: new Date().getTime(),
      login_ip: ctx.request.ip,
    };
    let token_payload = body;
    token_payload = _.omit(token_payload, 'pwd');

    switch (body.role) {
      case 'ADMIN':
        reultByOne = await ctx.service.admin.findAdminByAccount(body.account);

        token = await ctx.service.jwt.createToken(token_payload); // 获取 token
        payload.auth_token = token.accessToken;

        if (reultByOne) {
          checkPwd = await ctx.helper.compareSync(body.pwd, reultByOne.pwd); // 验证密码是否一直
          console.log(body.pwd, reultByOne.pwd, ctx.helper.compareSync(body.pwd, reultByOne.pwd));
          if (checkPwd) {
            await ctx.service.admin.updateAdmin(reultByOne, payload);

            await ctx.helper.response(ctx, {
              accessToken: token.accessToken,
              expiration: token.expiration,
              role: body.role,
            }, `Login Success,Weclome ${reultByOne.user_name} !!!`);
          }
        }
        break;
      case 'STUDENT':
        reultByOne = await ctx.service.student.findStudentBySid(body.account);

        token = await ctx.service.jwt.createToken(token_payload); // 获取 token
        payload.auth_token = token.accessToken;

        if (reultByOne) {
          checkPwd = await ctx.helper.compareSync(body.pwd, reultByOne.pwd); // 验证密码是否一直
          if (checkPwd) {
            await ctx.service.student.updateStudent(reultByOne, payload);

            await ctx.helper.response(ctx, {
              accessToken: token.accessToken,
              expiration: token.expiration,
              role: body.role,
            }, `Login Success,Weclome ${reultByOne.s_name} !!!`);
          }
        }
        break;
      case 'TEACHER':
        reultByOne = await ctx.service.teacher.findTeacherByTid(body.account);

        token = await ctx.service.jwt.createToken(token_payload); // 获取 token
        payload.auth_token = token.accessToken;

        if (reultByOne) {
          checkPwd = await ctx.helper.compareSync(body.pwd, reultByOne.pwd); // 验证密码是否一直
          console.log(body.pwd, reultByOne.pwd, ctx.helper.compareSync(body.pwd, reultByOne.pwd));
          if (checkPwd) {
            await ctx.service.teacher.updateTeacher(reultByOne, payload);

            await ctx.helper.response(ctx, {
              accessToken: token.accessToken,
              expiration: token.expiration,
              role: body.role,
            }, `Login Success,Weclome ${reultByOne.t_name} !!!`);
          }
        }
        break;
      default:
        await ctx.helper.response(ctx, null, `当前角色 ${body.role} 不存在 !!!`, UnprocessableEntity.status);
        break;
    }

    if (!checkPwd) {
      await ctx.helper.response(ctx, null, `当前账号 ${body.account} 的密码不正确 !!!`, UnprocessableEntity.status);
    }

    if (!reultByOne) {
      await ctx.helper.response(ctx, null, `当前账号 ${body.account} 不存在 !!!`, UnprocessableEntity.status);
    }
  }
}

module.exports = LoginController;
