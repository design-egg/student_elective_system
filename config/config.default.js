'use strict';

const sequelizeConfig = require('./config.sequelize');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544247657543_1469';

  // add your config here
  // 中间件
  config.middleware = [ 'errorHandler' ];
  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: 3306,
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'student_elective_system',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 关闭 csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    xframe: {
      enable: false,
    },
  };

  // 跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTION',
  };

  // jwt
  config.jwt = {
    secret: 'P@ssw02d',
  };

  // 解析时允许的最大长度
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  // swagger2
  config.swagger2 = {
    enable: true,
    base: {
      swagger: '2.0.0',
      info: {
        description: 'This is a test swagger-ui html',
        version: '1.0.0',
        title: 'TEST',
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
    },
  };

  config.sequelize = sequelizeConfig;

  return config;
};
