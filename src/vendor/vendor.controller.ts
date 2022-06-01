import { Request, Response, Router } from "express";
import WarehouseNotFoundException from "../excpetions/WarehouseNotFoundException";
import Controller from "../interfaces/controller.interface";
import confirmVendorMiddleware from "../middleware/confirmedVendor.middleware";
import Warehouse from "../warehouse/warehouse.model";
import VendorModel from "./vendor.model";

class VendorController implements Controller {
  public path = "/vendor";
  public router = Router();
  public warehouse = Warehouse; //warehouse model
  public vendor = VendorModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/warehouse/create/:id`,
      confirmVendorMiddleware,
      this.vendorCreateWarehouse
    );

    this.router.get(
      `${this.path}/getwarehouse/:id`,
      confirmVendorMiddleware,
      this.getSingleWarehouse
    );
  }

  private vendorCreateWarehouse = async (
    request: Request,
    response: Response
  ) => {
    const vendorId = request.params.id;
    const warehouseData = request.body;
    try {
      const newWarehouse = new this.warehouse({
        ...warehouseData,
        vendor: vendorId,
      });
      await newWarehouse.save();
      response.send({ data: newWarehouse });
    } catch (error) {
      return error;
    }
  };

  private getSingleWarehouse = async (request: Request, response: Response) => {
    const warehouseId = request.params.id;
    try {
      const foundWarehouse = await this.warehouse
        .findById(warehouseId)
        .populate("vendor", "-password");
      if (!foundWarehouse) throw new WarehouseNotFoundException(warehouseId);
      response.send({ data: foundWarehouse });
    } catch (error) {
      return error;
    }
  };
}
export default VendorController;
