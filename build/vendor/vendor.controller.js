"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const confirmedVendor_middleware_1 = __importDefault(require("../middleware/confirmedVendor.middleware"));
const warehouse_model_1 = __importDefault(require("../warehouse/warehouse.model"));
const vendor_model_1 = __importDefault(require("./vendor.model"));
class VendorController {
    constructor() {
        this.path = "/vendor";
        this.router = (0, express_1.Router)();
        this.warehouse = warehouse_model_1.default;
        this.vendor = vendor_model_1.default;
        this.vendorCreateWarehouse = async (request, response) => {
            const vendorId = request.params.id;
            const warehouseData = request.body;
            const newWarehouse = new this.warehouse(Object.assign(Object.assign({}, warehouseData), { vendor: vendorId }));
            await newWarehouse.save();
            console.log({ newWarehouse });
            response.send(newWarehouse);
        };
        this.getSingleWarehouse = async (request, response) => {
            const warehouseId = request.params.id;
            const foundWarehouse = await this.warehouse
                .findById(warehouseId)
                .populate("vendor", "-password");
            if (!foundWarehouse)
                console.log("No warehouse found");
            response.send(foundWarehouse);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/warehouse/create/:id`, confirmedVendor_middleware_1.default, this.vendorCreateWarehouse);
        this.router.get(`${this.path}/getwarehouse/:id`, this.getSingleWarehouse);
    }
}
exports.default = VendorController;
