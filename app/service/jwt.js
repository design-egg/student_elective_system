'use strict';

const Service = require('egg').Service;

// 过期时间是 3600 秒，既是 10 个小时
const EXPIRATION = '10h';
// 选择了记住我之后的过期时间为 7 天
const EXPIRATION_REMEMBER = '168h';

class JwtService extends Service {
  async createToken(payload) {
    const {
      app,
    } = this;

    const expiration = payload.rememberMe ? EXPIRATION_REMEMBER : EXPIRATION;
    const accessToken = app.jwt.sign(payload, app.config.jwt.secret, {
      expiresIn: expiration,
    });
    return {
      accessToken,
      expiration,
    };
  }

  async verifyToken(token) {
    const {
      app,
    } = this;

    return new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, function(err, decoded) {
        const result = {};
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
      });
    });
  }
}

module.exports = JwtService;
