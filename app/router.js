'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    swagger,
  } = app;

  // login
  router.post('login', '/api/login', controller.login.login);
  swagger.post('/api/login', {
    tags: [
      'user',
    ],
    summary: '用户登录',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '用户登录信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'account', 'pwd', 'role', 'rememberMe' ],
        properties: {
          account: {
            type: 'string',
            description: '用户账号',
          },
          pwd: {
            type: 'string',
            description: '用户密码',
          },
          role: {
            type: 'string',
            description: '用户角色',
          },
          rememberMe: {
            type: 'boolean',
            description: '7天内记住我',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: 'Access Token',
              properties: {
                accessToken: {
                  type: 'string',
                  description: 'Access Token',
                },
                expiration: {
                  type: 'string',
                  description: '过期时长',
                },
                role: {
                  type: 'string',
                  description: '角色',
                },
              },
            },
          },
        },
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });

  // 获取当前用户信息
  router.get('current', '/api/user/current', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT', 'TEACHER' ]), controller.user.current);
  swagger.get('/api/user/current', {
    tags: [
      'user',
    ],
    summary: '获取用户信息',
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '用户详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.patch('restPwd', '/api/user/restpwd', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT', 'TEACHER' ]), controller.user.restPwd);
  swagger.patch('/api/user/restpwd', {
    tags: [
      'user',
    ],
    summary: '修改用户密码',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '用户密码信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'old_password', 'new_password', 'repeat_password' ],
        properties: {
          old_password: {
            type: 'string',
            description: '旧密码',
          },
          new_password: {
            type: 'string',
            description: '新密码',
          },
          repeat_password: {
            type: 'string',
            description: '再次输入密码',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('updateUser', '/api/user/current', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT', 'TEACHER' ]), controller.user.update);
  swagger.put('/api/user/current', {
    tags: [
      'user',
    ],
    summary: '修改用户个人信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '用户个人信息',
      required: true,
      schema: {
        type: 'object',
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });

  // admin
  // router.get('allAdmins', '/api/admin', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.admin.all);
  // router.get('getAdminByAccount', '/api/admin/:account', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.admin.getByAccount);
  router.post('addAdmin', '/api/admin', controller.admin.add);

  // dept
  router.get('allDepts', '/api/dept', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.dept.all);
  swagger.get('/api/dept', {
    tags: [
      'ADMIN',
    ],
    summary: '获取院系信息',
    parameters: [{
      in: 'query',
      type: 'number',
      name: 'current',
      description: '当前页码',
    },
    {
      in: 'query',
      type: 'number',
      name: 'pageSize',
      description: '一页分成多少条',
    },
    {
      in: 'query',
      type: 'string',
      name: 'name',
      description: '院系名称关键词',
    },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '院系详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.get('getDeptByDid', '/api/dept/:id', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.dept.getById);
  swagger.get('/api/dept/:id', {
    tags: [
      'ADMIN',
    ],
    summary: '根据院系编号获取院系信息',
    parameters: [{
      in: 'path',
      type: 'string',
      name: 'id',
      description: '院系编号',
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '院系详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.post('addDept', '/api/dept', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.dept.add);
  swagger.post('/api/dept', {
    tags: [
      'ADMIN',
    ],
    summary: '添加院系信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '院系信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'd_id', 'd_name' ],
        properties: {
          d_id: {
            type: 'string',
            description: '院系编号',
          },
          d_name: {
            type: 'string',
            description: '院系名称',
          },
          d_info: {
            type: 'string',
            description: '院系简介',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '院系详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('updateDept', '/api/dept', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.dept.update);
  swagger.put('/api/dept', {
    tags: [
      'ADMIN',
    ],
    summary: '修改院系信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '院系信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'd_id', 'd_name' ],
        properties: {
          d_id: {
            type: 'string',
            description: '院系编号',
          },
          d_name: {
            type: 'string',
            description: '院系名称',
          },
          d_info: {
            type: 'string',
            description: '院系简介',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '院系详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.delete('deleteDept', '/api/dept', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.dept.destroy);
  swagger.delete('/api/dept', {
    tags: [
      'ADMIN',
    ],
    summary: '删除院系信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '院系编号信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'd_id' ],
        properties: {
          d_id: {
            type: 'array',
            description: '院系编号',
            item: {
              type: 'number',
            },
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });

  // major
  router.get('allMajors', '/api/major', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.major.all);
  swagger.get('/api/major', {
    tags: [
      'ADMIN',
    ],
    summary: '获取专业信息',
    parameters: [{
      in: 'query',
      type: 'number',
      name: 'current',
      description: '当前页码',
    },
    {
      in: 'query',
      type: 'number',
      name: 'pageSize',
      description: '一页分成多少条',
    },
    {
      in: 'query',
      type: 'string',
      name: 'name',
      description: '专业名称关键词',
    },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '专业详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.get('getMajorByMid', '/api/major/:id', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.major.getById);
  swagger.get('/api/major/:id', {
    tags: [
      'ADMIN',
    ],
    summary: '根据专业编号获取专业信息',
    parameters: [{
      in: 'path',
      type: 'string',
      name: 'id',
      description: '专业编号',
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '专业详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.post('addMajor', '/api/major', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.major.add);
  swagger.post('/api/major', {
    tags: [
      'ADMIN',
    ],
    summary: '修改专业信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '专业信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'm_id', 'd_id', 'm_name' ],
        properties: {
          m_id: {
            type: 'string',
            description: '专业编号',
          },
          d_id: {
            type: 'string',
            description: '院系编号',
          },
          m_name: {
            type: 'string',
            description: '专业名称',
          },
          m_info: {
            type: 'string',
            description: '专业简介',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '专业详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('updateMajor', '/api/major', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.major.update);
  swagger.put('/api/major', {
    tags: [
      'ADMIN',
    ],
    summary: '添加专业信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '专业信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'm_id', 'd_id', 'm_name' ],
        properties: {
          m_id: {
            type: 'string',
            description: '专业编号',
          },
          d_id: {
            type: 'string',
            description: '院系编号',
          },
          m_name: {
            type: 'string',
            description: '专业名称',
          },
          m_info: {
            type: 'string',
            description: '专业简介',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '专业详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.delete('deleteMajor', '/api/major', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.major.destroy);
  swagger.delete('/api/major', {
    tags: [
      'ADMIN',
    ],
    summary: '删除专业信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '专业编号信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'm_id' ],
        properties: {
          m_id: {
            type: 'array',
            description: '专业编号',
            item: {
              type: 'number',
            },
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });

  // course
  router.get('allCourses', '/api/course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT', 'TEACHER' ]), controller.course.all);
  swagger.get('/api/course', {
    tags: [
      'ADMIN', 'STUDENT', 'TEACHER',
    ],
    summary: '获取课程信息',
    parameters: [{
      in: 'query',
      type: 'number',
      name: 'current',
      description: '当前页码',
    },
    {
      in: 'query',
      type: 'number',
      name: 'pageSize',
      description: '一页分成多少条',
    },
    {
      in: 'query',
      type: 'string',
      name: 'name',
      description: '课程名称关键词',
    },
    {
      in: 'query',
      type: 'string',
      name: 't_id',
      description: '授课教师工号',
    },
    {
      in: 'query',
      type: 'string',
      name: 't_name',
      description: '授课教师姓名关键词',
    },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '课程详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.get('getCourseByCid', '/api/course/:id', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT', 'TEACHER' ]), controller.course.getById);
  swagger.get('/api/course/:id', {
    tags: [
      'ADMIN', 'STUDENT', 'TEACHER',
    ],
    summary: '根据课程编号获取课程信息',
    parameters: [{
      in: 'path',
      type: 'string',
      name: 'id',
      description: '课程编号',
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '专业详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.post('addCourse', '/api/course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'TEACHER' ]), controller.course.add);
  swagger.post('/api/course', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '添加课程信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '课程信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'c_id', 't_id', 'c_name', 'credit', 'count' ],
        properties: {
          c_id: {
            type: 'string',
            description: '课程编号',
          },
          t_id: {
            type: 'string',
            description: '授课教师工号',
          },
          c_name: {
            type: 'string',
            description: '课程名称',
          },
          c_info: {
            type: 'string',
            description: '课程简介',
          },
          credit: {
            type: 'double',
            description: '课程学分',
          },
          count: {
            type: 'number',
            description: '可供选课人数',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '课程详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('updateCourse', '/api/course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'TEACHER' ]), controller.course.update);
  swagger.put('/api/course', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '修改课程信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '课程信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'c_id', 't_id', 'c_name', 'credit', 'count' ],
        properties: {
          c_id: {
            type: 'string',
            description: '课程编号',
          },
          t_id: {
            type: 'string',
            description: '授课教师工号',
          },
          c_name: {
            type: 'string',
            description: '课程名称',
          },
          c_info: {
            type: 'string',
            description: '课程简介',
          },
          credit: {
            type: 'double',
            description: '课程学分',
          },
          count: {
            type: 'number',
            description: '可供选课人数',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '课程详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.delete('deleteCourse', '/api/course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'TEACHER' ]), controller.course.destroy);
  swagger.delete('/api/course', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '删除课程信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '课程编号信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'c_id' ],
        properties: {
          c_id: {
            type: 'array',
            description: '课程编号',
            item: {
              type: 'number',
            },
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });

  // student
  router.get('allStudents', '/api/student', app.jwt, app.middleware.checkRule([ 'ADMIN', 'TEACHER' ]), controller.student.all);
  swagger.get('/api/student', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '获取学生信息',
    parameters: [{
      in: 'query',
      type: 'number',
      name: 'current',
      description: '当前页码',
    },
    {
      in: 'query',
      type: 'number',
      name: 'pageSize',
      description: '一页分成多少条',
    },
    {
      in: 'query',
      name: 'name',
      type: 'string',
      description: '学生姓名关键词',
    },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.get('getStudentBySid', '/api/student/:id', app.jwt, app.middleware.checkRule([ 'ADMIN', 'TEACHER' ]), controller.student.getById);
  swagger.get('/api/student/:id', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '根据学生学号获取学生信息',
    parameters: [{
      in: 'path',
      type: 'string',
      name: 'id',
      description: '学生学号',
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.post('addStudent', '/api/student', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.student.add);
  swagger.post('/api/student', {
    tags: [
      'ADMIN',
    ],
    summary: '添加学生信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '课程信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 's_id', 'm_id', 's_name', 'sex' ],
        properties: {
          s_id: {
            type: 'string',
            description: '学生学号',
          },
          m_id: {
            type: 'string',
            description: '专业编号',
          },
          s_name: {
            type: 'string',
            description: '学生姓名',
          },
          sex: {
            type: 'string',
            description: '学生性别',
          },
          phone: {
            type: 'string',
            description: '联系电话号码',
          },
          role: {
            type: 'string',
            description: '角色',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('putStudent', '/api/student', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.student.update);
  swagger.put('/api/student', {
    tags: [
      'ADMIN',
    ],
    summary: '修改学生信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '课程信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 's_id', 'm_id', 's_name', 'sex' ],
        properties: {
          s_id: {
            type: 'string',
            description: '学生学号',
          },
          m_id: {
            type: 'string',
            description: '专业编号',
          },
          s_name: {
            type: 'string',
            description: '学生姓名',
          },
          sex: {
            type: 'string',
            description: '学生性别',
          },
          phone: {
            type: 'string',
            description: '联系电话号码',
          },
          role: {
            type: 'string',
            description: '角色',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.delete('deleteStudent', '/api/student', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.student.destroy);
  swagger.delete('/api/student', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '删除学生信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '学生学号信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 's_id' ],
        properties: {
          s_id: {
            type: 'array',
            description: '学生学号',
            item: {
              type: 'number',
            },
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });

  // teacher
  router.get('allTeachers', '/api/teacher', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.teacher.all);
  swagger.get('/api/teacher', {
    tags: [
      'ADMIN',
    ],
    summary: '获取教师信息',
    parameters: [{
      in: 'query',
      type: 'number',
      name: 'current',
      description: '当前页码',
    },
    {
      in: 'query',
      type: 'number',
      name: 'pageSize',
      description: '一页分成多少条',
    },
    {
      in: 'query',
      type: 'string',
      name: 'name',
      description: '教师姓名关键词',
    },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '教师详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.get('getTeacherByTid', '/api/teacher/:id', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.teacher.getById);
  swagger.get('/api/teacher/:id', {
    tags: [
      'ADMIN',
    ],
    summary: '根据教师工号获取学生信息',
    parameters: [{
      in: 'path',
      type: 'string',
      name: 'id',
      description: '教师工号',
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '教师详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.post('addTeacher', '/api/teacher', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.teacher.add);
  swagger.post('/api/teacher', {
    tags: [
      'ADMIN',
    ],
    summary: '添加教师信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '教师信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 't_id', 't_name', 's_name', 'sex', 'job' ],
        properties: {
          t_id: {
            type: 'string',
            description: '教师工号',
          },
          t_name: {
            type: 'string',
            description: '教师姓名',
          },
          sex: {
            type: 'string',
            description: '教师性别',
          },
          phone: {
            type: 'string',
            description: '联系电话号码',
          },
          job: {
            type: 'string',
            description: '职称',
          },
          count: {
            type: 'number',
            description: '允许开设的课程',
          },
          role: {
            type: 'string',
            description: '角色',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '教师详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('putTeacher', '/api/teacher', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.teacher.update);
  swagger.put('/api/teacher', {
    tags: [
      'ADMIN',
    ],
    summary: '修改教师信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '教师信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 't_id', 't_name', 's_name', 'sex', 'job' ],
        properties: {
          t_id: {
            type: 'string',
            description: '教师工号',
          },
          t_name: {
            type: 'string',
            description: '教师姓名',
          },
          sex: {
            type: 'string',
            description: '教师性别',
          },
          phone: {
            type: 'string',
            description: '联系电话号码',
          },
          job: {
            type: 'string',
            description: '职称',
          },
          count: {
            type: 'number',
            description: '允许开设的课程',
          },
          role: {
            type: 'string',
            description: '角色',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '教师详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.delete('deleteTeacher', '/api/teacher', app.jwt, app.middleware.checkRule([ 'ADMIN' ]), controller.teacher.destroy);
  swagger.delete('/api/teacher', {
    tags: [
      'ADMIN',
    ],
    summary: '删除教师信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '教师工号信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 't_id' ],
        properties: {
          t_id: {
            type: 'array',
            description: '教师工号',
            item: {
              type: 'number',
            },
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });

  // student_course
  router.get('allStudentCourses', '/api/student-course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT', 'TEACHER' ]), controller.studentCourse.all);
  swagger.get('/api/student-course', {
    tags: [
      'ADMIN', 'STUDENT', 'TEACHER',
    ],
    summary: '获取学生选课信息',
    parameters: [{
      in: 'query',
      type: 'number',
      name: 'current',
      description: '当前页码',
    },
    {
      in: 'query',
      type: 'number',
      name: 'pageSize',
      description: '一页分成多少条',
    },
    {
      in: 'query',
      type: 'string',
      name: 's_id',
      description: '学生学号',
    },
    {
      in: 'query',
      type: 'string',
      name: 't_id',
      description: '授课教师工号',
    },
    {
      in: 'query',
      type: 'string',
      name: 'c_name',
      description: '课程名称关键词',
    },
    {
      in: 'query',
      type: 'string',
      name: 'is_publish',
      description: '是否已公布成绩',
    },
    {
      in: 'query',
      type: 'number',
      name: 'is_pass',
      description: '是否已通过考核',
    },
    ],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生选课以及成绩详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
  router.post('addStudentCourse', '/api/student-course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'STUDENT' ]), controller.studentCourse.add);
  swagger.post('/api/student-course', {
    tags: [
      'ADMIN', 'STUDENT',
    ],
    summary: '添加学生选课信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '学生选课信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 's_id', 'c_id' ],
        properties: {
          s_id: {
            type: 'string',
            description: '学生学号',
          },
          c_id: {
            type: 'string',
            description: '课程编号',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生选课详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.put('allStudentCourse', '/api/student-course', app.jwt, app.middleware.checkRule([ 'ADMIN', 'TEACHER' ]), controller.studentCourse.update);
  swagger.put('/api/student-course', {
    tags: [
      'ADMIN', 'TEACHER',
    ],
    summary: '修改学生选课成绩信息',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '学生选课信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 's_id', 'c_id' ],
        properties: {
          s_id: {
            type: 'string',
            description: '学生学号',
          },
          c_id: {
            type: 'string',
            description: '课程编号',
          },
          score: {
            type: 'double',
            description: '课程成绩',
          },
          second_score: {
            type: 'double',
            description: '课程补考成绩',
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
            data: {
              type: 'object',
              description: '学生选课成绩详细信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
      422: {
        description: 'Unprocessable Entity',
      },
    },
  });
  router.delete('destroyStudentCourse', '/api/student-course', app.jwt, app.middleware.checkRule([ 'STUDENT' ]), controller.studentCourse.destroy);
  swagger.delete('/api/student-course', {
    tags: [
      'STUDENT',
    ],
    summary: '公选课退选',
    parameters: [{
      in: 'body',
      name: 'body',
      description: '公选课编号信息',
      required: true,
      schema: {
        type: 'object',
        required: [ 'id' ],
        properties: {
          id: {
            type: 'array',
            description: '公选课编号',
            item: {
              type: 'number',
            },
          },
        },
      },
    }],
    responses: {
      200: {
        description: 'SUCCEED',
        schema: {
          type: 'object',
          properties: {
            code: {
              type: 'number',
              description: '状态码',
            },
            message: {
              type: 'string',
              description: '提示信息',
            },
          },
        },
      },
      401: {
        description: 'Token does not exist or has expired',
      },
    },
  });
};
