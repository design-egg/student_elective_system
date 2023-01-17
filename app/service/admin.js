'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');

class AdminService extends Service {
  async findAllAdmin({
    current = 1,
    pageSize = 10,
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Admin.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        attributes: {
          exclude: [ 'pwd' ],
        },
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async addAdmin(admin) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Admin.create(admin);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findAdminByAccount(account) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Admin.findOne({
        where: {
          account,
        },
      });

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async updateAdmin(admin, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await admin.update(
        payload
      );

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }
}

module.exports = AdminService;
