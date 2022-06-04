"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const idNotFoundException_1 = __importDefault(require("../excpetions/idNotFoundException"));
const freightRate_model_1 = __importDefault(require("./freightRate.model"));
const freightRate_service_1 = __importDefault(require("./freightRate.service"));
const pincode_repository_1 = __importDefault(require("./pincodetype/pincode.repository"));
const zone_repository_1 = __importDefault(require("./zone/zone.repository"));
class FreightRateController {
    constructor() {
        this.path = "/freightrate";
        this.router = (0, express_1.Router)();
        this.freightRateChart = freightRate_model_1.default;
        this.zoneRepository = new zone_repository_1.default();
        this.pincodeTypeRepository = new pincode_repository_1.default();
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
        this.initiializeRoutes();
    }
    initiializeRoutes() {
        this.router.post(`${this.path}/create/rate/chart/:zoneId/:pincodeTypeId`, this.createRateChart);
    }
}
exports.default = FreightRateController;
