'use strict';

const Service = require('egg').Service;
const {
  InternalServerError,
} = require('../utils/status');
const {
  Op,
} = require('sequelize');

class StudentCourseService extends Service {
  async findAllStudentCourse({
    current = 1,
    pageSize = 10,
    s_id = '',
    t_id = '',
    c_name = '',
    is_publish = '',
    gte = 0,
    lte = 100,
  } = {}) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.findAndCountAll({
        offset: current === 1 ? 0 : pageSize * (current - 1),
        limit: pageSize,
        order: [
          [ 'created_at', 'DESC' ],
        ],
        where: {
          is_publish: {
            [Op.like]: `${is_publish || '%%'}`,
          },
          [Op.or]: [
            {
              score: {
                between: [ gte, lte ],
              },
            },
            {
              second_score: {
                between: [ gte, lte ],
              },
            },
          ],
        },
        include: [{
          model: this.app.model.Student,
          where: {
            s_id: {
              [Op.like]: `${s_id || '%%'}`,
            },
          },
          attributes: {
            exclude: [ 'pwd', 'auth_token', 'login_time', 'login_ip', 'role' ],
          },
        }, {
          model: this.app.model.Course,
          where: {
            c_name: {
              [Op.like]: `%${c_name || ''}%`,
            },
          },
          include: {
            model: this.app.model.Teacher,
            where: {
              t_id: {
                [Op.like]: `${t_id || '%%'}`,
              },
            },
            attributes: {
              exclude: [ 'pwd', 'auth_token', 'login_time', 'login_ip', 'role' ],
            },
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

  async addStudentCourse(studentCourse) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.create(studentCourse);

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async findStudentCourseByPK(s_id, c_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.findOne({
        where: {
          s_id,
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

  async findStudentCourseBySid(s_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.findOne({
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

  async findStudentCourseByCid(c_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.findOne({
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

  async updateStudentCourse(studentCourse, payload) {
    const {
      ctx,
    } = this;
    try {
      const result = await studentCourse.update(
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

  async destroyStudentCourse(studentCourse) {
    const {
      ctx,
    } = this;
    try {
      const result = studentCourse.destroy();

      return result;
    } catch (error) {
      ctx.status = 500;
      ctx.body = Object.assign(InternalServerError, {
        message: error,
      });
      throw (error);
    }
  }

  async destroyStudentCourseByCid(c_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.destroy({
        where: c_id,
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

  async destroyStudentCourseBySid(s_id) {
    const {
      ctx,
    } = this;
    try {
      const result = await ctx.model.StudentCourse.destroy({
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

module.exports = StudentCourseService;
