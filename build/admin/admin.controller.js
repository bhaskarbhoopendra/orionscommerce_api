"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VendorNotFoundException_1 = __importDefault(require("../excpetions/VendorNotFoundException"));
const admin_middleware_1 = __importDefault(require("../middleware/admin.middleware"));
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
const vendor_repository_1 = __importDefault(require("../vendor/vendor.repository"));
const warehouse_repository_1 = __importDefault(require("../warehouse/warehouse.repository"));
const vendor_model_1 = __importDefault(require("../vendor/vendor.model"));
const admin_service_1 = __importDefault(require("./admin.service"));
class AdminController {
    constructor() {
        this.path = "/admin/process";
        this.router = (0, express_1.Router)();
        this.vendorRepository = new vendor_repository_1.default();
        this.warehouseRepository = new warehouse_repository_1.default();
        this.vendor = vendor_model_1.default;
        this.AdminService = new admin_service_1.default();
        this.verifyVendor = async (request, response) => {
            const vendorId = request.params.id;
            if (!vendorId)
                throw new VendorNotFoundException_1.default(vendorId);
            try {
                const confirmedVendor = await this.vendorRepository.vendorByIdAndUpdate(vendorId, {
                    isConfirmedVendor: enums_vendor_1.default.CONFIRMED,
                });
                response.send({ data: confirmedVendor });
            }
            catch (error) {
                return error;
            }
        };
        this.verifyVendorWarehouse = async (request, response) => {
            const { vendorId, warehouseId } = request.params;
            try {
                const { confirmedWarehouse, foundVendor } = await this.AdminService.adminVerifyVendor(vendorId, warehouseId);
                response.send({ foundVendor, confirmedWarehouse });
            }
            catch (error) {
                return error;
            }
        };
        this.getOneVendor = async (request, response) => {
            const vendorId = request.params.id;
            try {
                const foundVendor = await this.vendor
                    .findById(vendorId)
                    .populate("warehouse");
                if (!foundVendor)
                    throw new VendorNotFoundException_1.default(vendorId);
                response.send(foundVendor);
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/verify/vendor/:id`, admin_middleware_1.default, this.verifyVendor);
        this.router.get(`${this.path}/verify/warehouse/:vendorId/:warehouseId`, admin_middleware_1.default, this.verifyVendorWarehouse);
        this.router.get(`${this.path}/getonevendor/:id`, admin_middleware_1.default, this.getOneVendor);
    }
}
exports.default = AdminController;
