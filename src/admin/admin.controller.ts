import { Router, Request, Response, NextFunction } from "express";
import VendorNotFoundException from "../excpetions/VendorNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import VerifiedStatus from "../enums/enums.vendor";
import Warehouse from "../warehouse/warehouse.model";
import WarehouseNotFoundException from "../excpetions/WarehouseNotFoundException";
import VendorRepository from "../vendor/vendor.repository";
import WarehouseRepository from "../warehouse/warehouse.repository";
import VendorModel from "../vendor/vendor.model";
import AdminService from "./admin.service";
import userModel from "../user/user.model";

class AdminController implements Controller {
  public path = "/admin/process";
  public router = Router();
  vendorRepository = new VendorRepository();
  warehouseRepository = new WarehouseRepository();
  vendor = VendorModel;
  user = userModel;
  AdminService = new AdminService();

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
      adminMiddleware,
      this.getOneVendor
    );

    this.router.get(`${this.path}/user/:id`, this.getOneUser);
  }

  private verifyVendor = async (request: Request, response: Response) => {
    const vendorId = request.params.id;
    if (!vendorId) throw new VendorNotFoundException(vendorId);
    try {
      const confirmedVendor = await this.vendorRepository.vendorByIdAndUpdate(
        vendorId,
        {
          isConfirmedVendor: VerifiedStatus.CONFIRMED,
        }
      );
      response.send({ data: confirmedVendor });
    } catch (error) {
      return error;
    }
  };

  private verifyVendorWarehouse = async (
    request: Request,
    response: Response
  ) => {
    const { vendorId, warehouseId } = request.params;
    try {
      const { confirmedWarehouse, foundVendor } =
        await this.AdminService.adminVerifyVendor(vendorId, warehouseId);
      response.send({ foundVendor, confirmedWarehouse });
    } catch (error) {
      return error;
    }
  };

  private getOneVendor = async (request: Request, response: Response) => {
    const vendorId = request.params.id;
    try {
      const foundVendor = await this.vendor
        .findById(vendorId)
        .populate("warehouse");
      if (!foundVendor) throw new VendorNotFoundException(vendorId);
      response.send(foundVendor);
    } catch (error) {
      return error;
    }
  };

  private getOneUser = async (request: Request, response: Response) => {
    const userId = request.params.id;
    if (!userId) throw new VendorNotFoundException(userId);
    try {
      const user = await this.user.findById(userId);
      response.send(user);
    } catch (error) {
      return error;
    }
  };
}

export default AdminController;
