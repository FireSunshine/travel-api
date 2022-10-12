module.exports = (option) => {
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.username);
    if (!user) {
      ctx.body = {
        status: 500,
        message: "用户不存在",
      };
      return;
    } else {
      await next();
    }
  };
};
