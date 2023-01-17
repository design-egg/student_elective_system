'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');
const {
  Op,
} = require('sequelize');

class CourseService extends Service {
  async findAllCourse({
    current = 1,
    pageSize = 10,
    name = '',
    t_id = '',
    t_name = '',
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Course.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        order: [
          [ 'created_at', 'DESC' ],
        ],
        where: {
          c_name: {
            [Op.like]: `%${name || ''}%`,
          },
          t_id: {
            [Op.like]: `${t_id || '%%'}`,
          },
        },
        include: [{
          model: this.app.model.Teacher,
          where: {
            t_name: {
              [Op.like]: `%${t_name || ''}%`,
            },
          },
          attributes: {
            exclude: [ 'pwd', 'auth_token', 'login_time', 'login_ip', 'role' ],
          },
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

  async addCourse(course) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Course.create(course);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findCourseByCid(c_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Course.findOne({
        where: {
          c_id,
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

  async updateCourse(course, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await course.update(
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

  async deleteCourse(c_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.Course.destroy({
        where: {
          c_id,
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

module.exports = CourseService;
