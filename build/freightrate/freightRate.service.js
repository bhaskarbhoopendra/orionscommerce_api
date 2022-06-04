"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PincodeTypeNotFoundException_1 = __importDefault(require("../excpetions/PincodeTypeNotFoundException"));
const ZoneNotFoundException_1 = __importDefault(require("../excpetions/ZoneNotFoundException"));
const freightRate_model_1 = __importDefault(require("./freightRate.model"));
const pincode_repository_1 = __importDefault(require("./pincodetype/pincode.repository"));
const zone_repository_1 = __importDefault(require("./zone/zone.repository"));
class FreightRateService {
    constructor() {
        this.freightRateChart = freightRate_model_1.default;
        this.zoneRepository = new zone_repository_1.default();
        this.pincodeTypeRepository = new pincode_repository_1.default();
        this.createFreightRateChart = async (zoneId, pincodeTypeId, weightType, lowerBound, upperBound, rate) => {
            const zone = await this.zoneRepository.zoneById(zoneId);
            if (!zone)
                throw new ZoneNotFoundException_1.default(zoneId);
            const pincodeType = await this.pincodeTypeRepository.pincodeById(pincodeTypeId);
            if (!pincodeType)
                throw new PincodeTypeNotFoundException_1.default(pincodeTypeId);
            const freightRateChart = new this.freightRateChart({
                zone: zoneId,
                zoneName: zone === null || zone === void 0 ? void 0 : zone.zoneName,
                pincodeType: pincodeTypeId,
                pincodeTypeName: pincodeType === null || pincodeType === void 0 ? void 0 : pincodeType.pincodeTypeName,
                weightType: weightType,
                upperBound: upperBound,
                lowerBound: lowerBound,
                rate: rate,
            });
            const data = await freightRateChart.save();
            console.log(data);
            return data;
        };
        this.updateFregightRate = () => {
            const data = "Hello";
            return data;
        };
    }
}
exports.default = FreightRateService;
