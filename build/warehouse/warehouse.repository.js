"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_model_1 = __importDefault(require("./warehouse.model"));
class WarehouseRepository {
    constructor() {
        this.warehouse = warehouse_model_1.default;
    }
}
exports.default = WarehouseRepository;
