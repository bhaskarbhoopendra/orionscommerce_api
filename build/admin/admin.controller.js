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
const WarehouseNotFoundException_1 = __importDefault(require("../excpetions/WarehouseNotFoundException"));
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
            try {
                const foundVendor = await this.vendor.findById(vendorId);
                if (!foundVendor)
                    throw new VendorNotFoundException_1.default(vendorId);
                const foundWarehouse = await this.warehouse.findById(warehouseId);
                if (!foundWarehouse)
                    throw new WarehouseNotFoundException_1.default(warehouseId);
                if (foundVendor.isConfirmedVendor == enums_vendor_1.default.CONFIRMED &&
                    foundVendor.id == foundWarehouse.vendor) {
                    const confirmedWarehouse = await this.warehouse.findByIdAndUpdate(warehouseId, {
                        isVerifiedWarehouse: enums_vendor_1.default.CONFIRMED,
                    }, { new: true });
                    foundVendor.warehouse.push(warehouseId);
                    foundVendor.save();
                    response.send({ foundVendor, confirmedWarehouse });
                }
                console.log("Something went wrong");
            }
            catch (error) {
                console.log(error);
            }
        };
        this.getOneVendor = async (request, response) => {
            const vendorId = request.params.id;
            try {
                const foundVendor = await this.vendor.findById(vendorId);
                if (!foundVendor)
                    throw new VendorNotFoundException_1.default(vendorId);
                response.send(foundVendor);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verify/vendor/:id`, admin_middleware_1.default, this.verifyVendor);
        this.router.get(`${this.path}/verify/warehouse/:vendorId/:warehouseId`, admin_middleware_1.default, this.verifyVendorWarehouse);
        this.router.get(`${this.path}/getonevendor/:id`, this.getOneVendor);
    }
}
exports.default = AdminController;
