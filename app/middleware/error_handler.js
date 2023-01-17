'use strict';

const {
  NotFound,
  Unauthorized,
  UnprocessableEntity,
  InternalServerError,
} = require('../utils/status');

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      switch (ctx.response.status) {
        case 404:
          ctx.status = 404;
          ctx.body = Object.assign(NotFound, {
            data: ctx.request,
          });
          break;
        default:
          ctx.status = 200;
      }
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || InternalServerError.status;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === InternalServerError.status && ctx.app.config.env === 'prod' ?
        'Internal Server Error' :
        err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        error,
      };

      switch (status) {
        case 401:
          ctx.body = Unauthorized;
          break;
        case 422:
          ctx.body = Object.assign(
            UnprocessableEntity, {
              data: err.errors,
            }
          );
          break;
        case 500:
          ctx.body = Object.assign(
            InternalServerError, {
              message: error,
            }
          );
          break;
        default:
          err.status = 404;
      }

      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          err.status = 422;
          ctx.body = Object.assign(
            UnprocessableEntity, {
              message: err.errors[0].message,
            }
          );
          break;
        default:
          err.status = 404;
      }

      ctx.status = status;
    }
  };
};
