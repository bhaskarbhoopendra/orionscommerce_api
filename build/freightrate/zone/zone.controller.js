"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const zone_repository_1 = __importDefault(require("./zone.repository"));
const zone_model_1 = __importDefault(require("./zone.model"));
const ZoneNotFoundException_1 = __importDefault(require("../../excpetions/ZoneNotFoundException"));
class ZoneController {
    constructor() {
        this.path = '/zone';
        this.router = (0, express_1.Router)();
        this.zoneRepository = new zone_repository_1.default();
        this.createsZone = async (req, res) => {
            try {
                const zoneData = req.body;
                const zone = new zone_model_1.default(Object.assign({}, zoneData));
                await this.zoneRepository.createZone(zone);
                res.send(zone);
                console.log(req.body);
                console.log(zoneData);
                console.log(zone);
            }
            catch (error) {
                res.send(error);
            }
        };
        this.getsAllZone = async (req, res) => {
            try {
                const allZones = await this.zoneRepository.getAllZoneData();
                res.send(allZones);
                console.log(allZones.length);
            }
            catch (error) {
                res.send(error);
            }
        };
        this.updatesZoneById = async (req, res) => {
            try {
                const id = req.params.id;
                const newZone = req.body;
                const zoneToUpdate = await this.zoneRepository.getZoneById(id);
                if (!zoneToUpdate)
                    return new ZoneNotFoundException_1.default(id);
                const upDatedZone = await this.zoneRepository.updateZoneData(id, newZone);
                //updated zone to send to client
                res.send({ updatedZone: upDatedZone });
            }
            catch (error) {
                res.send(error);
            }
        };
        this.deletesZoneById = async (req, res) => {
            try {
                const id = req.params.id;
                const zone = await this.zoneRepository.getZoneById(id);
                if (!zone)
                    return new ZoneNotFoundException_1.default(id);
                await this.zoneRepository.deleteZone(id);
                res.send("Deleted");
            }
            catch (error) {
                res.send(error);
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        //create zone
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.createsZone);
        //get all zones
        this.router.get(`${this.path}/get`, admin_middleware_1.default, this.getsAllZone);
        //update zone given a zone id
        this.router.put(`${this.path}/update/:id`, admin_middleware_1.default, this.updatesZoneById);
        //delete zone with a given id
        this.router.delete(`${this.path}/delete/:id`, admin_middleware_1.default, this.deletesZoneById);
    }
}
exports.default = ZoneController;
