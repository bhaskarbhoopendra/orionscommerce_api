"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WarehouseNotFoundException_1 = __importDefault(require("../excpetions/WarehouseNotFoundException"));
const confirmedVendor_middleware_1 = __importDefault(require("../middleware/confirmedVendor.middleware"));
const warehouse_model_1 = __importDefault(require("../warehouse/warehouse.model"));
const vendor_model_1 = __importDefault(require("./vendor.model"));
class VendorController {
    constructor() {
        this.path = "/vendor";
        this.router = (0, express_1.Router)();
        this.warehouse = warehouse_model_1.default; //warehouse model
        this.vendor = vendor_model_1.default;
        this.vendorCreateWarehouse = async (request, response) => {
            const vendorId = request.params.id;
            const warehouseData = request.body;
            try {
                const newWarehouse = new this.warehouse(Object.assign(Object.assign({}, warehouseData), { vendor: vendorId }));
                await newWarehouse.save();
                response.send({ data: newWarehouse });
            }
            catch (error) {
                return error;
            }
        };
        // TODO move to WarehouseController
        this.getSingleWarehouse = async (request, response) => {
            const warehouseId = request.params.id;
            try {
                const foundWarehouse = await this.warehouse
                    .findById(warehouseId)
                    .populate("vendor", "-password");
                if (!foundWarehouse)
                    throw new WarehouseNotFoundException_1.default(warehouseId);
                response.send({ data: foundWarehouse });
            }
            catch (error) {
                return error;
            }
        };
        // vendor request admin to sell the product at warehouse
        // getting productId, vendor warehouse and getting then verified
        this.vendorProductRequest = async (request, response) => { };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/warehouse/create/:id`, confirmedVendor_middleware_1.default, this.vendorCreateWarehouse);
        this.router.get(`${this.path}/getwarehouse/:id`, confirmedVendor_middleware_1.default, this.getSingleWarehouse);
        this.router.get(`${this.path}/product/verify/:productId/:warehouseId`, confirmedVendor_middleware_1.default, this.vendorProductRequest);
    }
}
exports.default = VendorController;
