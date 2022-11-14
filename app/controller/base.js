"use strict";

const { Controller } = require("egg");

class BaseController extends Controller {
  success(data = {}) {
    const { ctx } = this;
    ctx.body = {
      status: 200,
      data,
    };
  }

  error(message = "") {
    const { ctx } = this;
    ctx.throw(ctx.status, message);
    // ctx.body = {
    //   status: 500,
    //   message,
    // };
  }
}

module.exports = BaseController;
