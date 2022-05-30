import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import confirmVendorMiddleware from "../middleware/confirmedVendor.middleware";
import Warehouse from "../warehouse/warehouse.model";
import VendorModel from "./vendor.model";

class VendorController implements Controller {
  public path = "/vendor";
  public router = Router();
  public warehouse = Warehouse;
  vendor = VendorModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/warehouse/create/:id`,
      confirmVendorMiddleware,
      this.vendorCreateWarehouse
    );

    this.router.get(`${this.path}/get/:id`, this.getSingleVendor);
  }

  private vendorCreateWarehouse = async (
    request: Request,
    response: Response
  ) => {
    const vendorId = request.params.id;
    const warehouseData = request.body;
    const newWarehouse = new this.warehouse({
      ...warehouseData,
      vendor: vendorId,
    });
    await newWarehouse.save();
    response.send(newWarehouse);
  };

  public getSingleVendor = async (request: Request, response: Response) => {
    const warehouseId = request.params.id;
    const foundWarehouse = await this.warehouse
      .findById(warehouseId)
      .populate("vendor", "-password");
    if (!foundWarehouse) console.log("No warehouse found");
    response.send(foundWarehouse);
  };
}
export default VendorController;
