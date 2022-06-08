import Controller from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import adminMiddleware from "../../middleware/admin.middleware";
import ZoneRepository from "./zone.repository";
import ZoneDto from "./zone.dto";
import zoneModel from "./zone.model";
import ZoneNotFoundException from "../../excpetions/ZoneNotFoundException";

class ZoneController implements Controller {

  public path = '/zone';
  public router = Router();
  zoneRepository = new ZoneRepository();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //create zone
    this.router.post(`${this.path}/create`, adminMiddleware, this.createsZone);
    //get all zones
    this.router.get(`${this.path}/get`, adminMiddleware, this.getsAllZone);
    //update zone given a zone id
    this.router.put(`${this.path}/update/:id`, adminMiddleware, this.updatesZoneById);
    //delete zone with a given id
    this.router.delete(`${this.path}/delete/:id`, adminMiddleware, this.deletesZoneById);
  }

  private createsZone = async (req: Request, res: Response) => {
    try {
      const zoneData: ZoneDto = req.body;


      const zone = new zoneModel({
        ...zoneData
      });
      await this.zoneRepository.createZone(zone);
      res.send(zone);
      console.log(req.body);
      console.log(zoneData);
      console.log(zone);
    } catch (error) {
      res.send(error);
    }
  }

  private getsAllZone = async (req: Request, res: Response) => {
    try {
      const allZones = await this.zoneRepository.getAllZoneData();
      res.send(allZones);
      console.log(allZones.length);

    } catch (error) {
      res.send(error);
    }

  }

  private updatesZoneById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const newZone: ZoneDto = req.body;
      const zoneToUpdate = await this.zoneRepository.getZoneById(id);
      if (!zoneToUpdate) return new ZoneNotFoundException(id);

      const upDatedZone = await this.zoneRepository.updateZoneData(id, newZone);
      //updated zone to send to client
      res.send({ updatedZone: upDatedZone });
    } catch (error) {
      res.send(error);
    }

  }

  private deletesZoneById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const zone = await this.zoneRepository.getZoneById(id);
      if (!zone) return new ZoneNotFoundException(id);
      await this.zoneRepository.deleteZone(id);
      res.send("Deleted");

    } catch (error) {
      res.send(error);
    }

  }
}

export default ZoneController;