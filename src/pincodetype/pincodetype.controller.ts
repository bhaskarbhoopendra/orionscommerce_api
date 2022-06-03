import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import pincodetypeModel from "./pincode.model";
import PincodeRepository from "./pincode.repository";

class PincodeTypeController implements Controller {
  public path = "/pincode/type";
  public router = Router();
  pincode = pincodetypeModel;
  pincodeRepository = new PincodeRepository();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      adminMiddleware,
      this.createPincode
    );

    this.router.put(
      `${this.path}/update/:id`,
      adminMiddleware,
      this.updatepincodeType
    );

    this.router.get(`${this.path}/`, adminMiddleware, this.getAllPincode);

    this.router.delete(
      `${this.path}/delete/:id`,
      adminMiddleware,
      this.deletePincode
    );
  }

  private createPincode = async (request: Request, response: Response) => {
    try {
      const pincodeData = request.body;
      const pincodetype = await this.pincode.create({ ...pincodeData });
      response.send(pincodetype);
    } catch (error) {
      return error;
    }
  };

  private updatepincodeType = async (request: Request, response: Response) => {
    const pincodeTypeId = request.params.id;
    const pincodeData = request.body;
    try {
      const updatedPincodeType =
        await this.pincodeRepository.pincodeByIdAndUpdate(
          pincodeTypeId,
          pincodeData
        );
      response.send({ data: updatedPincodeType });
    } catch (error) {
      return error;
    }
  };

  private getAllPincode = async (request: Request, response: Response) => {
    try {
      const pincode = await this.pincodeRepository.getAllPincodeType();
      response.send(pincode);
    } catch (error) {
      return error;
    }
  };

  private deletePincode = async (request: Request, response: Response) => {
    const pincodeId = request.params.id;
    try {
      await this.pincodeRepository.pincodeByIdAndDelete(pincodeId);
      response.send("Deleted");
    } catch (error) {
      return error;
    }
  };
}

export default PincodeTypeController;
