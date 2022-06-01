import VerifiedStatus from "../enums/enums.vendor";
import VendorNotFoundException from "../excpetions/VendorNotFoundException";
import WarehouseNotFoundException from "../excpetions/WarehouseNotFoundException";
import VendorRepository from "../vendor/vendor.repository";
import WarehouseRepository from "../warehouse/warehouse.repository";

class AdminService {
  warehouseRepository = new WarehouseRepository();
  vendorRepository = new VendorRepository();
  constructor() {}

  public adminVerifyVendor = async (vendorId: string, warehouseId: string) => {
    const foundVendor = await this.vendorRepository.vendorById(vendorId);
    if (!foundVendor) throw new VendorNotFoundException(vendorId);
    const foundWarehouse = await this.warehouseRepository.warehouseByID(
      warehouseId
    );
    if (!foundWarehouse) throw new WarehouseNotFoundException(warehouseId);

    if (
      foundVendor.isConfirmedVendor == VerifiedStatus.CONFIRMED &&
      foundVendor.id == foundWarehouse.vendor
    ) {
      const confirmedWarehouse =
        await this.warehouseRepository.warehouseByIDAndUpdate(warehouseId, {
          isVerifiedWarehouse: VerifiedStatus.CONFIRMED,
        });

      //TODO check for existing warehouse
      foundVendor?.warehouse?.push(warehouseId);
      await foundVendor.save();
      return { foundVendor, confirmedWarehouse };
    }
  };
}

export default AdminService;
