"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserController {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.rootUser = async (req, res) => {
            res.send("Hii");
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/`, this.rootUser);
    }
}
exports.default = UserController;
