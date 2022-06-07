"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const warehouseTest_model_1 = __importDefault(require("./warehouseTest.model"));
const warehouseTest_repository_1 = __importDefault(require("./warehouseTest.repository"));
class WarehouseTestController {
    constructor() {
        this.path = "/warehousetest";
        this.router = (0, express_1.Router)();
        this.warehouseRepository = new warehouseTest_repository_1.default();
        this.warehouseModel = warehouseTest_model_1.default;
        this.createWarehouse = async (request, response) => {
            try {
                const warehouseData = request.body;
                const createWareHouse = new this.warehouseModel(Object.assign({}, warehouseData));
                await createWareHouse.save();
                response.send({ createWareHouse });
            }
            catch (error) {
                return error;
            }
        };
        this.updateWarehouse = async (request, response) => {
            try {
                const warehouseTestId = request.params.warehosueId;
                if (warehouseTestId == undefined)
                    response.send("Id not found");
                const updateData = request.body;
                const updatedWareHouse = await this.warehouseRepository.warehouseByIDAndUpdate(warehouseTestId, updateData);
                response.send(updatedWareHouse);
            }
            catch (error) {
                return error;
            }
        };
        this.getAllWarehouse = async (request, response) => {
            try {
                const warehouse = await this.warehouseRepository.getAllWarehouse();
                if (!warehouse)
                    response.send("No warehouse found");
                response.send(warehouse);
            }
            catch (error) {
                return error;
            }
        };
        this.deleteWarehouse = async (request, response) => {
            const warehouseTestId = request.params.warehouseId;
            if (!warehouseTestId)
                response.send("Id not found");
            try {
                await this.warehouseRepository.warehouseByIDAndDelete(warehouseTestId);
                response.send("Deleted");
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createWarehouse);
        this.router.put(`${this.path}/:warehosueId`, this.updateWarehouse);
        this.router.get(`${this.path}`, this.getAllWarehouse);
        this.router.delete(`${this.path}/:warehouseId`, this.deleteWarehouse);
    }
}
exports.default = WarehouseTestController;
