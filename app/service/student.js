'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');
const {
  Op,
} = require('sequelize');

class StudentService extends Service {
  async findAllStudent({
    current = 1,
    pageSize = 10,
    name = '',
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Student.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        attributes: {
          exclude: [ 'pwd' ],
        },
        order: [
          [ 'created_at', 'DESC' ],
        ],
        include: [{
          model: this.app.model.Major,
        }],
        where: {
          s_name: {
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

  async addStudent(student) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Student.create(student);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findStudentBySid(s_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Student.findOne({
        where: {
          s_id,
        },
        include: [{
          model: this.app.model.Major,
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

  async updateStudent(student, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await student.update(
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

  async deleteStudent(s_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Student.destroy({
        where: {
          s_id,
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

module.exports = StudentService;
