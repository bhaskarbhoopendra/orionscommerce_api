"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const idNotFoundException_1 = __importDefault(require("../excpetions/idNotFoundException"));
const freightRate_service_1 = __importDefault(require("./freightRate.service"));
class FreightRateController {
    constructor() {
        this.path = "/freightrate";
        this.router = (0, express_1.Router)();
        this.freightRateService = new freightRate_service_1.default();
        this.createRateChart = async (request, response) => {
            try {
                const zoneId = request.params.zoneId;
                if (zoneId == undefined)
                    throw new idNotFoundException_1.default(zoneId);
                const pincodeTypeId = request.params.pincodeTypeId;
                if (pincodeTypeId == undefined)
                    throw new idNotFoundException_1.default(pincodeTypeId);
                const { weightType, lowerBound, upperBound, rate } = request.body;
                const data = await this.freightRateService.createFreightRateChart(zoneId, pincodeTypeId, weightType, lowerBound, upperBound, rate);
                response.send({ data });
            }
            catch (error) {
                return error;
            }
        };
        this.updateFreightrRate = async (request, response) => {
            try {
                const data = await this.freightRateService.updateFregightRate();
            }
            catch (error) {
                return error;
            }
        };
        this.initiializeRoutes();
    }
    initiializeRoutes() {
        this.router.post(`${this.path}/create/rate/chart/:zoneId/:pincodeTypeId`, this.createRateChart);
        this.router.post(`${this.path}/create/rate/chart/:zoneId/:pincodeTypeId/update/:freightRateId`, this.updateFreightrRate);
    }
}
exports.default = FreightRateController;
