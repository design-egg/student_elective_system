'use strict';

const Controller = require('egg').Controller;
const {
  UnprocessableEntity,
} = require('../utils/status');
const {
  PwdRule,
  AdminRule,
  StudentRule,
  TeacherRule,
} = require('../utils/rule');
const _ = require('lodash');

class UserController extends Controller {
  async current() {
    const {
      ctx,
    } = this;

    const verify = await ctx.helper.analyzeToken(ctx);
    let reultByOne = null;

    switch (verify.role) {
      case 'ADMIN':
        reultByOne = await ctx.service.admin.findAdminByAccount(verify.account);
        break;
      case 'STUDENT':
        reultByOne = await ctx.service.student.findStudentBySid(verify.account);
        break;
      case 'TEACHER':
        reultByOne = await ctx.service.teacher.findTeacherByTid(verify.account);
        break;
      default:
        await ctx.helper.response(ctx, null, `当前角色 ${verify.Role} 不存在 !!!`, UnprocessableEntity.status);
    }

    reultByOne = await ctx.helper.setPwd(reultByOne); // 不允许查看密码
    await ctx.helper.response(ctx, reultByOne);
  }

  async update() {
    const {
      ctx,
    } = this;

    const verify = await ctx.helper.analyzeToken(ctx);
    const body = ctx.request.body;
    let reultByOne = null;
    let result = null;
    let payload = {};

    switch (verify.role) {
      case 'ADMIN':
        ctx.validate(AdminRule, body);
        reultByOne = await ctx.service.admin.findAdminByAccount(verify.account);
        break;
      case 'STUDENT':
        ctx.validate(StudentRule, body);
        reultByOne = await ctx.service.student.findStudentBySid(verify.account);
        break;
      case 'TEACHER':
        ctx.validate(TeacherRule, body);
        reultByOne = await ctx.service.teacher.findTeacherByTid(verify.account);
        break;
      default:
        await ctx.helper.response(ctx, null, `当前角色 ${verify.Role} 不存在 !!!`, UnprocessableEntity.status);
    }

    if (reultByOne) {
      switch (verify.role) {
        case 'ADMIN':
          payload.user_name = body.user_name;
          result = await ctx.service.admin.updateAdmin(reultByOne, payload);
          break;
        case 'STUDENT':
          payload = body;
          payload = _.omit(payload, 's_id');
          payload = _.omit(payload, 'pwd');
          result = await ctx.service.student.updateStudent(reultByOne, payload);
          break;
        case 'TEACHER':
          payload = body;
          payload = _.omit(payload, 't_id');
          payload = _.omit(payload, 'pwd');
          result = await ctx.service.teacher.updateTeacher(reultByOne, payload);
          break;
        default:
          await ctx.helper.response(ctx, null, `当前角色 ${verify.Role} 不存在 !!!`, UnprocessableEntity.status);
      }
      result = await ctx.helper.setPwd(result); // 不允许查看密码;
      await ctx.helper.response(ctx, result);
    }
  }

  async restPwd() {
    const {
      ctx,
    } = this;

    const verify = await ctx.helper.analyzeToken(ctx);
    const body = ctx.request.body;

    const payload = {
      pwd: '',
      auth_token: '',
    };
    let reultByOne = null;
    let checkPwd = false;

    ctx.validate(PwdRule, body);
    if (body.new_password === body.repeat_password) {
      switch (verify.role) {
        case 'ADMIN':
          reultByOne = await ctx.service.admin.findAdminByAccount(verify.account);
          break;
        case 'STUDENT':
          reultByOne = await ctx.service.student.findStudentBySid(verify.account);
          break;
        case 'TEACHER':
          reultByOne = await ctx.service.teacher.findTeacherByTid(verify.account);
          break;
        default:
          await ctx.helper.response(ctx, null, `当前角色 ${verify.Role} 不存在 !!!`, UnprocessableEntity.status);
      }
    } else {
      await ctx.helper.response(ctx, null, '两次密码输入不一致 !!!', UnprocessableEntity.status);
    }

    if (reultByOne) {
      checkPwd = await ctx.helper.compareSync(body.old_password, reultByOne.pwd); // 验证密码是否一直
      if (checkPwd) {
        switch (verify.role) {
          case 'ADMIN':
            payload.pwd = await ctx.helper.hashSync(body.new_password);
            await ctx.service.admin.updateAdmin(reultByOne, payload);
            break;
          case 'STUDENT':
            payload.pwd = await ctx.helper.hashSync(body.new_password);
            await ctx.service.student.updateStudent(reultByOne, payload);
            break;
          case 'TEACHER':
            payload.pwd = await ctx.helper.hashSync(body.new_password);
            await ctx.service.teacher.updateTeacher(reultByOne, payload);
            break;
          default:
            await ctx.helper.response(ctx, null, `当前角色 ${verify.Role} 不存在 !!!`, UnprocessableEntity.status);
        }
        await ctx.helper.response(ctx, null, 'Update user password successfully !!!');

      } else {
        await ctx.helper.response(ctx, null, '原始密码不正确 !!!', UnprocessableEntity.status);
      }
    }

  }
}

module.exports = UserController;
