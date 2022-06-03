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
    this.router.get(
      `${this.path}/product/verify/:productId/:warehouseId`,
      confirmVendorMiddleware,
      this.vendorProductRequest
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

  // TODO move to WarehouseController
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

  // vendor request admin to sell the product at warehouse
  // getting productId, vendor warehouse and getting then verified
  private vendorProductRequest = async (
    request: Request,
    response: Response
  ) => {};
}
export default VendorController;
