"use strict";

const BaseController = require("./base");

class ProductController extends BaseController {
  // 获取产品列表
  async productList() {
    const { ctx, app } = this;
    const result = await ctx.service.product.productList();
    if (result) {
      this.success(result);
    } else {
      this.error("获取数据失败");
    }
  }
}

module.exports = ProductController;
