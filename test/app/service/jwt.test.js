'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { ADMIN, ACCESS_TOKEN } = require('../data/user.data');

describe('test/app/service/jwt.tets.js', () => {
  it('JwtService.createToken', async () => {
    const ctx = app.mockContext();
    const jwt = await ctx.service.jwt.createToken(ADMIN);

    assert(jwt);
  });

  it('JwtService.verifyToken', async () => {
    const ctx = app.mockContext();
    const jwt = await ctx.service.jwt.verifyToken(ACCESS_TOKEN.replace('Bearer ', ''));

    assert(jwt);
  });
});
