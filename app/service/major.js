'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');
const {
  Op,
} = require('sequelize');

class MajorService extends Service {
  async findAllMajor({
    current = 1,
    pageSize = 10,
    name = '',
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Major.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        order: [
          [ 'created_at', 'DESC' ],
        ],
        include: [{
          model: this.app.model.Dept,
        }],
        where: {
          m_name: {
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

  async addMajor(major) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Major.create(major);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findMajorByMid(m_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Major.findOne({
        where: {
          m_id,
        },
        include: [{
          model: this.app.model.Dept,
        }],
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

  async findMajorByDid(d_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Major.findOne({
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

  async updateMajor(major, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await major.update(
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

  async deleteMajor(m_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Major.destroy({
        where: {
          m_id,
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

module.exports = MajorService;
