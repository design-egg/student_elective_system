'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const {
  Unauthorized,
  SUCCESS,
  UnprocessableEntity,
} = require('../utils/status');
const _ = require('lodash');

exports.getAccessToken = ctx => {
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};

// 校验 Token
exports.verifyToken = async (ctx, account = '', roles = []) => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.jwt.verifyToken(token);
  const account_ = account || verifyResult.message.account;

  if (!verifyResult.verify) { // 是否过期
    ctx.helper.response(ctx, null, verifyResult.message, Unauthorized.status);
    return false;
  }

  let resultOne = null;

  if (roles.includes('ADMIN')) { // 是否存在该用户
    if (account_ && !resultOne) resultOne = await ctx.service.admin.findAdminByAccount(account_);
  }
  if (roles.includes('STUDENT')) {
    if (account_ && !resultOne) resultOne = await ctx.service.student.findStudentBySid(account_);
  }
  if (roles.includes('TEACHER')) {
    if (account_ && !resultOne) resultOne = await ctx.service.teacher.findTeacherByTid(account_);
  }

  if (resultOne) {
    if (token !== resultOne.auth_token) {
      ctx.helper.response(ctx, null, '失效的 token', Unauthorized.status);
      return false;
    }
  } else {
    ctx.helper.response(ctx, null, '用户账号不存在或者无权操作', UnprocessableEntity.status);
    return false;
  }

  if (account_ && account_ !== verifyResult.message.account) {
    ctx.helper.response(ctx, null, '用户账号与 Token 中的不一致', Unauthorized.status);
    return false;
  }

  return verifyResult.message;
};

// 解析 token
exports.analyzeToken = async ctx => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.jwt.verifyToken(token);
  return verifyResult.message;
};


// 响应成功
exports.response = (ctx, data = null, message = SUCCESS.message, status = SUCCESS.status) => {
  ctx.body = {
    code: status,
    message,
    data,
  };
  ctx.status = status;
};

// 加密明文
exports.hashSync = laws => {
  return bcrypt.hashSync(laws, salt);
};

// 验证密文
exports.compareSync = (laws, ciphertext) => {
  return bcrypt.compareSync(laws, ciphertext);
};

// pwd 敏感字段,将其设置为 -1
exports.setPwd = payload => {
  if (_.isObject(payload)) {
    if (payload.pwd) payload.pwd = '-1';
  }
  if (_.isArray(payload)) {
    _.forEach(payload, item => {
      if (item.pwd) item.pwd = '-1';
      else this.setPwd(item);
    });
  }

  return payload;
};

// 将未发布的成绩设置成 0
exports.setScore = payload => {
  if (_.isObject(payload)) {
    _.forEach(payload.rows, item => {
      if (item.is_publish === '0' || item.is_publish === '未公布') {
        item.score = 0;
        item.second_score = 0;
      }
    });
  }

  return payload;
};
