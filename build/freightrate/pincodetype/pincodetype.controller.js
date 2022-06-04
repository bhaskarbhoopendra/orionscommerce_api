"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_middleware_1 = __importDefault(require("../../middleware/admin.middleware"));
const pincode_model_1 = __importDefault(require("./pincode.model"));
const pincode_repository_1 = __importDefault(require("./pincode.repository"));
class PincodeTypeController {
    constructor() {
        this.path = "/pincode/type";
        this.router = (0, express_1.Router)();
        this.pincode = pincode_model_1.default;
        this.pincodeRepository = new pincode_repository_1.default();
        this.createPincode = async (request, response) => {
            try {
                const pincodeData = request.body;
                const pincodetype = await this.pincode.create(Object.assign({}, pincodeData));
                response.send(pincodetype);
            }
            catch (error) {
                return error;
            }
        };
        this.updatepincodeType = async (request, response) => {
            const pincodeTypeId = request.params.id;
            const pincodeData = request.body;
            try {
                const updatedPincodeType = await this.pincodeRepository.pincodeByIdAndUpdate(pincodeTypeId, pincodeData);
                response.send({ data: updatedPincodeType });
            }
            catch (error) {
                return error;
            }
        };
        this.getAllPincode = async (request, response) => {
            try {
                const pincode = await this.pincodeRepository.getAllPincodeType();
                response.send(pincode);
            }
            catch (error) {
                return error;
            }
        };
        this.deletePincode = async (request, response) => {
            const pincodeId = request.params.id;
            try {
                await this.pincodeRepository.pincodeByIdAndDelete(pincodeId);
                response.send("Deleted");
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, admin_middleware_1.default, this.createPincode);
        this.router.put(`${this.path}/update/:id`, admin_middleware_1.default, this.updatepincodeType);
        this.router.get(`${this.path}/`, admin_middleware_1.default, this.getAllPincode);
        this.router.delete(`${this.path}/delete/:id`, admin_middleware_1.default, this.deletePincode);
    }
}
exports.default = PincodeTypeController;
