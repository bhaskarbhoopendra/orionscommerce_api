"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const zone_model_1 = __importDefault(require("./zone.model"));
const zone_repository_1 = __importDefault(require("./zone.repository"));
class ZoneController {
    constructor() {
        this.path = "/zone";
        this.router = (0, express_1.Router)();
        this.zoneModel = zone_model_1.default;
        this.zoneRepository = new zone_repository_1.default();
        this.createZone = async (request, response) => {
            const zoneData = request.body;
            try {
                const createZone = new this.zoneModel(Object.assign({}, zoneData));
                await createZone.save();
                response.send({ data: createZone });
            }
            catch (error) {
                return error;
            }
        };
        this.updateZone = async (request, response) => {
            const zoneId = request.params.id;
            const zoneData = request.body;
            try {
                const updateZone = await this.zoneRepository.zoneByIdAndUpdate(zoneId, zoneData);
                response.send({ data: updateZone });
            }
            catch (error) {
                return error;
            }
        };
        this.getAllZone = async (request, response) => {
            try {
                const zone = await this.zoneRepository.getAllZone();
                response.send(zone);
            }
            catch (error) {
                return error;
            }
        };
        this.deleteZone = async (request, response) => {
            const zoneId = request.params.id;
            try {
                await this.zoneRepository.zoneByIdAndDelete(zoneId);
                response.send("Delted");
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.createZone);
        this.router.put(`${this.path}/update/:id`, admin_middleware_1.default, this.updateZone);
        this.router.get(`${this.path}/get`, admin_middleware_1.default, this.getAllZone);
        this.router.delete(`${this.path}/delete/:id`, admin_middleware_1.default, this.deleteZone);
    }
}
exports.default = ZoneController;
