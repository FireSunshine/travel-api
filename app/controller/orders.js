"use strict";

const BaseController = require("./base");

class OrdersController extends BaseController {
  // 查询订单状态
  async hasOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.hasOrder({
      userId: user.id,
      houseId: ctx.params("id"),
    });
    this.success(result);
  }

  // 预定
  async addOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.addOrder({
      userId: user.id,
      houseId: ctx.params("id"),
      isPayed: 0,
      createTime: ctx.helper.time(),
    });

    if (result) {
      this.success(result);
    } else {
      this.error("预定失败");
    }
  }

  // 取消预订
  async delOrder() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.delOrder(ctx.params("id"));
    if (result) {
      this.success(result);
    } else {
      this.error("取消失败");
    }
  }

  async lists(params) {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: user.id,
    });
    if (result) {
      this.success(result);
    } else {
      this.error("查询订单失败");
    }
  }
}

module.exports = OrdersController;
