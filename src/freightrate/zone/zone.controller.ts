import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
import ZoneDTO from "./zone.dto";
import IZone from "./zone.interface";
import zoneModel from "./zone.model";
import ZoneRepository from "./zone.repository";

class ZoneController implements Controller {
  public path = "/zone";
  public router = Router();
  zoneModel = zoneModel;
  public zoneRepository = new ZoneRepository();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/create`, adminMiddleware, this.createZone);
    this.router.put(
      `${this.path}/update/:id`,
      adminMiddleware,
      this.updateZone
    );
    this.router.get(`${this.path}/get`, adminMiddleware, this.getAllZone);
    this.router.delete(
      `${this.path}/delete/:id`,
      adminMiddleware,
      this.deleteZone
    );
  }

  private createZone = async (request: Request, response: Response) => {
    const zoneData: ZoneDTO = request.body;
    try {
      const createZone = new this.zoneModel({
        ...zoneData,
      });
      createZone.save();
      response.send({ data: createZone });
    } catch (error) {
      return error;
    }
  };

  private updateZone = async (request: Request, response: Response) => {
    const zoneId = request.params.id;
    const zoneData: ZoneDTO = request.body;
    try {
      const updateZone: ZoneDTO | null =
        await this.zoneRepository.zoneByIdAndUpdate(zoneId, zoneData);
      response.send({ data: updateZone });
    } catch (error) {
      return error;
    }
  };

  private getAllZone = async (request: Request, response: Response) => {
    try {
      const zone = await this.zoneRepository.getAllZone();
      response.send(zone);
    } catch (error) {
      return error;
    }
  };

  private deleteZone = async (request: Request, response: Response) => {
    const zoneId: string = request.params.id;
    try {
      await this.zoneRepository.zoneByIdAndDelete(zoneId);
      response.send("Delted");
    } catch (error) {
      return error;
    }
  };
}

export default ZoneController;
