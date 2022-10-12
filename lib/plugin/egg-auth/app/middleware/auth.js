module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url;

    const token = ctx.request.token;

    // const user = ctx.session[ctx.username];
    const username = await ctx.app.redis.get(ctx.username);

    const user = username ? username === token : username;

    if (!user && !options.exclude.includes(url.split("?")[0])) {
      ctx.body = {
        status: 1001,
        message: "用户未登录",
      };
    } else {
      await next();
    }
  };
};
