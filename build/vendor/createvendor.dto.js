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
const user_dto_1 = __importDefault(require("../user/user.dto"));
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
class CreatevendorDto extends user_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsString)()
], CreatevendorDto.prototype, "organization", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], CreatevendorDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_vendor_1.default)
], CreatevendorDto.prototype, "isConfirmedvendor", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)()
], CreatevendorDto.prototype, "isVendor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], CreatevendorDto.prototype, "warehouse", void 0);
exports.default = CreatevendorDto;
