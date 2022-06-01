"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const enums_address_1 = __importDefault(require("../enums/enums.address"));
class CreateAddressDto {
}
__decorate([
    (0, class_validator_1.IsString)()
], CreateAddressDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreateAddressDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreateAddressDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], CreateAddressDto.prototype, "pincode", void 0);
__decorate([
    (0, class_validator_1.IsNumber)()
], CreateAddressDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_address_1.default)
], CreateAddressDto.prototype, "addressType", void 0);
exports.default = CreateAddressDto;
