"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_model_1 = __importDefault(require("./warehouse.model"));
class WarehouseRepository {
    constructor() {
        this.warehouse = warehouse_model_1.default;
        this.getAllWarehouse = async () => {
            return await this.warehouse.find({});
        };
        this.warehouseByID = async (id) => {
            return await this.warehouse.findById(id);
        };
        this.warehouseByIDAndUpdate = async (id, data) => {
            return this.warehouse.findByIdAndUpdate(id, data, { new: true });
        };
        this.warehouseByIDAndDelete = async (id) => {
            return await this.warehouse.findByIdAndDelete(id);
        };
        this.getAllWarehouse();
        this.warehouseByID(this.id);
        this.warehouseByIDAndUpdate(this.id, this.data);
        this.warehouseByIDAndDelete(this.id);
    }
}
exports.default = WarehouseRepository;
