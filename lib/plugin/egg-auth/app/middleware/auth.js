module.exports = (options) => {
  return async (ctx, next) => {
    const url = ctx.request.url;

    const user = ctx.session[ctx.username];

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
