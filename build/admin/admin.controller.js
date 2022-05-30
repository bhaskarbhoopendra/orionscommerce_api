"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VendorNotFoundException_1 = __importDefault(require("../excpetions/VendorNotFoundException"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const enums_vendor_1 = __importDefault(require("../vendor/enums.vendor"));
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
class AdminController {
    constructor() {
        this.path = "/admin/process";
        this.router = (0, express_1.Router)();
        this.vendor = vendor_model_1.default;
        this.verifyVendor = async (request, response) => {
            const vendorId = request.params.id;
            if (!vendorId)
                throw new VendorNotFoundException_1.default(vendorId);
            try {
                const confirmedVendor = await this.vendor.findOneAndUpdate({ vendorId }, {
                    isConfirmedVendor: enums_vendor_1.default.CONFIRMED,
                }, { new: true });
                response.send(confirmedVendor);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verify/vendor/:id`, admin_middleware_1.default, this.verifyVendor);
    }
}
exports.default = AdminController;
