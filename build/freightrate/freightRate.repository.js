"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const freightRate_model_1 = __importDefault(require("./freightRate.model"));
class FreightRateRepository {
    constructor() {
        this.freightRate = freightRate_model_1.default;
        this.createFreightRateChart = async (data) => {
            return await this.freightRate.create(data);
        };
        this.getAllFreightRate = async () => {
            return await this.freightRate.find({});
        };
        this.freightRateById = async (id) => {
            return await this.freightRate.findById(id);
        };
        this.freightByIDAndUpdate = async (id, data) => {
            return this.freightRate.findByIdAndUpdate(id, data, { new: true });
        };
        this.freightByIDAndDelete = async (id) => {
            return await this.freightRate.findByIdAndDelete(id);
        };
        this.createFreightRateChart(this.data);
        this.getAllFreightRate();
        this.freightRateById(this.id);
        this.freightByIDAndUpdate(this.id, this.data);
        this.freightByIDAndDelete(this.id);
    }
}
exports.default = FreightRateRepository;
