import { Router, Request, Response, NextFunction } from "express";
import VendorNotFoundException from "../excpetions/VendorNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import StatusOfVendorEnum from "../vendor/enums.vendor";
import VendorModel from "../vendor/vendor.model";

class AdminController implements Controller {
  public path = "/admin/process";
  public router = Router();
  vendor = VendorModel;
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(
      `${this.path}/verify/vendor/:id`,
      adminMiddleware,
      this.verifyVendor
    );
  }

  private verifyVendor = async (request: Request, response: Response) => {
    const vendorId = request.params.id;
    if (!vendorId) throw new VendorNotFoundException(vendorId);
    try {
      const confirmedVendor = await this.vendor.findOneAndUpdate(
        { vendorId },
        {
          isConfirmedVendor: StatusOfVendorEnum.CONFIRMED,
        },
        { new: true }
      );
      response.send(confirmedVendor);
    } catch (error) {
      console.log(error);
    }
  };
}

export default AdminController;
