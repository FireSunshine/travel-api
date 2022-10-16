"use strict";

const BaseController = require("./base");

class HouseController extends BaseController {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    if (result) {
      this.success(result);
    } else {
      this.error("获取数据失败");
    }
  }
}

module.exports = HouseController;
