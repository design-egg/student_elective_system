'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');
const {
  Op,
} = require('sequelize');

class TeacherService extends Service {
  async findAllTeacher({
    current = 1,
    pageSize = 10,
    name = '',
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Teacher.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        attributes: {
          exclude: [ 'pwd' ],
        },
        order: [
          [ 'created_at', 'DESC' ],
        ],
        where: {
          t_name: {
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

  async addTeacher(teacher) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Teacher.create(teacher);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findTeacherByTid(t_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Teacher.findOne({
        where: {
          t_id,
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

  async updateTeacher(teacher, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await teacher.update(
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

  async deleteTeacher(t_id) {
    const {
      ctx,
    } = this;
    try {
      console.log(t_id);
      const result = await ctx.model.Teacher.destroy({
        where: {
          t_id,
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

module.exports = TeacherService;
