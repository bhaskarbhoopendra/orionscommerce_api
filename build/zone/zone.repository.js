"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zone_model_1 = __importDefault(require("./zone.model"));
class ZoneRepository {
    constructor() {
        this.zone = zone_model_1.default;
        this.createZone = async (data) => {
            return await this.zone.create(data);
        };
        this.getAllZone = async () => {
            return await this.zone.find();
        };
        this.zoneById = async (id) => {
            return await this.zone.findById(id);
        };
        this.zoneByIdAndUpdate = async (id, data) => {
            return this.zone.findByIdAndUpdate(id, data, { new: true });
        };
        this.zoneByIdAndDelete = async (id) => {
            return await this.zone.findByIdAndDelete(id);
        };
        this.createZone(this.data);
        this.getAllZone();
        this.zoneById(this.id);
        this.zoneByIdAndUpdate(this.id, this.data);
        this.zoneByIdAndDelete(this.id);
    }
}
exports.default = ZoneRepository;
