import { Router, Request, Response, NextFunction } from "express";
import VendorNotFoundException from "../excpetions/VendorNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import VendorModel from "../vendor/vendor.model";
import VerifiedStatus from "../enums/enums.vendor";
import Warehouse from "../warehouse/warehouse.model";

class AdminController implements Controller {
  public path = "/admin/process";
  public router = Router();
  vendor = VendorModel;
  warehouse = Warehouse;
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(
      `${this.path}/verify/vendor/:id`,
      adminMiddleware,
      this.verifyVendor
    );

    this.router.get(
      `${this.path}/verify/warehouse/:vendorId/:warehouseId`,
      adminMiddleware,
      this.verifyVendorWarehouse
    );
  }

  private verifyVendor = async (request: Request, response: Response) => {
    const vendorId = request.params.id;
    if (!vendorId) throw new VendorNotFoundException(vendorId);
    try {
      const confirmedVendor = await this.vendor.findByIdAndUpdate(
        vendorId,
        {
          isConfirmedVendor: VerifiedStatus.CONFIRMED,
        },
        { new: true }
      );
      response.send(confirmedVendor);
    } catch (error) {
      console.log(error);
    }
  };

  private verifyVendorWarehouse = async (
    request: Request,
    response: Response
  ) => {
    const { vendorId, warehouseId } = request.params;
    const foundVendor = await this.vendor.findById(vendorId);
    const foundWarehouse = await this.warehouse.findById(warehouseId);
    response.send({ foundVendor, foundWarehouse });
  };
}

export default AdminController;
