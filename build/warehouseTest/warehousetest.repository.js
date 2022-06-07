"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouseTest_model_1 = __importDefault(require("./warehouseTest.model"));
class WarehouseTestRepository {
    constructor() {
        this.warehouseTest = warehouseTest_model_1.default;
        this.getAllWarehouse = async () => {
            return await this.warehouseTest.find({});
        };
        this.warehouseByID = async (id) => {
            return await this.warehouseTest.findById(id);
        };
        this.warehouseByIDAndUpdate = async (id, data) => {
            return this.warehouseTest.findByIdAndUpdate(id, data, { new: true });
        };
        this.warehouseByIDAndDelete = async (id) => {
            return await this.warehouseTest.findByIdAndDelete(id);
        };
        this.getAllWarehouse();
        this.warehouseByID(this.id);
        this.warehouseByIDAndUpdate(this.id, this.data);
        this.warehouseByIDAndDelete(this.id);
    }
}
exports.default = WarehouseTestRepository;
