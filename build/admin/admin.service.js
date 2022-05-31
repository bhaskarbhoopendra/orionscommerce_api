"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_vendor_1 = __importDefault(require("../enums/enums.vendor"));
const VendorNotFoundException_1 = __importDefault(require("../excpetions/VendorNotFoundException"));
const WarehouseNotFoundException_1 = __importDefault(require("../excpetions/WarehouseNotFoundException"));
const vendor_repository_1 = __importDefault(require("../vendor/vendor.repository"));
const warehouse_repository_1 = __importDefault(require("../warehouse/warehouse.repository"));
class AdminService {
    constructor() {
        this.warehouseRepository = new warehouse_repository_1.default();
        this.vendorRepository = new vendor_repository_1.default();
        this.adminVerifyVendor = async (vendorId, warehouseId) => {
            var _a;
            const foundVendor = await this.vendorRepository.vendorById(vendorId);
            if (!foundVendor)
                throw new VendorNotFoundException_1.default(vendorId);
            const foundWarehouse = await this.warehouseRepository.warehouseByID(warehouseId);
            if (!foundWarehouse)
                throw new WarehouseNotFoundException_1.default(warehouseId);
            if (foundVendor.isConfirmedVendor == enums_vendor_1.default.CONFIRMED &&
                foundVendor.id == foundWarehouse.vendor) {
                const confirmedWarehouse = await this.warehouseRepository.warehouseByIDAndUpdate(warehouseId, {
                    isVerifiedWarehouse: enums_vendor_1.default.CONFIRMED,
                });
                //TODO check for existing warehouse
                (_a = foundVendor === null || foundVendor === void 0 ? void 0 : foundVendor.warehouse) === null || _a === void 0 ? void 0 : _a.push(warehouseId);
                foundVendor.save();
                return { foundVendor, confirmedWarehouse };
            }
        };
    }
}
exports.default = AdminService;
