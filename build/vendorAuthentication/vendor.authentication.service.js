"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userWithThatEmailAlreadyExistsException_1 = __importDefault(require("../excpetions/userWithThatEmailAlreadyExistsException"));
const vendor_model_1 = __importDefault(require("./vendor.model"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class VendorAuthenticationService {
    constructor() {
        this.vendor = vendor_model_1.default;
    }
    async register(vendorData) {
        if (await this.vendor.findOne({ email: vendorData.email })) {
            throw new userWithThatEmailAlreadyExistsException_1.default(vendorData.email);
        }
        const hashedPassword = await bcrypt.hash(vendorData.password, 10);
        const vendor = await this.vendor.create(Object.assign(Object.assign({}, vendorData), { password: hashedPassword }));
        const tokenData = this.createToken(vendor);
        const cookie = this.createCookie(tokenData);
        return {
            cookie,
            vendor,
        };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    createToken(vendor) {
        const expiresIn = 60 * 60; // an hour
        const { JWT_SECRET } = process.env;
        const dataStoredInToken = {
            _id: vendor._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
        };
    }
}
exports.default = VendorAuthenticationService;
