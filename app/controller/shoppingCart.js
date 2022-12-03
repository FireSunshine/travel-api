"use strict";

const BaseController = require("./base");

class ShoppingCartController extends BaseController {
  // 添加购物车
  async add() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.shoppingCart.addShoppingCart({
      userId: user.id,
      productId: ctx.params("productId"),
      createTime: ctx.helper.time(),
    });
    if (result) {
      const cartList = await ctx.service.shoppingCart.lists({
        userId: user.id,
      });
      this.success(cartList);
    } else {
      this.error("添加购物车失败");
    }
  }

  // 查看购物车列表
  async lists() {
    const { ctx, app } = this;
    const result = await ctx.service.shoppingCart.lists({
      ...ctx.params(),
      userId: ctx.userId,
    });
    if (result) {
      this.success(result);
    } else {
      this.error("获取购物车列表失败");
    }
  }

  // 删除购物车
  async delCart() {
    const { ctx, app } = this;
    const result = await ctx.service.shoppingCart.delShoppingCart(
      ctx.params("cartIds")
    );
    if (result) {
      const cartList = await ctx.service.shoppingCart.lists({
        userId: ctx.userId,
      });
      this.success(cartList);
    } else {
      this.error("删除购物车失败");
    }
  }
}

module.exports = ShoppingCartController;
