"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VendorNotFoundException_1 = __importDefault(require("../excpetions/VendorNotFoundException"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
const warehouse_model_1 = __importDefault(require("../warehouse/warehouse.model"));
class AdminController {
    constructor() {
        this.path = "/admin/process";
        this.router = (0, express_1.Router)();
        this.vendor = vendor_model_1.default;
        this.warehouse = warehouse_model_1.default;
        this.verifyVendor = async (request, response) => {
            const vendorId = request.params.id;
            if (!vendorId)
                throw new VendorNotFoundException_1.default(vendorId);
            try {
                const confirmedVendor = await this.vendor.findByIdAndUpdate(vendorId, {
                    isConfirmedVendor: enums_vendor_1.default.CONFIRMED,
                }, { new: true });
                response.send(confirmedVendor);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.verifyVendorWarehouse = async (request, response) => {
            const { vendorId, warehouseId } = request.params;
            const foundVendor = await this.vendor.findById(vendorId);
            const foundWarehouse = await this.warehouse.findById(warehouseId);
            response.send({ foundVendor, foundWarehouse });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verify/vendor/:id`, admin_middleware_1.default, this.verifyVendor);
        this.router.get(`${this.path}/verify/warehouse/:vendorId/:warehouseId`, admin_middleware_1.default, this.verifyVendorWarehouse);
    }
}
exports.default = AdminController;
