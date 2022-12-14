"use strict";

const BaseController = require("./base");

class OrdersController extends BaseController {
  // 查询订单状态
  async hasOrder() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.hasOrder({
      userId: ctx.userId,
      houseId: ctx.params("id"),
    });
    this.success(result);
  }

  // 预定
  async addOrder() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.addOrder({
      userId: ctx.userId,
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

  // 订单列表
  async lists(params) {
    const { ctx, app } = this;
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId,
    });
    if (result) {
      this.success(result);
    } else {
      this.error("查询订单失败");
    }
  }

  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime(),
    };
  }

  // 支付
  async pay() {
    const { ctx } = this;
    const { id } = ctx.params();
    const orders = ctx.model.Orders.findByPk(id);
    if (orders) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber,
        });
        this.success(result);
      } catch (error) {
        this.error("支付失败");
      }
    } else {
      this.error("订单不存在");
    }
  }
}

module.exports = OrdersController;
