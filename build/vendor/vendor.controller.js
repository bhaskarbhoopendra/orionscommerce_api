"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class VendorController {
    constructor() {
        this.path = "/vendor";
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
exports.default = VendorController;
