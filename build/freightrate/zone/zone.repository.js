"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zone_model_1 = __importDefault(require("./zone.model"));
class ZoneRepository {
    constructor() {
        this.zone = zone_model_1.default;
        this.createZone = async (zoneData) => {
            return await this.zone.create(zoneData);
        };
        this.getAllZoneData = async () => {
            return await this.zone.find({});
        };
        this.getZoneById = async (id) => {
            return await this.zone.findById(id);
        };
        this.updateZoneData = async (id, zoneData) => {
            return await this.zone.findByIdAndUpdate(id, zoneData);
        };
        this.deleteZone = async (id) => {
            return await this.zone.findByIdAndDelete(id);
        };
        this.createZone(this.data);
        this.getAllZoneData();
        this.updateZoneData(this.id, this.data);
        this.deleteZone(this.id);
        this.getZoneById(this.id);
    }
}
exports.default = ZoneRepository;
