import { Router, Request, Response, NextFunction } from "express";
import VendorNotFoundException from "../excpetions/VendorNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import VendorModel from "../vendor/vendor.model";
import VerifiedStatus from "../enums/enums.vendor";
import Warehouse from "../warehouse/warehouse.model";
import WarehouseNotFoundException from "../excpetions/WarehouseNotFoundException";

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

    this.router.get(
      `${this.path}/getonevendor/:id`,

      this.getOneVendor
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
    try {
      const foundVendor = await this.vendor.findById(vendorId);
      if (!foundVendor) throw new VendorNotFoundException(vendorId);
      const foundWarehouse = await this.warehouse.findById(warehouseId);
      if (!foundWarehouse) throw new WarehouseNotFoundException(warehouseId);

      if (
        foundVendor.isConfirmedVendor == VerifiedStatus.CONFIRMED &&
        foundVendor.id == foundWarehouse.vendor
      ) {
        const confirmedWarehouse = await this.warehouse.findByIdAndUpdate(
          warehouseId,
          {
            isVerifiedWarehouse: VerifiedStatus.CONFIRMED,
          },
          { new: true }
        );

        foundVendor.warehouse.push(warehouseId);
        foundVendor.save();
        response.send({ foundVendor, confirmedWarehouse });
      }
      console.log("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };

  private getOneVendor = async (request: Request, response: Response) => {
    const vendorId = request.params.id;
    try {
      const foundVendor = await this.vendor.findById(vendorId);
      if (!foundVendor) throw new VendorNotFoundException(vendorId);
      response.send(foundVendor);
    } catch (error) {
      console.log(error);
    }
  };
}

export default AdminController;
