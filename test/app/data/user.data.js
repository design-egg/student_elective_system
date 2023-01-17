'use strict';

const accessToken = require('../test_data/accessToken.json');

module.exports = {
  ADMIN: {
    account: 'admin@admin.cc',
    user_name: 'admin',
    pwd: '123456',
    role: 'ADMIN',
    rememberMe: true,
  },
  ACCESS_TOKEN: `Bearer ${accessToken.accessToken}`,
};
