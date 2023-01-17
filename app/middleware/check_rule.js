'use strict';

module.exports = role => {
  return async function checkRule(ctx, next) {

    const user = await ctx.helper.analyzeToken(ctx);
    const verify = await ctx.helper.verifyToken(ctx, user.account, role);

    if (verify && role.includes(verify.role)) {
      await next();
    } else {
      return false;
    }

  };
};
