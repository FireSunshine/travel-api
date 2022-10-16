"use strict";

const BaseController = require("./base");

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    const citys = await ctx.service.city.getCity(25);
    if (citys) {
      this.success({
        citys,
      });
    } else {
      this.error("获取城市失败");
    }
  }
}

module.exports = CommonsController;
