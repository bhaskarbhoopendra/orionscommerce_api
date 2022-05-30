"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AdminController {
    constructor() {
        this.path = "/admin/process";
        this.router = (0, express_1.Router)();
        this.verifyVendor = async (request, response, next) => {
            response.send("Hello from admin");
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, this.verifyVendor);
    }
}
exports.default = AdminController;
