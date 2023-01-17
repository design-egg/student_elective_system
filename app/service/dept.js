'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');
const {
  Op,
} = require('sequelize');

class DeptService extends Service {
  async findAllDept({
    current = 1,
    pageSize = 10,
    name = '',
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Dept.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        order: [
          [ 'created_at', 'DESC' ],
        ],
        where: {
          d_name: {
            [Op.like]: `%${name || ''}%`,
          },
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

  async addDept(dept) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Dept.create(dept);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findDeptByDid(d_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Dept.findOne({
        where: {
          d_id,
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

  async updateDept(dept, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await dept.update(
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

  async deleteDept(d_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Dept.destroy({
        where: {
          d_id,
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
}

module.exports = DeptService;
